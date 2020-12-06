import { Bar } from "react-chartjs-2";

import { colors } from "../../constants";

const RoomsByProperty = (props) => {
    const data = props.data;

    let bar_colors = [];
    for (let key in data.rooms_by_property) {
        let rd = Math.floor(Math.random() * colors.length);
        bar_colors.push(colors[rd]);
    }

    return (
        <div style={{ textAlign: "center", width: "75%", margin: "0 auto" }}>
            <Bar
                data={{
                    labels: Object.keys(data.rooms_by_property),
                    datasets: [
                        {
                            label: "Số phòng",
                            backgroundColor: bar_colors,
                            data: Object.values(data.rooms_by_property),
                        },
                    ],
                }}
                options={{
                    legend: { display: false },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                }}
            />
            <div style={{ margin: "-30px 0 20px 0" }}>Thống kê số phòng theo các khách sạn</div>
        </div>
    );
};

export default RoomsByProperty;
