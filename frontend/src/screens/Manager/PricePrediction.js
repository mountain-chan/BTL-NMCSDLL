import { useSelector } from "react-redux";
import { useState } from "react";

import { API_PREDICTIONS } from "../../constants";

const PricePrediction = (props) => {
    const auth = useSelector((state) => state.auth);
    const [type, set_type] = useState("linear");
    const [acreage, set_acreage] = useState(14);
    const [bed_type, set_bed_type] = useState(1);
    const [distance_from_center, set_distance_from_center] = useState(150);
    const [is_near_beach, set_is_near_beach] = useState(0);
    const [rank, set_rank] = useState(3.9);
    const [meal, set_meal] = useState(4);
    const [city_id, set_city_id] = useState("2");
    const [property_type_id, set_property_type_id] = useState("7");
    const [price, set_price] = useState(420);

    const predict = async () => {
        try {
            let response = await fetch(`${API_PREDICTIONS}?type=${type}`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + auth.access_token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    acreage: acreage,
                    bed_type: bed_type,
                    distance_from_center: distance_from_center,
                    is_near_beach: is_near_beach,
                    rank: rank,
                    meal: meal,
                    city_id: city_id,
                    property_type_id: property_type_id,
                }),
            });
            if (!response.ok) throw new Error("Error");
            let result = await response.json();
            console.log(result);
            if (!result.status) throw new Error(result.message);
            set_price(result.data);
        } catch (err) {
            console.log(err.toString());
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ marginLeft: 50 }}>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Diện tích</div>
                    <input
                        style={{ paddingLeft: 5 }}
                        value={acreage}
                        onChange={(e) => set_acreage(parseFloat(e.target.value))}
                    />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Loại giường</div>
                    <select
                        style={{
                            width: 158,
                            height: 21,
                            paddingLeft: 5,
                        }}
                        value={bed_type}
                        onChange={(event) => set_bed_type(parseInt(event.target.value))}>
                        <option value={0}>Giường đơn</option>
                        <option value={1}>Giường đôi</option>
                    </select>
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Cách trung tâm</div>
                    <input
                        style={{ paddingLeft: 5 }}
                        value={distance_from_center}
                        onChange={(e) => set_distance_from_center(parseFloat(e.target.value))}
                    />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Giáp biển</div>
                    <input
                        type="checkbox"
                        checked={is_near_beach}
                        onChange={(e) => set_is_near_beach(1 - is_near_beach)}
                    />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Xếp hạng</div>
                    <input
                        style={{ paddingLeft: 5 }}
                        value={rank}
                        onChange={(e) => set_rank(parseFloat(e.target.value))}
                    />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Bữa ăn</div>
                    <select
                        style={{
                            width: 158,
                            height: 21,
                            paddingLeft: 5,
                        }}
                        value={meal}
                        onChange={(e) => set_meal(parseInt(e.target.value))}>
                        <option value={0}>Không có</option>
                        <option value={1}>Bữa sáng</option>
                        <option value={2}>Bữa sáng và trưa</option>
                        <option value={3}>Bữa sáng và tối</option>
                        <option value={4}>Cả ba bữa</option>
                    </select>
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Thành phố</div>
                    <input style={{ paddingLeft: 5 }} value={city_id} onChange={(e) => set_city_id(e.target.value)} />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Loại chỗ nghỉ</div>
                    <input
                        style={{ paddingLeft: 5 }}
                        value={property_type_id}
                        onChange={(e) => set_property_type_id(e.target.value)}
                    />
                </div>
            </div>
            <div style={{ marginLeft: 50 }}>
                <div style={{ marginBottom: 56 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Sử dụng</div>
                    <select
                        style={{
                            width: 158,
                            height: 21,
                            paddingLeft: 10,
                        }}
                        value={type}
                        onChange={(event) => set_type(event.target.value)}>
                        <option value="linear">Linear Regression</option>
                        <option value="neural">Neural Network</option>
                    </select>
                </div>
                <div style={{ marginBottom: 56, textAlign: "center" }}>
                    <div style={{ width: 140, display: "inline-block" }}></div>
                    <button style={{ width: 100 }} onClick={predict}>
                        Dự đoán
                    </button>
                </div>
                <div>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Kết quả</div>
                    <input value={price} disabled />
                </div>
            </div>
        </div>
    );
};

export default PricePrediction;
