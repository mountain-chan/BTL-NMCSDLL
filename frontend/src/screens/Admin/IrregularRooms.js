import { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";

import { custom_styles, API_ROOMS as api } from "../../constants";

Modal.setAppElement("#root");

const columns = [
    { name: "acreage", title: "Diện tích", width: 9 },
    { name: "bed_type", title: "Loại giường", width: 9 },
    { name: "distance_from_center", title: "Cách trung tâm", width: 9 },
    { name: "is_near_beach", title: "Gần biển", width: 8 },
    { name: "meal", title: "Bữa ăn", width: 9 },
    { name: "rank", title: "Xếp hạng", width: 8 },
    { name: "city_id", title: "Thành phố", width: 9 },
    { name: "property_type_id", title: "Loại chỗ nghỉ", width: 9 },
    { name: "predicted_price", title: "Giá thuê dự đoán", width: 10 },
    { name: "price", title: "Giá thuê thực tế", width: 10 },
];

const item_per_page = 6;

const IrregularRooms = (props) => {
    const auth = useSelector((state) => state.auth);

    const data = props.data;
    const set_data = props.set_data;

    const { addToast } = useToasts();

    const [upd_open, set_upd_open] = useState(false);
    const [del_open, set_del_open] = useState(false);
    const [upd_data, set_upd_data] = useState({
        _id: "",
        acreage: 0,
        bed_type: 0,
        city_id: "1",
        distance_from_center: 0,
        is_near_beach: 0,
        meal: 0,
        predicted_price: 0,
        price: 0,
        property_id: "1",
        property_type_id: "1",
        rank: 1.0,
    });
    const [del_data, set_del_data] = useState("");
    const [page_current, set_page_current] = useState(0);

    const irregular = data.irregular;

    const page_max = Math.ceil(irregular.length / item_per_page) - 1;
    const pages = [];
    let page_left = page_current - 3,
        page_right = page_current + 3;
    if (page_left < 0) page_left = 0;
    if (page_right > page_max) page_right = page_max;
    for (let i = page_left; i <= page_right; i++) pages.push(i + 1);

    if (page_max >= 0 && page_current > page_max) set_page_current(page_max);

    const item_min = page_current * item_per_page;
    const item_max = page_max === page_current ? irregular.length : (page_current + 1) * item_per_page;

    const goto = (page) => {
        if (page < 0) page = 0;
        else if (page > page_max) page = page_max;
        if (page !== page_current) set_page_current(page);
    };

    const upd = async () => {
        try {
            const response = await fetch(`${api}/${upd_data._id}`, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + auth.access_token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    price: upd_data.price,
                }),
            });
            if (!response.ok) {
                throw new Error("Error");
            }
            const result = await response.json();
            if (!result.status) throw new Error(result.message);
            set_data((data) => {
                let dt = data;
                let idx = dt.irregular.findIndex((a) => a._id === upd_data._id);
                dt.irregular[idx] = upd_data;
                return dt;
            });
        } catch (err) {
            throw err;
        }
    };

    const del = async () => {
        try {
            const response = await fetch(`${api}/${del_data._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + auth.access_token,
                },
            });
            if (!response.ok) {
                throw new Error("Error");
            }
            const result = await response.json();
            if (!result.status) throw new Error(result.message);
            set_data((data) => {
                let dt = data;
                dt.irregular = dt.irregular.filter((a) => a._id !== del_data._id);
                return dt;
            });
        } catch (err) {
            throw err;
        }
    };

    const action = async (type) => {
        try {
            switch (type) {
                case 1:
                    await upd();
                    break;
                case 2:
                    await del();
                    break;
            }
            addToast("Thành công", {
                appearance: "success",
                autoDismiss: true,
                autoDismissTimeout: 3000,
            });
        } catch (err) {
            addToast(err.toString(), {
                appearance: "error",
                autoDismiss: true,
                autoDismissTimeout: 3000,
            });
        }
    };

    return (
        <div>
            <div className="table-data">
                <table>
                    {columns.map((item) => (
                        <col width={`${item.width}%`} />
                    ))}
                    <tbody>
                        <tr>
                            <td colSpan={columns.length + 1} style={{ height: 28 }}>
                                <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
                                    <div style={{ textAlign: "center", flex: 4 }}>
                                        <div
                                            style={{
                                                display: "inline-block",
                                                width: 25,
                                                height: 22,
                                                color: "#888",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => goto(0)}>
                                            &laquo;
                                        </div>
                                        {pages.map((item) => (
                                            <div
                                                style={{
                                                    display: "inline-block",
                                                    width: 25,
                                                    height: 22,
                                                    backgroundColor: item === page_current + 1 ? "#007ad9" : "#fff",
                                                    color: item === page_current + 1 ? "#fff" : "#888",

                                                    cursor: "pointer",
                                                }}
                                                onClick={() => goto(item - 1)}>
                                                {item}
                                            </div>
                                        ))}
                                        <div
                                            style={{
                                                display: "inline-block",
                                                width: 25,
                                                height: 22,
                                                color: "#888",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => goto(page_max)}>
                                            &raquo;
                                        </div>
                                    </div>
                                    <div style={{ flex: 1, textAlign: "right", marginRight: 10 }}>
                                        Tổng: {irregular.length}
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            {columns.map((item) => (
                                <th>{item.title}</th>
                            ))}
                            <th>Thao tác</th>
                        </tr>
                        {irregular.slice(item_min, item_max).map((item) => (
                            <tr>
                                {columns.map((i) => (
                                    <td>{item[i.name]}</td>
                                ))}
                                <td style={{ textAlign: "center" }}>
                                    <button
                                        onClick={() => {
                                            set_upd_data(item);
                                            set_upd_open(true);
                                        }}>
                                        <i className="fa fa-edit"></i>
                                    </button>
                                    <button
                                        onClick={() => {
                                            set_del_data(item);
                                            set_del_open(true);
                                        }}>
                                        <i className="fa fa-remove"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal
                id="upd"
                isOpen={upd_open}
                onRequestClose={() => set_upd_open(false)}
                style={custom_styles}
                contentLabel="Upd">
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Giá thuê dự đoán</td>
                                <td>
                                    <input
                                        disabled
                                        style={{
                                            width: 200,
                                            height: 24,
                                            paddingLeft: 10,
                                        }}
                                        value={upd_data.predicted_price}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Giá thuê thực tế</td>
                                <td>
                                    <input
                                        style={{
                                            width: 200,
                                            height: 24,
                                            paddingLeft: 10,
                                        }}
                                        value={upd_data.price}
                                        onChange={(e) =>
                                            set_upd_data({
                                                ...upd_data,
                                                price: parseFloat(e.target.value),
                                            })
                                        }
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{ textAlign: "right", marginTop: 10 }}>
                        <button
                            onClick={() => {
                                action(1);
                                set_upd_open(false);
                            }}>
                            <i className="fa fa-check"></i>
                        </button>
                        <button onClick={() => set_upd_open(false)}>
                            <i className="fa fa-close"></i>
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal
                id="del"
                isOpen={del_open}
                onRequestClose={() => set_del_open(false)}
                style={custom_styles}
                contentLabel="Del">
                <div>Bạn có chắc chắn muốn xóa không?</div>
                <div style={{ textAlign: "right", marginTop: 10 }}>
                    <button
                        onClick={() => {
                            action(2);
                            set_del_open(false);
                        }}>
                        Ok
                    </button>
                    <button onClick={() => set_del_open(false)}>Hủy</button>
                </div>
            </Modal>
        </div>
    );
};

export default IrregularRooms;
