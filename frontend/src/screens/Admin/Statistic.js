import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import HeadText from "./HeadText";

import { API_STATISTICS_BOOKINGS_BY_CITY, API_STATISTICS_BOOKINGS_BY_YEAR } from "../../constants";

import BookingsByCity from "./BookingsByCity";
import BookingsIncome from "./BookingsIncome";

const Statistic = (props) => {
    const auth = useSelector((state) => state.auth);
    const [data, set_data] = useState(null);
    const [tab, set_tab] = useState("BOOKINGS_BY_CITY");

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

    let Render = <div />;

    if (data) {
        switch (tab) {
            case "BOOKINGS_BY_CITY":
                Render = <BookingsByCity data={data} />;
                break;
            case "BOOKINGS_INCOME":
                Render = <BookingsIncome data={data} />;
                break;
        }
    }

    return (
        <div>
            <HeadText>Danh mục - Thống kê</HeadText>
            <div class="tab">
                <button
                    style={tab === "BOOKINGS_BY_CITY" ? { backgroundColor: "#ccc" } : {}}
                    onClick={() => set_tab("BOOKINGS_BY_CITY")}>
                    Đặt phòng theo thành phố
                </button>
                <button
                    style={tab === "BOOKINGS_INCOME" ? { backgroundColor: "#ccc" } : {}}
                    onClick={() => set_tab("BOOKINGS_INCOME")}>
                    Doanh thu đặt phòng
                </button>
            </div>
            <div style={{ width: "85%", margin: "0 auto" }}>{Render}</div>
        </div>
    );
};

export default Statistic;
