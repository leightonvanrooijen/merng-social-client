import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../components/Login";
import Register from "../pages/Register";
import AuthRoute from "../utils/AuthRoute"


export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <AuthRoute exact path="/login" component={LoginPage} />
      <AuthRoute exact path="/register" component={Register} />
    </Switch>
  );
}
