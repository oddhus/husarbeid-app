import React from "react";
import { Route, Switch } from "react-router-dom";
import { Authentication } from "../components/Authentication/AuthenticationPage";
import MyAccount from "../components/MyAccount/MyAccount";

interface Props {}

export const AppRoutes: React.FC<Props> = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ flex: 1 }}>
        <Switch>
          <Route exact path="/auth" component={Authentication} />
          <Route exact path="/my-account" component={MyAccount} />
        </Switch>
      </div>
    </div>
  );
};
