import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";

import Manager from "./screens/Admin/Manager";

// import Header from "./screens/Header";
// import Footer from "./screens/Footer";
// import Home from "./screens/Home";
// import Properties from "./screens/Properties";
// import Property from "./screens/Property";
// import Profile from "./screens/Profile";
// import History from "./screens/History";
// import Contact from "./screens/Contact";
// import News from "./screens/News";

import "font-awesome/css/font-awesome.min.css";
import "./css/App.css";

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
            </ToastProvider>
        </Provider>
        // <Router>
        //     <Header />
        //     <div>
        //         <Switch>
        //             <Route path="/properties" exact render={Properties} />
        //             <Route path="/properties/:_id" exact render={Property} />
        //             <Route path="/profile" exact render={Profile} />
        //             <Route path="/profile/history" exact render={History} />
        //             <Route path="/contact" exact render={Contact} />
        //             <Route path="/news" exact>
        //                 <News />
        //             </Route>
        //             <Route path="/" >
        //                 <Home />
        //             </Route>
        //         </Switch>
        //     </div>
        //     <Footer />
        // </Router>
    );
}

export default App;
