import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import { MainApp, Login, Register } from "../../pages";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<MainApp />}></Route>
      </Switch>
    </Router>
  );
};

export default Routes;
