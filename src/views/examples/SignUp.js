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
import ExamplesNavbar from "../..//components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "../..//components/Footers/TransparentFooter.js";

function SignUp() {
    const [firstFocus, setFirstFocus] = React.useState(false);
    const [usernameFocus, setUsernameFocus] = React.useState(false);
    const [emailFocus, setEmailFocus] = React.useState(false);
    const [AddressFocus, setAddressFocus] = React.useState(false);
    const [phoneFocus, setPhoneFocus] = React.useState(false);
    const [lastFocus, setLastFocus] = React.useState(false);
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
    });
    return (
        <>
            <ExamplesNavbar />
            <div className="page-header clear-filter" filter-color="blue">

                <div
                    className="page-header-image"
                    style={{
                        backgroundImage: "url(" + require("../..//assets/img/login.jpg") + ")",
                        // background-size: cover;

                    }}
                ></div>
                <div className="content">
                    <Container>
                        <h1> REGISTER</h1>
                        <Col className="ml-auto mr-auto" md="4">
                            <Card className="card-login card-plain">
                                <Form action="" className="form" method="">
                                    <CardHeader className="text-center">
                                        <div className="logo-container">

                                            <img
                                                // alt="..." width="50" height="50"
                                                src={require("../../../../assets/img/now-logo.png")}
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
                                                onFocus={() => setFirstFocus(true)}
                                                onBlur={() => setFirstFocus(false)}
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
                                                placeholder="Username..."
                                                type="text"
                                                onFocus={() => setUsernameFocus(true)}
                                                onBlur={() => setUsernameFocus(false)}
                                            ></Input>
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
                                                onFocus={() => setEmailFocus(true)}
                                                onBlur={() => setEmailFocus(false)}
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
                                                onFocus={() => setAddressFocus(true)}
                                                onBlur={() => setAddressFocus(false)}
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
                                                onFocus={() => setPhoneFocus(true)}
                                                onBlur={() => setPhoneFocus(false)}
                                            ></Input>
                                        </InputGroup>


                                        <InputGroup
                                            className={
                                                "no-border input-lg" +
                                                (lastFocus ? " input-group-focus" : "")
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
                                                onFocus={() => setLastFocus(true)}
                                                onBlur={() => setLastFocus(false)}
                                            />
                                        </InputGroup>

                                        <FormGroup>
                                            {/*<Label for="exampleCustomFileBrowser">File Browser</Label>*/}
                                            <h6>Upload Photo Profile</h6>
                                            <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" />
                                        </FormGroup>
                                        {/*<InputGroup*/}
                                        {/*    className={*/}
                                        {/*        "no-border input-lg" +*/}
                                        {/*        (lastFocus ? " input-group-focus" : "")*/}
                                        {/*    }*/}
                                        {/*>*/}
                                        {/*    <InputGroupAddon addonType="prepend">*/}
                                        {/*        /!*<InputGroupText>*!/*/}
                                        {/*        /!*    /!*<i className="now-ui-icons text_caps-small"></i>*!/*!/*/}
                                        {/*        /!*    <VpnKeyIcon/>*!/*/}
                                        {/*        /!*</InputGroupText>*!/*/}
                                        {/*    </InputGroupAddon>*/}
                                        {/*    /!*<Label for='image' sm='3'>Image</Label>*!/*/}
                                        {/*    <center><h6>Upload Photo User  <Input type="file" name="image" accept='image/jpeg, image/jpg'/></h6></center>*/}


                                        {/*    /!*<Input*!/*/}
                                        {/*    /!*    variant="outlined"*!/*/}
                                        {/*    /!*    margin="normal"*!/*/}
                                        {/*    /!*    required*!/*/}
                                        {/*    /!*    fullWidth*!/*/}
                                        {/*    /!*    name="Image"*!/*/}
                                        {/*    /!*    label="image"*!/*/}
                                        {/*    /!*    type="image"*!/*/}
                                        {/*    /!*    placeholder="Password..."*!/*/}
                                        {/*    /!*    id="image"*!/*/}
                                        {/*    /!*    // autoComplete="current-password"*!/*/}
                                        {/*    /!*    onFocus={() => setLastFocus(true)}*!/*/}
                                        {/*    /!*    onBlur={() => setLastFocus(false)}*!/*/}
                                        {/*    />*/}
                                        {/*</InputGroup>*/}

                                    </CardBody>
                                    <CardFooter className="text-center">
                                        <Button
                                            block
                                            className="btn-round"
                                            color="info"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                            size="lg"
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

export default SignUp;
