import React from "react";
import {CustomInput, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, ModalBody} from "reactstrap";
import WeekendIcon from "@material-ui/icons/Weekend";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import DescriptionIcon from "@material-ui/icons/Description";
import TimerIcon from "@material-ui/icons/Timer";
import CategoryIcon from "@material-ui/icons/Category";
import { HANDLE_CHANGES_DESIGN} from "../product/reducers/ActionProduct";
import {connect} from "react-redux";
import {getRooms} from "../product/Services/RoomService";

function FormDesign(props) {
    const {formDesign, handleInputDesign}=props
    const [typeFocus, setTypeFocus] = React.useState(false);
    const [themeFocus, setThemeFocus] = React.useState(false);
    const [descDesignFocus, setDescDesignFocus] = React.useState(false);
    const [priceDesignFocus, setPriceDesignFocus] = React.useState(false);
    const [durationFocus, setdurationFocus] = React.useState(false);
    const [rooms, setRooms]= React.useState([])

    React.useEffect(() => {
        getRooms().then((rooms) => {
            setRooms(rooms)
        })
    }, []);

    return(
        <>
            <InputGroup
                className={
                    "no-border input-lg" +
                    (themeFocus ? " input-group-focus" : "")
                }
            >
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <WeekendIcon/>
                    </InputGroupText>
                </InputGroupAddon>
                <Input
                    placeholder="Theme..(ex : Kids ,School, ...etc)"
                    type="text"
                    value={formDesign.theme}
                    onChange={(event)=>handleInputDesign('theme', event.target.value)}
                    onFocus={() => setThemeFocus(true)}
                    onBlur={() => setThemeFocus(false)}

                />
            </InputGroup>
            <InputGroup
                className={
                    "no-border input-lg" +
                    (priceDesignFocus ? " input-group-focus" : "")
                }
            >
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        {/*<i className="now-ui-icons users_circle-08"></i>*/}
                        <LocalOfferIcon/>
                    </InputGroupText>
                </InputGroupAddon>
                <Input
                    placeholder="Price...  (ex: 1.000.000)"
                    type="number"
                    value={formDesign.price}
                    onChange={(event)=>handleInputDesign('price', event.target.value)}
                    onFocus={() => setPriceDesignFocus(true)}
                    onBlur={() => setPriceDesignFocus(false)}

                />
            </InputGroup>


            <InputGroup
                className={
                    "no-border input-lg" + (descDesignFocus ? " input-group-focus" : "")
                }
            >

                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <DescriptionIcon/>
                    </InputGroupText>
                </InputGroupAddon>
                <Input
                    placeholder="Description Unit"
                    type="text"
                    value={formDesign.description}
                    onChange={(event)=>handleInputDesign('description', event.target.value)}
                    onFocus={() => setDescDesignFocus(true)}
                    onBlur={() => setDescDesignFocus(false)}

                />
            </InputGroup>
            <InputGroup
                className={
                    "no-border input-lg" + (durationFocus ? " input-group-focus" : "")
                }
            >
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <TimerIcon/>
                    </InputGroupText>
                </InputGroupAddon>
                <Input
                    placeholder="Duration of Production....(1 = 1 Day)"
                    type="number"
                    value={formDesign.duration}
                    onChange={(event)=>handleInputDesign('duration', event.target.value)}
                    onFocus={() => setdurationFocus(true)}
                    onBlur={() => setdurationFocus(false)}
                />
            </InputGroup>

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
                       value={formDesign.roomName}
                       onChange={(event)=>handleInputDesign('roomName', event.target.value)}
                       onFocus={() => setTypeFocus(true)}
                       onBlur={() => setTypeFocus(false)}>{}
                    <option default value="" disabled="disabled" > ---Select Room Category--- </option>
                    {
                        rooms == undefined ?
                            <option></option>
                            :
                            rooms.map((room,index)=>{
                                return <option key={index} value={room.name}>{room.name}</option>
                            })
                    }
                </Input>
            </InputGroup>


            <FormGroup>
                <h6>Upload Design Photo</h6>
                <CustomInput type="file" id="picture" name="file"
                             onChange={(event)=>handleInputDesign('file', event.target.files[0])}/>
            </FormGroup>
        </>
    )

}

function mapStateToProps(state) {
    return{...state.product};
}

function mapDispatchToProps(dispatch) {
    return{
        handleInputDesign:(inputNameDesign, inputValueDesign)=> dispatch({type: HANDLE_CHANGES_DESIGN, payload: {inputNameDesign, inputValueDesign}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( FormDesign);
