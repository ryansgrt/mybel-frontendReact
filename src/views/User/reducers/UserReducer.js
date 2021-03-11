import {
    DELETE,
    EDIT_BUTTON,
    FETCH_COMPLETE,
    HANDLE_CHANGES, HANDLE_EDIT_PROFILE, HANDLE_IMAGE,
    RESET_FORM,
    SET_LOADING,
    SUBMIT_COMPLETE
} from "./ActionUser";

const defaultFormValues={
    id:undefined,
    name:'',
   username:'',
    email:'',
    address:'',
    phone:'',
    password:'',
    status:undefined,
    photo:undefined,

}

const initialState={
    isLoading: true,
    users:[],
    form: {...defaultFormValues}
}

function userReducer(state= initialState,action) {
    const {type, payload} = action;

    switch (type) {
        case DELETE:
            return{...state, users: state.users.filter((user)=> user.id!==payload)};
        case EDIT_BUTTON:
            const user= state.users.find((user) => user.id===payload);
            return{...state,form: {...user}};
        case RESET_FORM:
            return{...state, form:{...defaultFormValues}}
        case SET_LOADING:
            return{...state, isLoading:true}
        case FETCH_COMPLETE:
            return{...state, isLoading:false, users: [...payload]}
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
            return{...state,form: {...payload}};
        default:
            return {...state}
    }
}

export default userReducer;

