import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import PrivacyPolicy from "./PrivacyPolicy";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/sfg-privacy-policy" component={PrivacyPolicy} />
            <Route exact path="/" component={App} />
            <Route path="/host" component={App} />
            <Route path="/join" component={App} />
            <Route path="/login" component={App} />
            <Route path="/lobby/:lobbyname" component={App} />
            <Route path="/play/:lobbyname" component={App} />
            <Route component={App} />
        </Switch>
    </BrowserRouter>
);

export default Router;
