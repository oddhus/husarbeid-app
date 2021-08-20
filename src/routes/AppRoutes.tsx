import React from "react";
import { Route, Switch } from "react-router-dom";
import { Register } from "../components/Authentication/Register";
import { SignIn } from "../components/Authentication/SignIn";
import { LandingPage } from "../components/LandingPage/LandingPage";
import MyAccount from "../components/MyAccount/MyAccount";
import { CreateTask } from "../components/Tasks/CreateTask";
import { TaskPage } from "../Pages/TaskPage";

interface Props {}

export const AppRoutes: React.FC<Props> = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ flex: 1 }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/tasks" component={TaskPage} />
          <Route exact path="/create-task" component={CreateTask} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/my-account" component={MyAccount} />
        </Switch>
      </div>
    </div>
  );
};
