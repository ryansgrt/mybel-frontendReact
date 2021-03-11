import {
    DELETE, DELETE_DESIGN,
    EDIT_BUTTON_UNIT, EDIT_DESIGN,
    FETCH_COMPLETE_UNIT, FETCH_DESIGN,
    HANDLE_CHANGES_UNIT, HANDLE_CHANGES_DESIGN,
    RESET_FORM_UNIT, RESET_FORM_DESIGN,
    SET_LOADING,
    SUBMIT_COMPLETE_UNIT, SUBMIT_COMPLETE_DESIGN, DELETE_TRANSACTION,
    EDIT_TRANSACTION, FETCH_TRANSACTION, HANDLE_CHANGES_TRANSACTION,
    RESET_FORM_TRANSACTION, SUBMIT_TRANSACTION, HANDLE_TRANSACTION_UNIT, SUBMIT_TRANSACTION_UNIT
} from "./ActionProduct";

const defaultFormUnit={
    id: undefined,
    name: "",
    price: 0,
    description: "",
    picture: undefined,
    idType:"",
    idVendor:""
}

const defaultFormTrx={
    id:undefined,
    design: "",
    quantity: 0,
    selectUser: "",
    sendLocation: "",
    totalPrice: 0
}
const defaultFormTrxUnit={
    id:undefined,
    unit: "",
    quantity: 0,
    selectUser: "",
    sendLocation: "",
    totalPrice:0
}
const defaultFormDesign={
    id: undefined,
    theme: "",
    price: 0,
    picture: undefined,
    description: "",
    duration: 0,
    roomName: "",
    idVendor:""
}

const initialState={
    isLoading: true,
    units:[],
    designs:[],
    transactions:[],
    rooms:[],
    formUnit: {...defaultFormUnit},
    formDesign:{...defaultFormDesign},
    formTrx: {...defaultFormTrx},
    formTrxUnit: {...defaultFormTrxUnit}

}

function productReducer(state= initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case DELETE:
            return{...state, units: state.units.filter((unit)=> unit.id!==payload)};
        case EDIT_BUTTON_UNIT:
            return{...state,formUnit: {...payload}};
        case RESET_FORM_UNIT:
            return{...state, formUnit:{...defaultFormUnit}}
        case SET_LOADING:
            return{...state, isLoading:payload}
        case FETCH_COMPLETE_UNIT:
            return{...state, isLoading:false, units: [...payload]}
        case HANDLE_CHANGES_UNIT:
            const {formUnit} = state;
            const {inputName,inputValue}= payload
            formUnit[inputName]= inputValue;
            return{...state,formUnit: {...formUnit}};

        case SUBMIT_COMPLETE_UNIT:
            return{...state, isLoading:false, formUnit:{...defaultFormUnit}}
        case DELETE_DESIGN:
            return{...state, designs: state.designs.filter((design)=> design.id!==payload)};
        case EDIT_DESIGN:
            return{...state,formDesign: {...payload}};
        case RESET_FORM_DESIGN:
            return{...state, formDesign:{...defaultFormDesign}}
        case FETCH_DESIGN:
            return{...state, isLoading:false, designs: [...payload]}
        case HANDLE_CHANGES_DESIGN:
            const {formDesign} = state;
            const {inputNameDesign,inputValueDesign}= payload
            formDesign[inputNameDesign]= inputValueDesign;
            return{...state,formDesign: {...formDesign}};
        case SUBMIT_COMPLETE_DESIGN:
            return{...state, isLoading:false, formDesign:{...defaultFormDesign}}

        case DELETE_TRANSACTION:
            return{...state, transactions: state.transactions.filter((transaction)=> transaction.id!==payload)};
        case EDIT_TRANSACTION:
            const transaction= state.transactions.find((transaction) => transaction.id===payload);
            return{...state,formTrx: {...transaction}};
        case RESET_FORM_TRANSACTION:
            return{...state, formTrx:{...defaultFormTrx}}
        case FETCH_TRANSACTION:
            return{...state, transactions: [...payload]}
        case HANDLE_CHANGES_TRANSACTION:
            const {formTrx} = state;
            const {inputNameTrx,inputValueTrx}= payload
            formTrx [inputNameTrx]= inputValueTrx;
            return{...state,formTrx: {...formTrx}};

        case SUBMIT_TRANSACTION:
            return{...state,  formTrx:{...defaultFormTrx}}

        case HANDLE_TRANSACTION_UNIT:
            const {formTrxUnit} = state;
            const {inputNameTrxUnit,inputValueTrxUnit}= payload
            formTrxUnit [inputNameTrxUnit]= inputValueTrxUnit;
            return{...state,formTrxUnit: {...formTrxUnit}};

        case SUBMIT_TRANSACTION_UNIT:
            return{...state,  formTrxUnit:{...defaultFormTrxUnit}}
            default:
            return {...state}
    }
}

export default productReducer;
