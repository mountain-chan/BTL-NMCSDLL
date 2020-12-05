import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import HeadText from "./HeadText";

import { API_ROOMS_DETAIL } from "../../constants";
import RoomsDetail from "./RoomsDetail";
import Histogram from "./Histogram";
import Relation from "./Relation";

const Regression = (props) => {
    const auth = useSelector((state) => state.auth);
    const [data, set_data] = useState(null);
    const [tab, set_tab] = useState("ROOMS_DETAIL");

    useEffect(() => {
        const load = async () => {
            try {
                let response = await fetch(API_ROOMS_DETAIL, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + auth.access_token,
                    },
                });
                if (!response.ok) throw new Error("Error");
                let result = await response.json();
                if (!result.status) throw new Error("Error");
                set_data(result.data);
            } catch (err) {
                throw err;
            }
        };
        load();
    }, []);

    let Render = <div />;

    if (data) {
        switch (tab) {
            case "ROOMS_DETAIL":
                Render = <RoomsDetail data={data} />;
                break;
            case "HISTOGRAM":
                Render = <Histogram data={data} />;
                break;
            case "RELATION":
                Render = <Relation data={data} />;
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <HeadText>Danh mục - Dự đoán</HeadText>
            <div class="tab">
                <button
                    style={tab === "ROOMS_DETAIL" ? { backgroundColor: "#ccc" } : {}}
                    onClick={() => set_tab("ROOMS_DETAIL")}>
                    Chi tiết phòng
                </button>
                <button
                    style={tab === "HISTOGRAM" ? { backgroundColor: "#ccc" } : {}}
                    onClick={() => set_tab("HISTOGRAM")}>
                    Phân bố giá phòng
                </button>
                <button
                    style={tab === "RELATION" ? { backgroundColor: "#ccc" } : {}}
                    onClick={() => set_tab("RELATION")}>
                    Sự tương quan
                </button>
                <button
                    style={tab === "REGRESSION" ? { backgroundColor: "#ccc" } : {}}
                    onClick={() => set_tab("REGRESSION")}>
                    Dự đoán
                </button>
            </div>
            <div>{Render}</div>
        </div>
    );
};

export default Regression;
