import { NavLink } from "react-router-dom";

import logo from "../images/logo.png";

import "../css/Header.css";

const Header = (props) => {
    return (
        <div style={{ backgroundColor: "#003580", paddingBottom: 3 }}>
            <a href="/">
                <img
                    src={logo}
                    width={299}
                    height={62}
                    style={{ margin: "10px 0px 0px 240px" }}
                />
            </a>
            <div style={{ width: "80%", margin: "0 auto" }}>
                <nav>
                    <ul className="topnav" style={{ padding: 0 }}>
                        <li>
                            <NavLink to="/" exact activeClassName="active">
                                Trang chủ
                                <div className="underline"></div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/properties"
                                strict
                                activeClassName="active">
                                Khách sạn
                                <div className="underline"></div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/profile"
                                strict
                                activeClassName="active">
                                Cá nhân
                                <div className="underline"></div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contact"
                                exact
                                activeClassName="active">
                                Liên hệ
                                <div className="underline"></div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/news" exact activeClassName="active">
                                Tin tức
                                <div className="underline"></div>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;
