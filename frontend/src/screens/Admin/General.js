import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import HeadText from "./HeadText";

import {
    API_STATISTICS_PROPERTIES_BY_CITY,
    API_STATISTICS_ROOMS_BY_PROPERTY,
    API_STATISTICS_ROOMS_BY_CITY,
} from "../../constants";

import PropertiesByCity from "./PropertiesByCity";
import RoomsByProperty from "./RoomsByProperty";

const General = (props) => {
    const auth = useSelector((state) => state.auth);
    const [data, set_data] = useState(null);
    const [tab, set_tab] = useState("PROPERTIES_BY_CITY");

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

    let Render = <div />;

    if (data) {
        switch (tab) {
            case "PROPERTIES_BY_CITY":
                Render = <PropertiesByCity data={data} />;
                break;
            case "ROOMS_BY_PROPERTY":
                Render = <RoomsByProperty data={data} />;
                break;
        }
    }

    return (
        <div>
            <HeadText>Danh mục - Tổng quan</HeadText>
            <div class="tab">
                <button
                    style={tab === "PROPERTIES_BY_CITY" ? { backgroundColor: "#ccc" } : {}}
                    onClick={() => set_tab("PROPERTIES_BY_CITY")}>
                    Chỗ nghỉ theo thành phố
                </button>
                <button
                    style={tab === "ROOMS_BY_PROPERTY" ? { backgroundColor: "#ccc" } : {}}
                    onClick={() => set_tab("ROOMS_BY_PROPERTY")}>
                    Phòng theo khách sạn
                </button>
            </div>
            <div style={{ margin: "0 auto" }}>{Render}</div>
        </div>
    );
};

export default General;
