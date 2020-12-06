import { API_LOGIN, API_LOGOUT } from "../../constants";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (username, password) => {
    return async (dispatch) => {
        try {
            const response = await fetch(API_LOGIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            if (!response.ok) {
                throw new Error("Error");
            }
            const result = await response.json();
            if (!result.status) throw new Error(result.message);
            dispatch({ type: LOGIN, value: result.data });
        } catch (err) {
            throw err;
        }
    };
};
