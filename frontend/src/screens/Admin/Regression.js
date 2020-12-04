import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Line, Scatter } from "react-chartjs-2";

import HeadText from "./HeadText";
import { colors } from "../../constants";

import { API_ROOMS } from "../../constants";

const Regression = (props) => {
    const auth = useSelector((state) => state.auth);
    const [data, set_data] = useState(null);

    const point = 10;

    useEffect(() => {
        const load = async () => {
            try {
                let dt = {
                    prices: null,
                };
                let response = await fetch(API_ROOMS, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + auth.access_token,
                    },
                });
                if (!response.ok) throw new Error("Error");
                let result = await response.json();
                if (!result.status) throw new Error("Error");
                let rooms = result.data;
                let prices = rooms.map((value) => value.price);
                let min = Math.min(...prices);
                let max = Math.max(...prices);
                let interval = (max - min) / point;
                let price_range = [];
                let amount = [];
                for (let i = 0; i <= point; i++) {
                    price_range.push(Math.floor(min + interval * i));
                    amount.push(0);
                }
                prices.map((value) => (amount[Math.floor((value - min) / interval)] += 1));
                dt.prices = {
                    price_range: price_range,
                    amount: amount,
                };
                set_data(dt);
            } catch (err) {
                throw err;
            }
        };
        load();
    }, []);

    if (!data) return <div />;

    let bar_colors = [];
    for (let key in data.rooms_by_property) {
        let rd = Math.floor(Math.random() * colors.length);
        bar_colors.push(colors[rd]);
    }

    return (
        <div>
            <HeadText>Danh mục - Dự đoán</HeadText>
            <div>
                <div style={{ textAlign: "center", width: "60%", margin: "0 auto" }}>
                    <Line
                        data={{
                            labels: data.prices.price_range,
                            datasets: [
                                {
                                    data: data.prices.amount,
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
                    <div style={{ margin: "20px 0 50px 0" }}>Phân bố giá phòng</div>
                </div>
                <div style={{ textAlign: "center", width: "60%", margin: "0 auto" }}>
                    <Scatter
                        data={{
                            labels: data.prices.price_range,
                            datasets: [
                                {
                                    label: "Scatter Dataset",
                                    data: [
                                        {
                                            x: -10,
                                            y: 0,
                                        },
                                        {
                                            x: 0,
                                            y: 10,
                                        },
                                        {
                                            x: 10,
                                            y: 5,
                                        },
                                    ],
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
                    <div style={{ margin: "20px 0 50px 0" }}>Sự phụ thuộc của x đến y</div>
                </div>
            </div>
        </div>
    );
};

export default Regression;
