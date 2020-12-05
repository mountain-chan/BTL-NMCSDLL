import { useState } from "react";
import { Scatter } from "react-chartjs-2";

const Relation = (props) => {
    const [label_x, set_label_x] = useState("rank");
    const [label_y, set_label_y] = useState("price");

    let xy = props.data.map((value) => {
        return {
            x: value[label_x],
            y: value[label_y],
        };
    });

    let list = [
        "acreage",
        "bed_type",
        "distance_from_center",
        "is_near_beach",
        "rank",
        "meal",
        "city_id",
        "property_type_id",
        "price",
    ];

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: 180, flexDirection: "column" }}>
                <div style={{ marginTop: 150, marginLeft: 20 }}>
                    X:
                    <select
                        style={{
                            width: 100,
                            height: 30,
                            paddingLeft: 10,
                            marginLeft: 10,
                            backgroundColor: "#f7f7f7",
                        }}
                        value={label_x}
                        onChange={(event) => set_label_x(event.target.value)}>
                        {list.map((value) => (
                            <option value={value}>{value}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginTop: 20, marginLeft: 20 }}>
                    Y:
                    <select
                        style={{
                            width: 100,
                            height: 30,
                            paddingLeft: 10,
                            marginLeft: 10,
                            backgroundColor: "#f7f7f7",
                        }}
                        value={label_y}
                        onChange={(event) => set_label_y(event.target.value)}>
                        {list.map((value) => (
                            <option value={value}>{value}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div style={{ textAlign: "center", marginLeft: 50 }}>
                <Scatter
                    width={600}
                    height={300}
                    data={{
                        labels: "d",
                        datasets: [
                            {
                                label: "Scatter Dataset",
                                data: xy,
                                backgroundColor: "#2196f3",
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
                <div style={{ margin: "20px 0 50px 0" }}>
                    Sự phụ thuộc của {label_x} đến {label_y}
                </div>
            </div>
        </div>
    );
};

export default Relation;
