export const fet = async (api, set, token) => {
    try {
        const response = await fetch(api, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        if (!response.ok) {
            throw new Error("Error");
        }
        const result = await response.json();
        if (!result.status) throw new Error("Error");
        set(result.data);
    } catch (err) {
        throw err;
    }
};

export const ins = async (api, set, data, token) => {
    try {
        const response = await fetch(api, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Error");
        }
        const result = await response.json();
        if (!result.status) throw new Error(result.message);
        set((state) => [...state, result.data]);
    } catch (err) {
        throw err;
    }
};

export const upd = async (api, set, data, token) => {
    try {
        const response = await fetch(`${api}/${data._id}`, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Error");
        }
        const result = await response.json();
        if (!result.status) throw new Error("Error");
        set((state) => {
            const idx = state.findIndex((a) => a._id === data._id);
            let new_state = state;
            new_state[idx] = data;
            return new_state;
        });
    } catch (err) {
        throw err;
    }
};

export const del = async (api, set, data, token) => {
    try {
        const response = await fetch(`${api}/${data._id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        if (!response.ok) {
            throw new Error("Error");
        }
        const result = await response.json();
        if (!result.status) throw new Error("Error");
        set((state) => state.filter((a) => a._id !== data._id));
    } catch (err) {
        throw err;
    }
};
