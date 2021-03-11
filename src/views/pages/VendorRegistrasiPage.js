import React from "react";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import BusinessIcon from '@material-ui/icons/Business';
import WcIcon from '@material-ui/icons/Wc';
// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Container,
    CustomInput,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "reactstrap";
// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "../../components/Footers/TransparentFooter.js";
import {getEmail, getUsername, saveVendor, updateVendor} from "../Vendor/services/VendorServices";
import {FETCH_COMPLETE, HANDLE_CHANGES, SET_LOADING, SUBMIT_COMPLETE} from "../Vendor/reducers/ActionVendor";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";


function VendorRegistrasiPage(props) {

    const [isInvalid, setInvalid] = React.useState(false);
    const [isInvalidEmail, setInvalidEmail] = React.useState(false);
    const [nameFocus, setNameFocus] = React.useState(false);
    const [genderFocus, setGenderFocus] = React.useState(false);
    const [usernameFocus, setUsernameFocus] = React.useState(false);
    const [companyFocus, setCompanyFocus] = React.useState(false);
    const [emailFocus, setEmailFocus] = React.useState(false);
    const [addressFocus, setAddressFocus] = React.useState(false);
    const [passwordFocus, setPasswordFocus] = React.useState(false);


    const checkUsername = (username) => {
        getUsername(username).then((response) => {

            if (!response) {
                setInvalid(true)
            } else {
                setInvalid(false)
            }
        })
    }

    const checkEmail = (email) => {
        getEmail(email).then((response) => {
            if (!response) {
                setInvalid(true)
            } else {
                setInvalid(false)
            }
        })
    }

    const isValidForm = () => {
        const {form} = props
        return (form.name.trim().length > 0 && form.gender.trim().length > 0 && form.username.trim().length > 0
            && form.company.trim().length > 0 && form.email.trim().length > 0
            && form.address.trim().length > 0 && form.password.trim().length > 0 && !isInvalid && !isInvalidEmail)
    }

    const submitData = async () => {
        const {form} = props;
        if (form.id) return await updateVendor(form);

        else return await saveVendor(form);
    }

    const handleSubmit = (event) => {
        const {history} = props
        event.preventDefault();
        const {setLoading, submitComplete} = props
        setLoading();
        submitData().then((vendor) => {
            submitComplete(vendor);
            history.replace('/vendor')

        });
    }

    const handleInputUsername = (inputName, inputValue) => {
        checkUsername(inputValue)
        handleInputChanges(inputName, inputValue)
    }
    const handleInputEmail = (inputName, inputValue) => {
        checkEmail(inputValue)
        handleInputChanges(inputName, inputValue)
    }

    React.useEffect(() => {
        document.body.classList.add("login-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("register-page");
            document.body.classList.remove("sidebar-collapse");
        };
    }, []);

    const {form, handleInputChanges} = props;
    return (
        <>
            <ExamplesNavbar/>
            <div className="page-header clear-filter" filter-color="blue">

                <div
                    className="page-header-image"
                    style={{
                        backgroundImage: "url(" + require("../../assets/img/login-vendor.jpg") + ")",
                        // background-size: cover;

                    }}
                ></div>
                <div className="content">
                    <Container>
                        <h1> REGISTER</h1>
                        <Col className="ml-auto mr-auto" md="4">
                            <Card className="card-login card-plain">
                                <Form action="" className="form" method="" onSubmit={(event) => handleSubmit(event)}>
                                    <CardHeader className="text-center">
                                        <div className="logo-container">

                                            <img
                                                src={require("../../assets/img/now-logo.png")}
                                            ></img>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
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
                                                onChange={(event) => handleInputChanges('name', event.target.value)}
                                            ></Input>
                                        </InputGroup>

                                        <InputGroup
                                            InputGroup className={
                                            "no-border input-lg" +
                                            (genderFocus ? " input-group-focus" : "")
                                        }
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <WcIcon/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="select"
                                                value={form.gender}
                                                onFocus={() => setGenderFocus(true)}
                                                onBlur={() => setGenderFocus(false)}
                                                onChange={(event) => handleInputChanges('gender', event.target.value)}

                                            >
                                                <option default value="" disabled="disabled"> ---Select Gender---
                                                </option>
                                                <option value="MALE">MALE</option>
                                                <option value="FEMALE">FEMALE</option>

                                            </Input>
                                        </InputGroup>
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
                                                placeholder="Username without space"
                                                type="text"
                                                value={form.username}
                                                invalid={isInvalid}
                                                pattern="[^\s]+"
                                                onFocus={() => setUsernameFocus(true)}
                                                onBlur={() => setUsernameFocus(false)}
                                                onChange={(event) => handleInputUsername('username', event.target.value)}
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
                                                onChange={(event) => handleInputChanges('company', event.target.value)}

                                            ></Input>
                                        </InputGroup>

                                        <InputGroup
                                            InputGroup className={
                                            "no-border input-lg" +
                                            (emailFocus ? " input-group-focus" : "")
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
                                                invalid={isInvalidEmail}
                                                value={form.email}
                                                onFocus={() => setEmailFocus(true)}
                                                onBlur={() => setEmailFocus(false)}
                                                name="email" type="email"
                                                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                                                class="form-control" placeholder="Email*" id="email" required=""
                                                onChange={(event) => handleInputEmail('email', event.target.value)}

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
                                                onChange={(event) => handleInputChanges('address', event.target.value)}

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
                                                onChange={(event) => handleInputChanges('password', event.target.value)}

                                            />
                                        </InputGroup>

                                        <FormGroup>
                                            <h6>Upload Photo Profile</h6>
                                            <CustomInput type="file" id="photo" name="file"
                                                         onChange={(event) => handleInputChanges('file', event.target.files[0])}/>
                                        </FormGroup>

                                    </CardBody>
                                    <CardFooter className="text-center">
                                        <Button
                                            type="submit"
                                            // block
                                            className="btn-round"
                                            color="info"
                                            size="lg"
                                            disabled={!isValidForm()}
                                        >
                                            Create New Account
                                        </Button>
                                        <div className="pull-left">
                                        </div>
                                    </CardFooter>
                                </Form>
                            </Card>
                        </Col>
                    </Container>
                </div>
                <TransparentFooter/>
            </div>
        </>
    );
}

function mapStateToProps(state) {
    return {...state.vendor};
}

function mapDispatchToProps(dispatch) {
    return {
        handleInputChanges: (inputName, inputValue) => dispatch({
            type: HANDLE_CHANGES,
            payload: {inputName, inputValue}
        }),
        setLoading: () => dispatch({type: SET_LOADING}),
        submitComplete: (payload) => dispatch({type: SUBMIT_COMPLETE}),
        fetchData: () => dispatch({type: SET_LOADING}),
        fetchComplete: (payload) => dispatch({type: FETCH_COMPLETE, payload})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorRegistrasiPage);
