import React from "react";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import SmartphoneIcon from '@material-ui/icons/Smartphone';

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Col, FormGroup, CustomInput
} from "reactstrap";

// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "../../components/Footers/TransparentFooter.js";
import {FETCH_COMPLETE, HANDLE_CHANGES, SET_LOADING, SUBMIT_COMPLETE} from "../../views/User/reducers/ActionUser";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getEmail, getUsername, saveUser, updateUser} from "../../views/User/services/UserServices";

function UserRegistrationPage(props) {
    const [isInvalid, setInvalid] = React.useState(false);
    const [isInvalidEmail, setInvalidEmail] = React.useState(false);
    const [firstFocus, setFirstFocus] = React.useState(false);
    const [usernameFocus, setUsernameFocus] = React.useState(false);
    const [emailFocus, setEmailFocus] = React.useState(false);
    const [AddressFocus, setAddressFocus] = React.useState(false);
    const [phoneFocus, setPhoneFocus] = React.useState(false);
    const [passwordFocus, setPasswordFocus] = React.useState(false);


    const checkUsername=(username)=>{
        getUsername(username).then((response)=>{
            if (!response) {
                setInvalid(true)
            } else {
                setInvalid(false)
            }
        })
    }

    const checkEmail=(email)=>{
        getEmail(email).then((response)=>{
            if (!response) {
                setInvalid(true)
            } else {
                setInvalid(false)
            }
        })
    }
    const isValidForm =() =>{
        const {form}=props
        return(form.name.trim().length>0 &&
            form.username.trim().length>0 &&
            form.email.trim().length>0 &&
            form.address.trim().length>0 &&
            form.phone.trim().length>0 &&
            form.password.trim().length>0 &&
            !isInvalid && !isInvalidEmail)
    }



    const submitData = async () =>{
        const {form} = props;
        if(form.id) return await updateUser(form);

        else return await saveUser(form);
    }

    const handleSubmit=(event)=> {
        const {history}= props
        event.preventDefault();
        const {setLoading, submitComplete} = props
        setLoading();
        submitData().then((user) => {
            submitComplete(user);
            history.replace('/user')

        });
    }

    const handleInputUsername=(inputName, inputValue)=>{
        checkUsername(inputValue)
        handleInputChanges(inputName, inputValue)
    }
    const handleInputEmail=(inputName, inputValue)=>{
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
    },[]);

    const{form,handleInputChanges}=props;
    return (
        <>
            <ExamplesNavbar />
            <div className="page-header clear-filter" filter-color="blue">

                <div
                    className="page-header-image"
                    style={{
                        backgroundImage: "url(" + require("../../assets/img/login.jpg") + ")",
                        // background-size: cover;

                    }}
                ></div>
                <div className="content">
                    <Container>
                        <h1> REGISTER</h1>
                        <Col className="ml-auto mr-auto" md="4">
                            <Card className="card-login card-plain">
                                <Form action="" className="form" method="" onSubmit={(event)=>handleSubmit(event)}>
                                    <CardHeader className="text-center">
                                        <div className="logo-container">

                                            <img
                                                // alt="..." width="50" height="50"
                                                src={require("../../assets/img/now-logo.png")}
                                            ></img>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <InputGroup
                                            className={
                                                "no-border input-lg" +
                                                (firstFocus ? " input-group-focus" : "")
                                            }
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    {/*<i className="now-ui-icons users_circle-08"></i>*/}
                                                    <PersonIcon/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Full Name..."
                                                type="text"
                                                value={form.name}
                                                onFocus={() => setFirstFocus(true)}
                                                onBlur={() => setFirstFocus(false)}
                                                onChange={(event)=>handleInputChanges('name', event.target.value)}
                                            ></Input>
                                        </InputGroup>

                                        <InputGroup
                                            className={
                                                "no-border input-lg" +
                                                (usernameFocus ? " input-group-focus" : "")
                                            }
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    {/*<i className="now-ui-icons users_circle-08"></i>*/}
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
                                                onChange={(event)=>handleInputUsername('username', event.target.value)}
                                            />
                                        </InputGroup>

                                        <InputGroup
                                            className={
                                                "no-border input-lg" +
                                                (emailFocus ? " input-group-focus" : "")
                                            }
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    {/*<i className="now-ui-icons users_circle-08"></i>*/}
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
                                                name="email" type="email" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" class="form-control" placeholder="Email*" id="email" required=""
                                                onChange={(event)=>handleInputEmail('email', event.target.value)}

                                            ></Input>
                                        </InputGroup>

                                        <InputGroup
                                            className={
                                                "no-border input-lg" +
                                                (AddressFocus ? " input-group-focus" : "")
                                            }
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    {/*<i className="now-ui-icons users_circle-08"></i>*/}
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
                                            ></Input>
                                        </InputGroup>


                                        <InputGroup
                                            className={
                                                "no-border input-lg" +
                                                (phoneFocus ? " input-group-focus" : "")
                                            }
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    {/*<i className="now-ui-icons users_circle-08"></i>*/}
                                                   <SmartphoneIcon/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Phone Number..."
                                                type="number"
                                                value={form.phone}
                                                onFocus={() => setPhoneFocus(true)}
                                                onBlur={() => setPhoneFocus(false)}
                                                onChange={(event)=>handleInputChanges('phone', event.target.value)}
                                            ></Input>
                                        </InputGroup>


                                        <InputGroup
                                            className={
                                                "no-border input-lg" +
                                                (passwordFocus ? " input-group-focus" : "")
                                            }
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    {/*<i className="now-ui-icons text_caps-small"></i>*/}
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
                                            {/*<Label for="exampleCustomFileBrowser">File Browser</Label>*/}
                                            <h6>Upload Photo Profile</h6>
                                            <CustomInput type="file" id="photo" name="file" onChange={(event)=>handleInputChanges('file', event.target.files[0])}/>
                                        </FormGroup>

                                    </CardBody>
                                    <CardFooter className="text-center">
                                        <Button
                                            block
                                            className="btn-round"
                                            color="info"
                                            // href="#pablo"
                                            // onClick={e => e.preventDefault()}
                                            size="lg"
                                            disabled={!isValidForm()}
                                        >
                                            Create New Account
                                        </Button>
                                        <div className="pull-left">
                                        {/*    <h6>*/}
                                        {/*        <a*/}
                                        {/*            className="link"*/}
                                        {/*            href="#pablo"*/}
                                        {/*            onClick={e => e.preventDefault()}*/}
                                        {/*        >*/}
                                        {/*            Create Account*/}
                                        {/*        </a>*/}
                                        {/*    </h6>*/}
                                        {/*</div>*/}
                                        {/*<div className="pull-right">*/}
                                        {/*    <h6>*/}
                                        {/*        <a*/}
                                        {/*            className="link"*/}
                                        {/*            href="#pablo"*/}
                                        {/*            onClick={e => e.preventDefault()}*/}
                                        {/*        >*/}
                                        {/*            Need Help?*/}
                                        {/*        </a>*/}
                                        {/*    </h6>*/}
                                        </div>
                                    </CardFooter>
                                </Form>
                            </Card>
                        </Col>
                    </Container>
                </div>
                <TransparentFooter />
            </div>
        </>
    );
}

function mapStateToProps(state) {
    return{...state};
}

function mapDispatchToProps(dispatch) {
    return{
        handleInputChanges:(inputName, inputValue)=> dispatch({type: HANDLE_CHANGES, payload: {inputName, inputValue}}),
        setLoading:() => dispatch({type:SET_LOADING}),
        submitComplete:(payload)=>dispatch({type:SUBMIT_COMPLETE}),
        fetchData:() => dispatch({type: SET_LOADING}),
        fetchComplete:(payload) => dispatch({type: FETCH_COMPLETE, payload})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserRegistrationPage));
