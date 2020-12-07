import React from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";

import Manager from "./screens/Manager/Manager";
// import Customer from "./screens/Customer/Customer";

import "font-awesome/css/font-awesome.min.css";
import "./App.css";

import { auth_reducer } from "./store/reducers/Auth";

const root_reducer = combineReducers({
    auth: auth_reducer,
});

const store = createStore(root_reducer, applyMiddleware(ReduxThunk));

function App() {
    return (
        <Provider store={store}>
            <ToastProvider>
                <Manager />
                {/* <Customer /> */}
            </ToastProvider>
        </Provider>
    );
}

export default App;
