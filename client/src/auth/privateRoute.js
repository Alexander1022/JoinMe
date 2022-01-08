import React, { Component } from "react";
import { Route, Navigate } from "react-router-dom";
import auth from "./sessionManage";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      auth.isAuthenticated() ? (
        <Component {...props}/>) : (
        <Redirect to={{
          pathname: '/signin',
          state: { from: props.location }
        }}/>
      )
    )}/>
)
  
export default PrivateRoute;