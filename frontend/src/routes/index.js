import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "../pages/Home";
import { ErrorDetails } from "../components/ErrorDetails";
import { NotFound } from "../components/NotFound";
import { isAuth } from "../components/Auth";
import { User } from "../components/User";

const PrivateRoute = ({ component: Component, ...params }) => (
  <Route
    {...params}
    render={props =>
      isAuth() ? (
        <Component {...props} />
      ) : (
        <Component {...props} />
        // <Redirect
        //   to={{ pathname: "./login", state: { from: props.location } }}
        // />
      )
    }
  />
);

const Routes = () => (
  <>
    <Switch>
      <PrivateRoute exact path="/" component={Home}></PrivateRoute>
      <Route exact path="/error-details/:id" component={ErrorDetails}></Route>
      <Route exact path="/404" component={NotFound}></Route>
      <Route exact path="/login" render={() => <div>Login</div>}></Route>
      <Route exact path="/new-user" render={User}></Route>
      <Route path="*" render={() => <Redirect to="/404" />}></Route>
    </Switch>
  </>
);

export default Routes;
