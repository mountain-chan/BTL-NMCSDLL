import { LOGIN, LOGOUT } from "../actions/Auth";

const initial_state = {};

export const auth_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case LOGIN:
            return action.value;
        case LOGOUT:
            return action.value;
        default:
            return state;
    }
};
