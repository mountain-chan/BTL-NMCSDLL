import { useState, useEffect } from "react";

const columns = [
    { name: "acreage", title: "Diện tích", width: 11 },
    { name: "bed_type", title: "Loại giường", width: 11 },
    { name: "distance_from_center", title: "Cách trung tâm", width: 12 },
    { name: "is_near_beach", title: "Gần biển", width: 11 },
    { name: "rank", title: "Xếp hạng", width: 11 },
    { name: "meal", title: "Bữa ăn", width: 11 },
    { name: "city_id", title: "Thành phố", width: 11 },
    { name: "property_type_id", title: "Loại chỗ nghỉ", width: 11 },
    { name: "price", title: "Giá thuê", width: 11 },
];

const item_per_page = 10;

const RoomsDetail = (props) => {
    const data = props.data;
    const [page_current, set_page_current] = useState(0);

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
                                    <div style={{ flex: 1, textAlign: "right", paddingRight: 10 }}>
                                        Tổng: {data.length}
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            {columns.map((item) => (
                                <th>{item.title}</th>
                            ))}
                        </tr>
                        {data.slice(item_min, item_max).map((item) => (
                            <tr>
                                {columns.map((i) => (
                                    <td>{item[i.name]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RoomsDetail;
