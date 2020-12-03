import { TOKEN, API_USERS } from '../../constants';

export const fet = async () => {
    try {
        const response = await fetch(API_USERS, {
            method: "GET",
            headers: {
                "Authorization": TOKEN
            }
        });
        if (!response.ok) {
            throw new Error("Error");
        }
        const loaded_data = await response.json();
        return loaded_data;
    } catch (err) {
        throw err;
    }
};

export const ins = (data) => {
    return async (dispatch) => {
        try {
            const response = await fetch(API_USERS, {
                method: "POST",
                headers: {
                    "Authorization": TOKEN,
                    "Content-Type": "application/json"
                },
                body: data,
            });
            if (!response.ok) {
                throw new Error("Error");
            }
            const res_data = await response.json();
            // dispatch({ type: INS_USER, value: data });
        } catch (err) {
            throw err;
        }
    };
};

export const upd = (data) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${API_USERS}/${data._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: data,
            });
            if (!response.ok) {
                throw new Error("Error");
            }
            const res_data = await response.json();
            // dispatch({ type: UPD_USER, value: data });
        } catch (err) {
            throw err;
        }
    };
};

export const del = (_id) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${API_USERS}/${_id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Error");
            }
            const res_data = await response.json();
            // dispatch({ type: DEL_USER, value: _id });
        } catch (err) {
            throw err;
        }
    };
};