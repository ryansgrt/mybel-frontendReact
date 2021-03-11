import {combineReducers} from "redux";
import productReducer from "../../product/reducers/ProductReducer";
import vendorReducer from "./VendorReducer";

const combReducers = combineReducers({
    product: productReducer,
    vendor : vendorReducer ,
});
export default combReducers;
