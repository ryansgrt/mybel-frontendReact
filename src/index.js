import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss";
import "./assets/demo/demo.css";
import "./assets/demo/nucleo-icons-page-styles.css";
import Vendor from "../src/views/Vendor/VendorStore";
import {CookiesProvider} from "react-cookie";
import ProductStore from "../src/views/product/ProductStore";
import {Redirect} from "react-router-dom";
import User from "../src/views/User/UserStore";
import ChatForum from "../src/chat/ChatForum";



ReactDOM.render(
    <BrowserRouter>
        <CookiesProvider>
        <Switch>
            <Switch>
                <Route path="/index" render={props => <ProductStore {...props} />} />
                <Route path="/vendor" render={props => <Vendor/>} />
                <Route path="/user" render={props => <User/>} />
                <Route path="/forum" render={props => <ChatForum/>} />
                <Redirect from="/" to="/index" />

            </Switch>
        </Switch>
        </CookiesProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
