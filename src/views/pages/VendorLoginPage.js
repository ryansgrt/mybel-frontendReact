import React from "react";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
    Col, NavLink
} from "reactstrap";

// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "../../components/Footers/TransparentFooter.js";
import {Link, withRouter} from "react-router-dom";
import {FETCH_COMPLETE, HANDLE_CHANGES, RESET_FORM, SET_LOADING, SUBMIT_COMPLETE} from "../Vendor/reducers/ActionVendor";
import {connect} from "react-redux";
import {login} from "../Vendor/services/VendorServices";
import Swal, {isLoading} from "sweetalert2";
import { useCookies } from 'react-cookie';


function VendorLoginPage(props) {
    const [firstFocus, setFirstFocus] = React.useState(false);
    const [lastFocus, setLastFocus] = React.useState(false);
    const [cookies, setCookies] = useCookies(['']);
    const [isLoading, setLoading] = React.useState(false)

    React.useEffect(() => {
        document.body.classList.add("login-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("login-page");
            document.body.classList.remove("sidebar-collapse");
        };
    },[]);

    const handleSubmit=()=> {
        const {history, resetForm} = props
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        try {
            login(form.username, form.password).then((response) => {
                setLoading(true)
                if (response!=null){
                    setCookies('vendor', response.id, {maxAge: 85000});
                    if (cookies.vendor==response.id) {
                        setLoading(false)
                        history.replace('vendor/profile')
                    } else if (cookies.vendor == undefined) {
                        Toast.fire({
                            title: 'Sorry, slow network, please wait'
                        }).then()
                        history.replace('vendor/profile')
                    }
                }else{
                    Toast.fire({
                        icon: 'error',
                        title: 'Wrong Username / Password'
                    }).then(() => resetForm())
                    setLoading(false)
                }
            })
        } catch (e) {

        }
    }

    const {form,handleInputChanges}=props;

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
                        <h4>LOGIN PAGE</h4>
                        <Col className="ml-auto mr-auto" md="4">
                            <Card className="card-login card-plain">
                                <Form action="" className="form"
                                    // onSubmit={(form)=>handleSubmit(form.username, form.password)}
                                >
                                    <CardHeader className="text-center">
                                        {/*<div className="logo-container">*/}
                                        <img
                                            alt="..." width="200" height="200"
                                            src={require("../../assets/img/icon-vendor.png")}
                                        ></img>
                                        {/*</div>*/}
                                    </CardHeader>
                                    <CardBody>
                                        <InputGroup
                                            InputGroup className={
                                            "no-border input-lg" +
                                            (firstFocus ? " input-group-focus" : "")
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
                                                value={form.username}
                                                onChange={(event) => handleInputChanges('username', event.target.value)}
                                                onFocus={() => setFirstFocus(true)}
                                                onBlur={() => setFirstFocus(false)}
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
                                                value={form.password}
                                                onFocus={() => setLastFocus(true)}
                                                onBlur={() => setLastFocus(false)}
                                                onChange={(event) => handleInputChanges('password', event.target.value)}
                                            />
                                        </InputGroup>
                                    </CardBody>
                                    <CardFooter className="text-center">
                                        <Button
                                            block
                                            type="submit"
                                            className="btn-round"
                                            color="info"
                                            href="#pablo"
                                            onClick={()=>handleSubmit()}
                                            size="lg"
                                        > {
                                            isLoading? "Login..." : "login"
                                        }
                                        </Button>
                                        <div className="pull-left">
                                            <h6>
                                                <NavLink to="/vendor/register" tag={Link}
                                                >
                                                    Create Account
                                                </NavLink>
                                            </h6>
                                        </div>
                                        <div className="pull-right">
                                            <h6>

                                                <a
                                                    className="link"
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    Need Help?
                                                </a>
                                            </h6>
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
    return{
        resetForm:()=>dispatch({type:RESET_FORM}),
        handleInputChanges:(inputName, inputValue)=> dispatch({type: HANDLE_CHANGES, payload: {inputName, inputValue}}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VendorLoginPage);
