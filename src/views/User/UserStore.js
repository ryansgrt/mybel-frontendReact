import {createStore} from "redux";
import React, {Component} from "react";
import {Provider} from "react-redux";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import {Route} from "react-router-dom";
import userReducer from "./reducers/UserReducer";
import UserRegistrationPage from "../pages/UserRegistrationPage";
import UserList from "./UserList";
import UserLoginPage from "../pages/UserLoginPage";
import UserProfile from "../pages/UserProfile";

const userStore = createStore(userReducer)

class User extends Component{

    render() {
        return(
            <Provider store={userStore}>
                <Row className="mb-3">
                    <Col>
                        <Route  exact path="/user" render={props => <UserLoginPage{...props} />} />
                        <Route path="/user/register" render={props => <UserRegistrationPage {...props} />} />
                        <Route path="/user/list" render={props => <UserList {...props} />} />
                        <Route path="/user/profile" render={props => <UserProfile{...props} />} />

                    </Col>
                </Row>
            </Provider>
            // </CookiesProvider>

        )
    }

}

export default User;
