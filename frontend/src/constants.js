const API = "http://127.0.0.1:5012/api/";

export const API_LOGIN = API + "auth/login";
export const API_LOGOUT = API + "auth/logout";
export const API_USERS = API + "users";
export const API_CITIES = API + "cities";
export const API_PROPERTY_TYPES = API + "property_types";
export const API_PROPERTIES = API + "properties";
export const API_ROOMS = API + "rooms";

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
