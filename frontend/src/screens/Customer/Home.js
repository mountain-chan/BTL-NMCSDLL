import React, { useState } from "react";

const Home = (props) => {
    const [value, onChange] = useState(null);

    return (
        <div style={{ backgroundColor: "#F7F7F7", height: 300, marginTop: 0 }}>
            <div style={{ width: "80%", margin: "0 auto", padding: 20 }}>
                <div style={{ fontSize: 30 }}>
                    Tìm kiếm ưu đãi khách sạn, chỗ nghỉ ...
                </div>
                <div style={{ fontSize: 14, marginTop: 10 }}>
                    Từ những khu nghỉ dưỡng thanh bình đến những căn hộ hạng
                    sang hiện đại
                </div>
            </div>
        </div>
    );
};

export default Home;
