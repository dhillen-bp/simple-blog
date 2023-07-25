import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import { Footer, Header } from "../../components/molecules";
import CreateBlog from "../CreateBlog";
import DetailBlog from "../DetailBlog";
import Home from "../Home";
import "./mainApp.scss";

const MainApp = () => {
  return (
    <div className="main-app-wrapper">
      <div className="header-wrapper">
        <Header />
      </div>
      <div className="content-wrapper">
        <Switch>
          <Route path="/create-blog/:id?" element={<CreateBlog />}></Route>
          <Route path="/detail-blog/:id" element={<DetailBlog />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Switch>
      </div>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>
  );
};

export default MainApp;
