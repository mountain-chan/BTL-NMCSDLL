import { Scatter } from "react-chartjs-2";

const Comparison = (props) => {
    const data = props.data;

    let regular = data.regular.map((value) => {
        return {
            x: value.price,
            y: value.predicted_price,
        };
    });

    let irregular = data.irregular.map((value) => {
        return {
            x: value.price,
            y: value.predicted_price,
        };
    });

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ textAlign: "center", width: 540, margin: "0 auto" }}>
                <Scatter
                    height={180}
                    data={{
                        labels: "So sánh",
                        datasets: [
                            {
                                label: "Bình thường",
                                data: regular,
                                backgroundColor: "#2196f3",
                            },
                            {
                                label: "Bất thường",
                                data: irregular,
                                backgroundColor: "#f32121",
                            },
                        ],
                    }}
                    options={{
                        legend: {
                            display: true,
                            position: "top",
                        },
                    }}
                />
                <div style={{ margin: "20px 0 50px 0" }}>So sánh giữa giá phòng dự đoán và thực tế</div>
            </div>
        </div>
    );
};

export default Comparison;
