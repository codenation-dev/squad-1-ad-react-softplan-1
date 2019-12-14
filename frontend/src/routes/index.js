import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { ErrorDetails } from "../components/ErrorDetails";
import { NotFound } from "../components/NotFound";
import { isAuth } from "../services/Auth";

const PrivateRoute = ({ component: Component, ...params }) => (
  <Route
    {...params}
    render={props =>
      isAuth() 
      ? <Component {...props} />
      : <Redirect to={{ pathname: "./login", state: { from: props.location } }} />
    }
  />
);

const Routes = () => (
  <>
    <Switch>
      <PrivateRoute exact path="/" component={Home}></PrivateRoute>
      <PrivateRoute exact path="/error-details/:id" component={ErrorDetails}></PrivateRoute>
      <Route exact path="/404" component={NotFound}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/signup" render={SignUp}></Route>
      <Route path="*" render={() => <Redirect to="/404" />}></Route>
    </Switch>
  </>
);

export default Routes;
