const API = "http://127.0.0.1:5012/api/";
const API_STATISTICS = API + "statistics/";

export const API_LOGIN = API + "auth/login";
export const API_LOGOUT = API + "auth/logout";
export const API_USERS = API + "users";
export const API_CITIES = API + "cities";
export const API_PROPERTY_TYPES = API + "property_types";
export const API_PROPERTIES = API + "properties";
export const API_ROOMS = API + "rooms";
export const API_ROOMS_DETAIL = API_ROOMS + "/detail";

export const API_STATISTICS_PROPERTIES_BY_CITY = API_STATISTICS + "properties_by_city";
export const API_STATISTICS_ROOMS_BY_CITY = API_STATISTICS + "rooms_by_city";
export const API_STATISTICS_ROOMS_BY_PROPERTY = API_STATISTICS + "rooms_by_property";
export const API_STATISTICS_BOOKINGS_BY_CITY = API_STATISTICS + "bookings_by_city";
export const API_STATISTICS_BOOKINGS_BY_YEAR = API_STATISTICS + "bookings_by_year";

export const API_PREDICTIONS = API + "predictions";
export const API_PREDICTIONS_IRREGULAR = API_PREDICTIONS + "/irregular";

export const custom_styles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
    overlay: {
        backgroundColor: "#0000006f",
    },
};

export const colors = [
    "#3e95cd",
    "#8e5ea2",
    "#3cba9f",
    "#e8c3b9",
    "#c45850",
    "#d0b1bf",
    "#845ec2",
    "#008f7a",
    "#2c73d2",
    "#ff6f91",
    "#d65db1",
    "#c34a36",
    "#b0a8b9",
    "#ff8066",
    "#008b74",
    "#9b89b3",
    "#00c0a3",
    "#926c00",
    "#6e63a9",
    "#9db8c6",
    "#84ae68",
    "#99701c",
    "#6c5e63",
    "#79980b",
    "#4fa105",
    "#8d04f8",
    "#346a9c",
    "#83458f",
];
