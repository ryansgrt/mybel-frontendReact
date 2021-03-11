import {
    DELETE,
    EDIT_BUTTON,
    FETCH_COMPLETE,
    HANDLE_CHANGES, HANDLE_EDIT_PROFILE, HANDLE_IMAGE,
    RESET_FORM,
    SET_LOADING,
    SUBMIT_COMPLETE
} from "./ActionVendor";

const defaultFormValues={
    id:undefined,
    name:'',
    gender:'',
    username:'',
    company:'',
    email:'',
    address:'',
    password:'',
    statusRequest:undefined,
    photo:undefined,

}

const initialState={
    isLoading: true,
    vendors:[],
    form: {...defaultFormValues}
}

function vendorReducer(state= initialState,action) {
    const {type, payload} = action;

    switch (type) {
        case DELETE:
            return{...state, vendors: state.vendors.filter((vendor)=> vendor.id!==payload)};
        case EDIT_BUTTON:
            const vendor= state.vendors.find((vendor) => vendor.id===payload);
            return{...state,form: {...vendor}};
        case RESET_FORM:
            return{...state, form:{...defaultFormValues}}
        case SET_LOADING:
            return{...state, isLoading:payload}
        case FETCH_COMPLETE:
            return{...state, isLoading:false, vendors: [...payload]}
        case HANDLE_CHANGES:
            const {form} = state;
            const {inputName,inputValue}= payload
            form[inputName]= inputValue;
            return{...state,form: {...form}};
        case SUBMIT_COMPLETE:
            return{...state, isLoading:false, form:{...defaultFormValues}}
        case HANDLE_IMAGE:
            return { ...state, photo: payload[0]}
        case HANDLE_EDIT_PROFILE:
            return{...state, form: {...payload}};

        default:
            return {...state}
    }
}

export default vendorReducer;
