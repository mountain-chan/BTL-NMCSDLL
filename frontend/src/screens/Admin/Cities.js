import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import * as actions from "../../actions";

import { custom_styles, API_CITIES as api } from "../../constants";
import HeadText from "./HeadText";

Modal.setAppElement("#root");

const columns = [
    { name: "name", title: "Tên thành phố", width: 20 },
    { name: "description", title: "Mô tả", width: 30 },
    { name: "image", title: "Hình ảnh", width: 35 },
];

const item_per_page = 8;

const Cities = (props) => {
    const auth = useSelector((state) => state.auth);

    const { addToast } = useToasts();

    const [data, set_data] = useState([]);
    const [ins_open, set_ins_open] = useState(false);
    const [upd_open, set_upd_open] = useState(false);
    const [del_open, set_del_open] = useState(false);
    const [ins_data, set_ins_data] = useState({
        name: "",
        description: "",
        image: ".jpg",
    });
    const [upd_data, set_upd_data] = useState({
        _id: "",
        name: "",
        description: "",
        image: ".jpg",
    });
    const [del_data, set_del_data] = useState("");
    const [page_current, set_page_current] = useState(0);

    useEffect(() => {
        const load = async () => {
            try {
                await actions.fet(api, set_data, auth.access_token);
            } catch (err) {}
        };
        load();
    }, []);

    const page_max = Math.ceil(data.length / item_per_page) - 1;
    const pages = [];
    let page_left = page_current - 3,
        page_right = page_current + 3;
    if (page_left < 0) page_left = 0;
    if (page_right > page_max) page_right = page_max;
    for (let i = page_left; i <= page_right; i++) pages.push(i + 1);

    if (page_max >= 0 && page_current > page_max) set_page_current(page_max);

    const item_min = page_current * item_per_page;
    const item_max = page_max === page_current ? data.length : (page_current + 1) * item_per_page;

    const goto = (page) => {
        if (page < 0) page = 0;
        else if (page > page_max) page = page_max;
        if (page !== page_current) set_page_current(page);
    };

    const action = async (type) => {
        try {
            switch (type) {
                case 0:
                    await actions.ins(api, set_data, ins_data, auth.access_token);
                    break;
                case 1:
                    await actions.upd(api, set_data, upd_data, auth.access_token);
                    break;
                case 2:
                    await actions.del(api, set_data, del_data, auth.access_token);
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
            <HeadText>Quản lý - Thành phố</HeadText>

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
                                    <div style={{ flex: 1, textAlign: "right" }}>
                                        Tổng: {data.length}
                                        <button style={{ marginLeft: 15 }} onClick={() => set_ins_open(true)}>
                                            <i className="fa fa-plus-circle"></i>
                                            <span
                                                style={{
                                                    marginLeft: 8,
                                                    marginRight: 6,
                                                }}>
                                                Thêm mới
                                            </span>
                                        </button>
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
                        {data.slice(item_min, item_max).map((item) => (
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
                id="ins"
                isOpen={ins_open}
                onRequestClose={() => set_ins_open(false)}
                style={custom_styles}
                contentLabel="Ins">
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Tên thành phố</td>
                                <td>
                                    <input
                                        style={{
                                            width: 200,
                                            height: 24,
                                            paddingLeft: 10,
                                        }}
                                        value={ins_data.name}
                                        onChange={(event) =>
                                            set_ins_data({
                                                ...ins_data,
                                                name: event.target.value,
                                            })
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Mô tả</td>
                                <td>
                                    <input
                                        style={{
                                            width: 200,
                                            height: 24,
                                            paddingLeft: 10,
                                        }}
                                        value={ins_data.description}
                                        onChange={(event) =>
                                            set_ins_data({
                                                ...ins_data,
                                                description: event.target.value,
                                            })
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Hình ảnh</td>
                                <td>
                                    <input
                                        style={{
                                            width: 200,
                                            height: 24,
                                            paddingLeft: 10,
                                        }}
                                        value={ins_data.image}
                                        onChange={(event) =>
                                            set_ins_data({
                                                ...ins_data,
                                                image: event.target.value,
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
                                action(0);
                                set_ins_open(false);
                            }}>
                            <i className="fa fa-check"></i>
                        </button>
                        <button onClick={() => set_ins_open(false)}>
                            <i className="fa fa-close"></i>
                        </button>
                    </div>
                </div>
            </Modal>
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
                                <td>Tên thành phố</td>
                                <td>
                                    <input
                                        style={{
                                            width: 200,
                                            height: 24,
                                            paddingLeft: 10,
                                        }}
                                        value={upd_data.name}
                                        onChange={(event) =>
                                            set_upd_data({
                                                ...upd_data,
                                                name: event.target.value,
                                            })
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Mô tả</td>
                                <td>
                                    <input
                                        style={{
                                            width: 200,
                                            height: 24,
                                            paddingLeft: 10,
                                        }}
                                        value={upd_data.description}
                                        onChange={(event) =>
                                            set_upd_data({
                                                ...upd_data,
                                                description: event.target.value,
                                            })
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Hình ảnh</td>
                                <td>
                                    <input
                                        style={{
                                            width: 200,
                                            height: 24,
                                            paddingLeft: 10,
                                        }}
                                        value={upd_data.image}
                                        onChange={(event) =>
                                            set_upd_data({
                                                ...upd_data,
                                                image: event.target.value,
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

export default Cities;
