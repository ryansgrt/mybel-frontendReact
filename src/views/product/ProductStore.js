import {createStore} from "redux";
import React, {Component} from "react";
import {Provider} from "react-redux";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import {Route, Switch} from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import combReducers from "../Vendor/reducers/CombineReducer";
import Index from "../home/Index";
import DiningRoom from "./RoomCategory/DiningRoom";
import BedRoom from "./RoomCategory/BedRoom";
import LivingRoom from "./RoomCategory/LivingRoom";
import OfficeRoom from "./RoomCategory/OfficeRoom";
import BedRoomDesign from "./RoomCategory/Design/BedRoomDesign";
import DiningRoomDesign from "./RoomCategory/Design/DiningRoomDesign";
import LivingRoomDesign from "./RoomCategory/Design/LivingRoomDesign";
import OfficeDesign from "./RoomCategory/Design/OfficeDesign";
import UnitPage from "./RoomCategory/UnitPage";
import ShowRoom from "../ShowRoomPage/ShowRoom";

const uStore = createStore(combReducers)

class ProductStore extends Component{

    render() {
        return(
            <Provider store={uStore}>
                <Row className="mb-3">
                    <Col>
                        <Route  exact path="/index" render={(props) => <Index {...props}/>} />
                        <Route  path="/index/product" render={props => <LandingPage {...props} />} />

                        <Route exact path="/index/diningroom" render={props => <DiningRoom {...props} />} />/>
                        <Route path="/index/diningroom/unit" render={props => <UnitPage {...props} />} />
                        <Route path="/index/diningroom/design-diningroom" render={props => <DiningRoomDesign {...props} />} />

                        <Route exact path="/index/bedroom" render={props => <BedRoom {...props} />} />
                        <Route path="/index/bedroom/unit" render={props => <UnitPage {...props} />} />
                        <Route path="/index/bedroom/design-bedroom" render={props => <BedRoomDesign {...props} />} />


                        <Route  exact path="/index/livingroom" render={props => <LivingRoom {...props} />} />
                        <Route path="/index/livingroom/unit" render={props => <UnitPage {...props} />} />
                        <Route path="/index/livingroom/design-livingroom" render={props => <LivingRoomDesign {...props} />} />

                        <Route  exact path="/index/officeroom" render={props => <OfficeRoom {...props} />} />
                        <Route path="/index/officeroom/unit" render={props => <UnitPage {...props} />} />
                        <Route path="/index/officeroom/design-office" render={props => <OfficeDesign {...props} />} />

                        <Route path="/index/showroom" render={props => <ShowRoom {...props} />} />
                    </Col>
                </Row>
            </Provider>
        )
    }

}

export default ProductStore;
