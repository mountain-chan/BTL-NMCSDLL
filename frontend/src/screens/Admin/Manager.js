import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "./Header";
import General from "./General";
import Statistic from "./Statistic";
import Regression from "./Regression";
import Irregular from "./Irregular";

import Users from "./Users";
import Cities from "./Cities";
import PropertyTypes from "./PropertyTypes";
import Properties from "./Properties";
import Rooms from "./Rooms";

import * as auth_action from "../../store/actions/Auth";

const Manager = (props) => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [screen, set_screen] = useState("NONE");

    useEffect(() => {
        const load = async () => {
            try {
                await dispatch(auth_action.login("admin", "admin123"));
                set_screen("USERS");
            } catch (err) {}
        };
        load();
    }, []);

    const active = {
        margin: 8,
        borderRadius: 4,
        padding: "10px 15px",
        cursor: "pointer",
        backgroundColor: "#242849",
        color: "#eee",
    };
    const non_active = {
        margin: 8,
        borderRadius: 4,
        padding: "10px 15px",
        cursor: "pointer",
    };

    let Render;
    switch (screen) {
        case "GENERAL":
            Render = General;
            break;
        case "STATISTIC":
            Render = Statistic;
            break;
        case "REGRESSION":
            Render = Regression;
            break;
        case "IRREGULAR":
            Render = Irregular;
            break;
        case "USERS":
            Render = Users;
            break;
        case "CITIES":
            Render = Cities;
            break;
        case "PROPERTY_TYPES":
            Render = PropertyTypes;
            break;
        case "PROPERTIES":
            Render = Properties;
            break;
        case "ROOMS":
            Render = Rooms;
            break;
        default:
            Render = () => <div></div>;
            break;
    }

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
            }}>
            <Header />
            <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <div
                    style={{
                        padding: "40px 15px 40px 20px",
                        backgroundColor: "#0e0c28",
                        width: 180,
                        minWidth: 180,
                        fontSize: 16,
                        color: "#aab0e4",
                    }}>
                    <div>
                        <div
                            style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                margin: "20px 10px 10px 10px",
                            }}>
                            DANH MỤC
                        </div>
                        <div onClick={() => set_screen("GENERAL")} style={screen === "GENERAL" ? active : non_active}>
                            <i style={{ width: 30 }} className="fa fa-home"></i>
                            Tổng quan
                        </div>
                        <div
                            onClick={() => set_screen("STATISTIC")}
                            style={screen === "STATISTIC" ? active : non_active}>
                            <i style={{ width: 30 }} className="fa fa-bar-chart"></i>
                            Thống kê
                        </div>
                        <div
                            onClick={() => set_screen("REGRESSION")}
                            style={screen === "REGRESSION" ? active : non_active}>
                            <i style={{ width: 30 }} className="fa fa-line-chart"></i>
                            Dự đoán
                        </div>
                        <div
                            onClick={() => set_screen("IRREGULAR")}
                            style={screen === "IRREGULAR" ? active : non_active}>
                            <i style={{ width: 30 }} className="fa fa-remove"></i>
                            Bất thường
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                margin: "20px 10px 10px 10px",
                            }}>
                            QUẢN LÝ
                        </div>
                        <div onClick={() => set_screen("USERS")} style={screen === "USERS" ? active : non_active}>
                            <i style={{ width: 30 }} className="fa fa-user-circle"></i>
                            Tài khoản
                        </div>
                        <div onClick={() => set_screen("CITIES")} style={screen === "CITIES" ? active : non_active}>
                            <i style={{ width: 30 }} className="fa fa-bank"></i>
                            Thành phố
                        </div>
                        <div
                            onClick={() => set_screen("PROPERTY_TYPES")}
                            style={screen === "PROPERTY_TYPES" ? active : non_active}>
                            <i style={{ width: 30 }} className="fa fa-th-list"></i>
                            Loại chỗ nghỉ
                        </div>
                        <div
                            onClick={() => set_screen("PROPERTIES")}
                            style={screen === "PROPERTIES" ? active : non_active}>
                            <i style={{ width: 30 }} className="fa fa-building"></i>
                            Chỗ nghỉ
                        </div>
                        <div onClick={() => set_screen("ROOMS")} style={screen === "ROOMS" ? active : non_active}>
                            <i style={{ width: 30 }} className="fa fa-bed"></i>
                            Phòng
                        </div>
                    </div>
                </div>
                <div style={{ flex: 1, padding: "10px 20px 10px 20px" }}>
                    <Render />
                </div>
            </div>
        </div>
    );
};

export default Manager;
