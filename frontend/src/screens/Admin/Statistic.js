import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Doughnut, Line } from "react-chartjs-2";

import HeadText from "./HeadText";
import { colors } from "../../constants";

import { API_STATISTICS_BOOKINGS_BY_CITY, API_STATISTICS_BOOKINGS_BY_YEAR } from "../../constants";

const Statistic = (props) => {
    const auth = useSelector((state) => state.auth);
    const [data, set_data] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                let dt = {
                    bookings_by_city: null,
                    bookings_by_year: null,
                };
                let response = await fetch(API_STATISTICS_BOOKINGS_BY_CITY, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + auth.access_token,
                    },
                });
                if (!response.ok) throw new Error("Error");
                let result = await response.json();
                if (!result.status) throw new Error("Error");
                dt.bookings_by_city = result.data;

                response = await fetch(`${API_STATISTICS_BOOKINGS_BY_YEAR}?year=2020`, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + auth.access_token,
                    },
                });
                if (!response.ok) throw new Error("Error");
                result = await response.json();
                if (!result.status) throw new Error("Error");
                dt.bookings_by_year = result.data;

                set_data(dt);
            } catch (err) {
                throw err;
            }
        };
        load();
    }, []);

    if (!data) return <div />;

    return (
        <div>
            <HeadText>Danh mục - Thống kê</HeadText>
            <div style={{ width: "90%", margin: "0 auto" }}>
                <div style={{ textAlign: "center" }}>
                    <Doughnut
                        height={80}
                        data={{
                            labels: Object.keys(data.bookings_by_city),
                            datasets: [
                                {
                                    label: "Số lượt đặt",
                                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                                    data: Object.values(data.bookings_by_city),
                                },
                            ],
                        }}
                    />
                    <div style={{ margin: "30px 0 50px 0" }}>Thống kê số lượng đặt phòng theo các thành phố</div>
                </div>
                <div style={{ textAlign: "center" }}>
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
                                    },
                                    {
                                        id: "B",
                                        type: "linear",
                                        position: "right",
                                    },
                                ],
                            },
                        }}
                    />
                    <div style={{ margin: "10px 0 50px 0" }}>
                        Thống kê số lượt đặt phòng và doanh thu theo các tháng
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistic;
