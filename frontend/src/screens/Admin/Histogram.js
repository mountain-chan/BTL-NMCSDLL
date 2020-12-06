import { Line } from "react-chartjs-2";

const Histogram = (props) => {
    const point = 10;

    let prices = props.data.map((value) => value.price);
    let min = Math.min(...prices);
    let max = Math.max(...prices);
    let interval = (max - min) / point;
    let price_range = [];
    let amount = [];
    for (let i = 0; i < point; i++) {
        price_range.push(Math.floor(min + interval * i));
        amount.push(0);
    }
    prices.map((value) => {
        let idx = Math.floor((value - min) / interval);
        if (idx === point) idx -= 1;
        amount[idx] += 1;
    });
    prices = {
        price_range: price_range,
        amount: amount,
    };

    return (
        <div style={{ textAlign: "center", width: "60%", margin: "0 auto" }}>
            <Line
                data={{
                    labels: prices.price_range,
                    datasets: [
                        {
                            data: prices.amount,
                            label: "Số phòng",
                            borderColor: "#3e95cd",
                            fill: false,
                        },
                    ],
                }}
                options={{
                    legend: {
                        display: false,
                        position: "bottom",
                    },
                }}
            />
            <div style={{ margin: "20px 0 20px 0" }}>Phân bố giá phòng</div>
        </div>
    );
};

export default Histogram;
