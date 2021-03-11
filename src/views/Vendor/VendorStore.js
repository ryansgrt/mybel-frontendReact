import {createStore} from "redux";
import React, {Component} from "react";
import {Provider} from "react-redux";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import {Route} from "react-router-dom";
import VendorRegistrasiPage from "../pages/VendorRegistrasiPage";
import ListVendor from "./VendorList";
import VendorLoginPage from "../pages/VendorLoginPage";
import ProfilePage from "../pages/ProfilePage";
import combReducers from "./reducers/CombineReducer";


const vendorStore = createStore(combReducers)

class Vendor extends Component{

    render() {
        return(
            <Provider store={vendorStore}>
                <Row className="mb-3">
                    <Col>
                        <Route  exact path="/vendor" render={props => <VendorLoginPage{...props} />} />
                        <Route path="/vendor/register" render={props => <VendorRegistrasiPage {...props} />} />
                        <Route path="/vendor/list" render={props => <ListVendor {...props} />} />
                        <Route path="/vendor/profile" render={props => <ProfilePage{...props} />} />
                    </Col>
                </Row>
            </Provider>
            // </CookiesProvider>

        )
    }

}

export default Vendor;
