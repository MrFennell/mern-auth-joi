import React from 'react';
import Welcome from './Welcome';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import { AuthRoute, ProtectedRoute } from "../util/route";

export default () => (
  <>
    <AuthRoute exact path="/" component={Welcome} />
    <AuthRoute path="/login" component={Login} />
    <AuthRoute path="/signup" component={Signup} />
    <ProtectedRoute path="/dashboard" component={Dashboard} />
  </>
);