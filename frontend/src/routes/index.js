import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"

import { Home } from "../pages/Home"
import { Error } from "../pages/Error"
import { NotFound } from "../components/NotFound"
import { isAuth } from "../components/Auth"

const PrivateRoute = ({ component: Component, ...params }) => (
  <Route
    {...params}
    render={ props => (
      isAuth() 
        ? <Component {...props} />
        : <Redirect to={{ pathname: "./login", state: { from: props.location } }} />
      )
    }
  />
)

const Routes = () => (
  <>
    <Switch>
      <PrivateRoute exact path="/" component={Home}></PrivateRoute>
      <PrivateRoute exact path="/error/:id" component={Error}></PrivateRoute>
      <Route exact path="/404" component={NotFound}></Route>
      <Route exact path="/login" render={() => (<div>Login</div>)}></Route>
      <Route path="*" render={() => <Redirect to="/404" />}></Route>
    </Switch>
  </>
)

export default Routes
