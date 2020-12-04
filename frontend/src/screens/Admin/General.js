import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Doughnut, Bar } from "react-chartjs-2";

import HeadText from "./HeadText";
import { colors } from "../../constants";

import {
    API_STATISTICS_PROPERTIES_BY_CITY,
    API_STATISTICS_ROOMS_BY_PROPERTY,
    API_STATISTICS_ROOMS_BY_CITY,
} from "../../constants";

const General = (props) => {
    const auth = useSelector((state) => state.auth);
    const [data, set_data] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                let dt = {
                    properties_by_city: null,
                    rooms_by_property: null,
                    rooms_by_city: null,
                };
                let response = await fetch(API_STATISTICS_PROPERTIES_BY_CITY, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + auth.access_token,
                    },
                });
                if (!response.ok) throw new Error("Error");
                let result = await response.json();
                if (!result.status) throw new Error("Error");
                dt.properties_by_city = result.data;

                response = await fetch(API_STATISTICS_ROOMS_BY_PROPERTY, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + auth.access_token,
                    },
                });
                if (!response.ok) throw new Error("Error");
                result = await response.json();
                if (!result.status) throw new Error("Error");
                dt.rooms_by_property = result.data;

                response = await fetch(API_STATISTICS_ROOMS_BY_CITY, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + auth.access_token,
                    },
                });
                if (!response.ok) throw new Error("Error");
                result = await response.json();
                if (!result.status) throw new Error("Error");
                dt.rooms_by_city = result.data;

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
            <HeadText>Danh mục - Tổng quan</HeadText>
            <div style={{ width: "92%", margin: "0 auto" }}>
                <div style={{ textAlign: "center" }}>
                    <Doughnut
                        height={80}
                        data={{
                            labels: Object.keys(data.properties_by_city),
                            datasets: [
                                {
                                    label: "Số chỗ nghỉ",
                                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                                    data: Object.values(data.properties_by_city),
                                },
                            ],
                        }}
                    />
                    <div style={{ margin: "30px 0 50px 0" }}>Thống kê số chỗ nghỉ theo các thành phố</div>
                </div>
                <div style={{ textAlign: "center" }}>
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
                        }}
                    />
                    <div style={{ margin: "10px 0 50px 0" }}>Thống kê số phòng theo các khách sạn</div>
                </div>
            </div>
        </div>
    );
};

export default General;
