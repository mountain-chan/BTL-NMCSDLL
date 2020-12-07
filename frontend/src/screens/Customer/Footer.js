import sticker_facebook from "../../images/sticker_facebook.png";
import sticker_youtube from "../../images/sticker_youtube.png";

const Footer = (props) => {
    return (
        <div>
            <div
                style={{
                    backgroundColor: "#003580",
                    height: 140,
                    marginTop: 30,
                    marginBottom: 30,
                }}>
                <div
                    style={{
                        width: "80%",
                        margin: "0 auto",
                        textAlign: "center",
                    }}>
                    <button
                        style={{
                            margin: "25px auto 0 auto",
                            height: 35,
                            backgroundColor: "#007ad9",
                            border: "none",
                            color: "white",
                            borderRadius: 4,
                            padding: "5px 14px",
                        }}>
                        Đăng chỗ nghỉ của bạn
                    </button>
                    <hr
                        style={{
                            border: "none",
                            height: 1,
                            backgroundColor: "#537BB4",
                            marginTop: 25,
                            marginBottom: 15,
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}>
                        <div>
                            <a href="#" style={{ color: "#FFF", fontSize: 15 }}>
                                Phiên bản máy tính
                            </a>
                        </div>
                        <div>
                            <a href="#" style={{ color: "#FFF", fontSize: 15 }}>
                                Phiên bản di động
                            </a>
                        </div>
                        <div>
                            <a href="#" style={{ color: "#FFF", fontSize: 15 }}>
                                Quản lý các đặt phòng
                            </a>
                        </div>
                        <div>
                            <a href="#" style={{ color: "#FFF", fontSize: 15 }}>
                                Dịch vụ khách hàng
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ width: "80%", margin: "0 auto" }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                    }}>
                    <div>
                        <ul>
                            <li>
                                <a href="#">Khu vực</a>
                            </li>
                            <li>
                                <a href="#">Thành phố</a>
                            </li>
                            <li>
                                <a href="#">Loại khách sạn</a>
                            </li>
                            <li>
                                <a href="#">Khách sạn</a>
                            </li>
                            <li>
                                <a href="#">Được quan tâm</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <a href="#">Biệt thự</a>
                            </li>
                            <li>
                                <a href="#">Căn hộ</a>
                            </li>
                            <li>
                                <a href="#">Resort</a>
                            </li>
                            <li>
                                <a href="#">Nhà khách</a>
                            </li>
                            <li>
                                <a href="#">Nhà trọ</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <a href="#">Chỗ độc đáo</a>
                            </li>
                            <li>
                                <a href="#">Tất cả điểm đến</a>
                            </li>
                            <li>
                                <a href="#">Đánh giá của khách</a>
                            </li>
                            <li>
                                <a href="#">Bài viết</a>
                            </li>
                            <li>
                                <a href="#">Được quan tâm</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <a href="#">Tin tức</a>
                            </li>
                            <li>
                                <a href="#">Hỗ trợ</a>
                            </li>
                            <li>
                                <a href="#">Dịch vụ</a>
                            </li>
                            <li>
                                <a href="#">Điều khoản</a>
                            </li>
                            <li>
                                <a href="#">Liên hệ</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div
                    style={{
                        borderTop: "1px solid #E0E0E0",
                        borderBottom: "1px solid #E0E0E0",
                        height: 50,
                        marginTop: 20,
                    }}>
                    <span style={{ fontSize: 12 }}>
                        Dù bạn là ai, đang tìm kiếm gì, chúng tôi cũng có chỗ
                        nghỉ hoàn hảo dành cho bạn. 29,105,615 đăng ký của chúng
                        tôi bao gồm 6,296,677 đăng ký nhà, căn hộ và những nơi ở
                        độc đáo khác, khắp 155,177 điểm đến tại khắp nơi trên
                        Việt Nam. QLKS có trụ sở tại Hà Nội, Việt Nam và được hỗ
                        trợ bởi 198 văn phòng khắp Việt Nam.
                    </span>
                </div>

                <div style={{ height: 40, textAlign: "center" }}>
                    <span style={{ fontSize: 11 }}>
                        Bản quyền © 2019–2020 QLKS™. Bảo lưu mọi quyền.
                    </span>
                </div>

                <div style={{ height: 50, textAlign: "center" }}>
                    <a href="https://www.facebook.com/WH.KnightZ">
                        <img
                            style={{ marginRight: 10 }}
                            src={sticker_facebook}
                            alt="facebook"
                        />
                    </a>
                    <a href="https://www.youtube.com/channel/UCyRY53rs_lgyJ-p3PzZj0Og">
                        <img src={sticker_youtube} alt="youtube" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
