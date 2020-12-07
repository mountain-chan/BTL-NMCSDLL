import { Line } from "react-chartjs-2";

const BookingsIncome = (props) => {
    const data = props.data;

    return (
        <div style={{ textAlign: "center", width: "80%", margin: "0 auto" }}>
            <Line
                data={{
                    labels: data.bookings_by_year.map((value) => value.month),
                    datasets: [
                        {
                            label: "Số lượt đặt",
                            yAxisID: "A",
                            data: data.bookings_by_year.map((value) => value.number_of_reservations),
                            borderColor: "#ee9030",
                            backgroundColor: "#ee90303f",
                        },
                        {
                            label: "Doanh thu",
                            yAxisID: "B",
                            data: data.bookings_by_year.map((value) => value.total_income),
                            borderColor: "#8e5ea2",
                            backgroundColor: "#8e5ea23f",
                        },
                    ],
                }}
                options={{
                    legend: {
                        display: true,
                        position: "top",
                    },
                    scales: {
                        yAxes: [
                            {
                                id: "A",
                                type: "linear",
                                position: "left",
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                            {
                                id: "B",
                                type: "linear",
                                position: "right",
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                }}
            />
            <div style={{ margin: "10px 0 20px 0" }}>Thống kê số lượt đặt phòng và doanh thu theo các tháng</div>
        </div>
    );
};

export default BookingsIncome;
