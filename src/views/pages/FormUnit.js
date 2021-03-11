import React from "react";
import {CustomInput, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, ModalBody} from "reactstrap";
import DeckIcon from "@material-ui/icons/Deck";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import DescriptionIcon from "@material-ui/icons/Description";
import {
    HANDLE_CHANGES_UNIT
} from "../product/reducers/ActionProduct";
import {connect} from "react-redux";
import {getRoomByName, getRooms} from "../product/Services/RoomService";
import CategoryIcon from "@material-ui/icons/Category";
import EventSeatIcon from "@material-ui/icons/EventSeat";

function FormUnit(props) {

    const {formUnit, handleInputUnit} = props

    const [unitFocus, setUnitFocus] = React.useState(false);
    const [priceFocus, setPriceFocus] = React.useState(false);
    const [descFocus, setDescFocus] = React.useState(false);
    const [typeFocus, setTypeFocus] = React.useState(false);
    const [isLoading, setLoading] = React.useState(true);

    const [localState, setLocalState] = React.useState('save')
    const [rooms, setRooms]= React.useState([])
    const [types, setTypes] = React.useState([])



    React.useEffect(() => {
        setLoading(true)
        getRooms().then((rooms) => {
            setLoading(false)
            setRooms(rooms)
        })
    }, [localState]);

    const handleSelectRoom =(name)=>{
        getRoomByName(name)
            .then((room) => {
                setLocalState( 'room');
                const typeList =[...room.types]
                setTypes(typeList);
            })

    }


    const roomType=()=>{
        return(
            <InputGroup
                className={
                    "no-border input-lg" +
                    (typeFocus ? " input-group-focus" : "")
                }
            >
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>

                        <CategoryIcon/>
                    </InputGroupText>
                </InputGroupAddon>
                <Input type="select"
                       onChange={(event)=>handleSelectRoom(event.target.value)}
                       onFocus={() => setTypeFocus(true)}
                       onBlur={() => setTypeFocus(false)}>{}
                    <option default > ---Select Room Category--- </option>
                    {
                        rooms == undefined || isLoading==true ?
                            <option>loading..</option>
                            :
                            rooms.map((room,index)=>{
                                return <option key={index} value={room.name}>{room.name}</option>
                            })
                    }
                </Input>
            </InputGroup>
        )
    }

    const furnitureType=()=>{
        return(

            <InputGroup
                className={
                    "no-border input-lg" +
                    (typeFocus ? " input-group-focus" : "")
                }
            >
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        {/*<i className="now-ui-icons users_circle-08"></i>*/}

                        <EventSeatIcon/>
                    </InputGroupText>
                </InputGroupAddon>
                <Input type="select"
                       value={formUnit.idType}
                       onChange={(event)=>handleInputUnit('idType', event.target.value)}
                       onFocus={() => setTypeFocus(true)}
                       onBlur={() => setTypeFocus(false)}>
                    <option defaultValue={''} > ---Select Room Type--- </option>
                    {
                        types.map((type,index)=>{
                            return <option key={index} value={type.id}>{type.name}</option>
                        })
                    }
                </Input>
            </InputGroup>
        )
    }


    return(
        <>
            <InputGroup
                className={
                    "no-border input-lg" +
                    (unitFocus ? " input-group-focus" : "")
                }
            >
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        {/*<i className="now-ui-icons users_circle-08"></i>*/}
                        <DeckIcon/>
                    </InputGroupText>
                </InputGroupAddon>
                <Input
                    placeholder="Unit Name..."
                    type="text"
                    value={formUnit.name}
                    onFocus={() => setUnitFocus(true)}
                    onBlur={() => setUnitFocus(false)}
                    onChange={(event)=>handleInputUnit('name', event.target.value)}
                />
            </InputGroup>
            <InputGroup
                className={
                    "no-border input-lg" +
                    (priceFocus ? " input-group-focus" : "")
                }
            >
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        {/*<i className="now-ui-icons users_circle-08"></i>*/}

                        <LocalOfferIcon/>
                    </InputGroupText>
                </InputGroupAddon>
                <Input
                    placeholder="Price... without (.) (ex: 1000000)"
                    type="number"
                    value={formUnit.price}
                    onChange={(event)=>handleInputUnit('price', event.target.value)}
                    onFocus={() => setPriceFocus(true)}
                    onBlur={() => setPriceFocus(false)}
                />
            </InputGroup>


            <InputGroup
                className={
                    "no-border input-lg" +
                    (descFocus ? " input-group-focus" : "")
                }
            >
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        {/*<i className="now-ui-icons users_circle-08"></i>*/}
                        <DescriptionIcon/>
                    </InputGroupText>
                </InputGroupAddon>
                <Input
                    placeholder="Description Unit"
                    type="text"
                    value={formUnit.description}
                    onChange={(event)=>handleInputUnit('description', event.target.value)}
                    onFocus={() => setDescFocus(true)}
                    onBlur={() => setDescFocus(false)}

                />
            </InputGroup>
            {
                roomType()
            }
            {
                furnitureType()
            }

            <FormGroup>
                <h6>Upload Photo Unit</h6>
                <CustomInput type="file" id="picture" name="file" onChange={(event)=>handleInputUnit('file', event.target.files[0])} />
            </FormGroup>
        </>
    )

}
function mapStateToProps(state) {
    return{...state.product};
}

function mapDispatchToProps(dispatch) {
    return{
        handleInputUnit:(inputName, inputValue)=> dispatch({type: HANDLE_CHANGES_UNIT, payload: {inputName, inputValue}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( FormUnit);
