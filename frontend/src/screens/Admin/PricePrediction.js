import { useSelector } from "react-redux";
import { useState } from "react";

import { API_PREDICTIONS } from "../../constants";

const PricePrediction = (props) => {
    const auth = useSelector((state) => state.auth);
    const [type, set_type] = useState("linear");
    const [acreage, set_acreage] = useState(14);
    const [bed_type, set_bed_type] = useState(0);
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
            if (!result.status) throw new Error("Error");
            set_price(result.data);
        } catch (err) {
            throw err;
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Diện tích</div>
                    <input value={acreage} onChange={(e) => set_acreage(e.target.value)} />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Loại giường</div>
                    <input value={bed_type} onChange={(e) => set_bed_type(e.target.value)} />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Cách trung tâm</div>
                    <input value={distance_from_center} onChange={(e) => set_distance_from_center(e.target.value)} />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Giáp biển</div>
                    <input value={is_near_beach} onChange={(e) => set_is_near_beach(e.target.value)} />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Xếp hạng</div>
                    <input value={rank} onChange={(e) => set_rank(e.target.value)} />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Bữa ăn</div>
                    <input value={meal} onChange={(e) => set_meal(e.target.value)} />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Thành phố</div>
                    <input value={city_id} onChange={(e) => set_city_id(e.target.value)} />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Loại chỗ nghỉ</div>
                    <input value={property_type_id} onChange={(e) => set_property_type_id(e.target.value)} />
                </div>
            </div>
            <div>
                <div style={{ marginBottom: 40 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Sử dụng</div>
                    <select
                        style={{
                            width: 156,
                            height: 24,
                            paddingLeft: 10,
                        }}
                        value={type}
                        onChange={(event) => set_type(event.target.value)}>
                        <option value="linear">Linear Regression</option>
                        <option value="neural">Neural Network</option>
                    </select>
                </div>
                <div style={{ marginBottom: 40, textAlign: "right" }}>
                    <button onClick={predict}>Dự đoán</button>
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ width: 140, textAlign: "center", display: "inline-block" }}>Kết quả</div>
                    <input value={price} disabled />
                </div>
            </div>
        </div>
    );
};

export default PricePrediction;
