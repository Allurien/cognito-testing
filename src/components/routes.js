import React from "react";
import { Switch } from "react-router-dom";
import AppliedRoute from "./appliedroute";
import Login from "./login";


export default ({ childProps }) =>
<Switch>
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
</Switch>;