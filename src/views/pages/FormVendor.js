import React from "react";
import {CustomInput, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, ModalBody} from "reactstrap";
import PersonIcon from "@material-ui/icons/Person";
import WcIcon from "@material-ui/icons/Wc";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BusinessIcon from "@material-ui/icons/Business";
import EmailIcon from "@material-ui/icons/Email";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {
    HANDLE_CHANGES
} from "../Vendor/reducers/ActionVendor";
import {connect} from "react-redux";

function FormVendor(props) {

    const {form, handleInputChanges} = props

    const [nameFocus, setNameFocus] = React.useState(false);
    const [genderFocus, setGenderFocus] = React.useState(false);
    const [usernameFocus, setUsernameFocus] = React.useState(false);
    const [companyFocus, setCompanyFocus] = React.useState(false);
    const [emailFocus, setEmailFocus] = React.useState(false);
    const [addressFocus, setAddressFocus] = React.useState(false);
    const [passwordFocus, setPasswordFocus] = React.useState(false);

    return (
        <>
        <InputGroup
            InputGroup className={
            "no-border input-lg" +
            (nameFocus ? " input-group-focus" : "")
        }
        >
            <InputGroupAddon addonType="prepend">
                <InputGroupText>
                    <PersonIcon/>
                </InputGroupText>
            </InputGroupAddon>
            <Input
                placeholder="Full Name..."
                type="text"
                value={form.name}
                onFocus={() => setNameFocus(true)}
                onBlur={() => setNameFocus(false)}
                onChange={(event)=>handleInputChanges('name', event.target.value)}
            ></Input>
        </InputGroup>

    {/*<InputGroup*/}
    {/*    InputGroup className={*/}
    {/*    "no-border input-lg" +*/}
    {/*    (genderFocus ? " input-group-focus" : "")*/}
    {/*}*/}
    {/*>*/}
    {/*    <InputGroupAddon addonType="prepend">*/}
    {/*        <InputGroupText>*/}
    {/*            <WcIcon/>*/}
    {/*        </InputGroupText>*/}
    {/*    </InputGroupAddon>*/}
    {/*    <Input*/}
    {/*        type="select"*/}
    {/*        value={form.gender}*/}
    {/*        onFocus={() => setGenderFocus(true)}*/}
    {/*        onBlur={() => setGenderFocus(false)}*/}
    {/*        onChange={(event)=>handleInputChanges('gender', event.target.value)}*/}

    {/*    >*/}
    {/*        <option default value="" disabled="disabled"> ---Select Gender---*/}
    {/*        </option>*/}
    {/*        <option value="MALE">MALE</option>*/}
    {/*        <option value="FEMALE">FEMALE</option>*/}

    {/*    </Input>*/}
    {/*</InputGroup>*/}
    <InputGroup
        InputGroup className={
        "no-border input-lg" +
        (usernameFocus ? " input-group-focus" : "")
    }
    >
        <InputGroupAddon addonType="prepend">
            <InputGroupText>
                <AccountCircleIcon/>
            </InputGroupText>
        </InputGroupAddon>
        <Input
            placeholder="Username..."
            type="text"
            value={form.username}
            onFocus={() => setUsernameFocus(true)}
            onBlur={() => setUsernameFocus(false)}
            onChange={(event)=>handleInputChanges('username', event.target.value)}
        />
    </InputGroup>
    <InputGroup
        InputGroup className={
        "no-border input-lg" +
        (companyFocus ? " input-group-focus" : "")
    }
    >
        <InputGroupAddon addonType="prepend">
            <InputGroupText>
                <BusinessIcon/>
            </InputGroupText>
        </InputGroupAddon>
        <Input
            placeholder="Company name..."
            type="text"
            value={form.company}
            onFocus={() => setCompanyFocus(true)}
            onBlur={() => setCompanyFocus(false)}
            onChange={(event)=>handleInputChanges('company', event.target.value)}

        ></Input>
    </InputGroup>

    <InputGroup
        InputGroup className={
        "no-border input-lg" +
        (emailFocus? " input-group-focus" : "")
    }
    >
        <InputGroupAddon addonType="prepend">
            <InputGroupText>
                <EmailIcon/>
            </InputGroupText>
        </InputGroupAddon>
        <Input
            placeholder="Email..."
            type="text"
            value={form.email}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            name="email" type="email" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" class="form-control" placeholder="Email*" id="email" required=""
            onChange={(event)=>handleInputChanges('email', event.target.value)}

        ></Input>
    </InputGroup>

    <InputGroup
        InputGroup className={
        "no-border input-lg" +
        (addressFocus ? " input-group-focus" : "")
    }
    >
        <InputGroupAddon addonType="prepend">
            <InputGroupText>
                <TrackChangesIcon/>
            </InputGroupText>
        </InputGroupAddon>
        <Input
            placeholder="Address..."
            type="text"
            value={form.address}
            onFocus={() => setAddressFocus(true)}
            onBlur={() => setAddressFocus(false)}
            onChange={(event)=>handleInputChanges('address', event.target.value)}
        >

        </Input>
    </InputGroup>

    <InputGroup
        InputGroup className={
        "no-border input-lg" +
        (passwordFocus ? " input-group-focus" : "")
    }
    >
        <InputGroupAddon addonType="prepend">
            <InputGroupText>
                <VpnKeyIcon/>
            </InputGroupText>
        </InputGroupAddon>
        <Input
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            placeholder="Password..."
            id="password"
            autoComplete="current-password"
            value={form.password}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            onChange={(event)=>handleInputChanges('password', event.target.value)}

        />
    </InputGroup>

    <FormGroup>
        <h6>Upload Photo Profile</h6>
        <CustomInput type="file" id="photo" name="file"
                     onChange={(event)=>handleInputChanges('file', event.target.files[0])}
        />
    </FormGroup>
            </>
    )

}


function mapStateToProps(state) {
    return {...state.vendor};
}

function mapDispatchToProps(dispatch) {
    return{
        handleInputChanges:(inputName, inputValue)=> dispatch({type: HANDLE_CHANGES, payload: {inputName, inputValue}}),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormVendor);
