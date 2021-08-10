import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";

const Router = () => (
    <BrowserRouter>
        <Switch>
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
