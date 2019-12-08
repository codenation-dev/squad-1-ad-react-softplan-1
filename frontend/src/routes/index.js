import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Home } from "../pages/Home";
import { Error } from "../pages/Error";
import { NotFound } from "../components/NotFound";

const Routes = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/error/:id" component={Error}></Route>
      <Route exact path="/404" component={NotFound}></Route>
      <Route path="*" render={() => <Redirect to="/404" />}></Route>
    </Switch>
  </>
);

export default Routes;
