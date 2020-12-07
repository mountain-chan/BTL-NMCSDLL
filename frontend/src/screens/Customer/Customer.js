import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Properties from "./Properties";
import Property from "./Property";
import Profile from "./Profile";
import History from "./History";
import Contact from "./Contact";
import News from "./News";

const Customer = (props) => {
    return (
        <Router>
            <Header />

            <div>
                <Switch>
                    <Route path="/properties" exact render={Properties} />
                    <Route path="/properties/:_id" exact render={Property} />
                    <Route path="/profile" exact render={Profile} />
                    <Route path="/profile/history" exact render={History} />
                    <Route path="/contact" exact render={Contact} />
                    <Route path="/news" exact>
                        <News />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>

            <Footer />
        </Router>
    );
};

export default Customer;