import { FET_USER, INS_USER, DEL_USER, UPD_USER } from "../actions/User";

const initial_state = [
    {
        username: "NguyenKhanh",
        password: "123456",
        name: "Nguyễn Khánh",
        gender: 1,
        phone: "0366918587",
        email: "nguyenkhanh@gmail.com",
        is_admin: 1,
    },
    {
        username: "LyChan",
        password: "123456",
        name: "Lý Văn Chản",
        gender: 1,
        phone: "0123455678",
        email: "lychan@gmail.com",
        is_admin: 1,
    },
    {
        username: "BuiThuy",
        password: "123456",
        name: "Bùi Đình Thủy",
        gender: 1,
        phone: "0556878945",
        email: "buithuy@gmail.com",
        is_admin: 1,
    },
    {
        username: "NgoThuong",
        password: "123456",
        name: "Ngô Văn Thường",
        gender: 1,
        phone: "0358763412",
        email: "ngothuong@gmail.com",
        is_admin: 0,
    },
    {
        username: "User",
        password: "123456",
        name: "Người Dùng",
        gender: 0,
        phone: "0358763412",
        email: "user@gmail.com",
        is_admin: 0,
    },
    {
        username: "NguyenKhanh2",
        password: "123456",
        name: "Nguyễn Khánh",
        gender: 1,
        phone: "0366918587",
        email: "nguyenkhanh@gmail.com",
        is_admin: 1,
    },
    {
        username: "LyChan2",
        password: "123456",
        name: "Lý Văn Chản",
        gender: 1,
        phone: "0123455678",
        email: "lychan@gmail.com",
        is_admin: 1,
    },
    {
        username: "BuiThuy2",
        password: "123456",
        name: "Bùi Đình Thủy",
        gender: 1,
        phone: "0556878945",
        email: "buithuy@gmail.com",
        is_admin: 1,
    },
    {
        username: "NgoThuong2",
        password: "123456",
        name: "Ngô Văn Thường",
        gender: 1,
        phone: "0358763412",
        email: "ngothuong@gmail.com",
        is_admin: 0,
    },
    {
        username: "User2",
        password: "123456",
        name: "Người Dùng",
        gender: 0,
        phone: "0358763412",
        email: "user@gmail.com",
        is_admin: 0,
    },
];

export const user_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case FET_USER:
            return action.value;
        case INS_USER:
            return [...state, action.value];
        case DEL_USER:
            return state.filter((a) => a.username !== action.value);
        case UPD_USER:
            const idx = state.findIndex(
                (a) => a.username === action.value.username
            );
            let new_state = state;
            new_state[idx] = action.value;
            return new_state;
        default:
            return state;
    }
};
