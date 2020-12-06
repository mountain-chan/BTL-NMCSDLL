import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import HeadText from "./HeadText";

import { API_PREDICTIONS_IRREGULAR } from "../../constants";

import Comparison from "./Comparison";
import IrregularRooms from "./IrregularRooms";

const Irregular = (props) => {
    const auth = useSelector((state) => state.auth);
    const [data, set_data] = useState(null);
    const [tab, set_tab] = useState("COMPARISON");

    useEffect(() => {
        const load = async () => {
            try {
                let response = await fetch(API_PREDICTIONS_IRREGULAR, {
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
            case "COMPARISON":
                Render = <Comparison data={data} />;
                break;
            case "IRREGULAR_ROOMS":
                Render = <IrregularRooms data={data} set_data={set_data} />;
                break;
        }
    }

    return (
        <div>
            <HeadText>Danh mục - Bất thường</HeadText>
            <div class="tab">
                <button
                    style={tab === "COMPARISON" ? { backgroundColor: "#ccc" } : {}}
                    onClick={() => set_tab("COMPARISON")}>
                    So sánh dự đoán và thực tế
                </button>
                <button
                    style={tab === "IRREGULAR_ROOMS" ? { backgroundColor: "#ccc" } : {}}
                    onClick={() => set_tab("IRREGULAR_ROOMS")}>
                    Danh sách giá phòng bất thường
                </button>
            </div>
            <div>{Render}</div>
        </div>
    );
};

export default Irregular;
