import React, {Fragment} from "react";

// reactstrap components
import {
    Button,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
    FormGroup,
    CustomInput,
    Input,
    InputGroupText,
    InputGroupAddon,
    InputGroup,
    ModalBody,
    Modal,
    Form, Card, CardHeader, CardFooter, Alert
} from "reactstrap";

// core components
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import UserNavbar from "../../components/Navbars/UserNavbar";
import PhoneIcon from '@material-ui/icons/Phone';
import {useCookies} from "react-cookie";
import {
    EDIT_BUTTON,
    FETCH_COMPLETE,
    HANDLE_CHANGES,
    HANDLE_EDIT_PROFILE, RESET_FORM,
    SET_LOADING,
    SUBMIT_COMPLETE
} from "../User/reducers/ActionUser";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getSingleData, updateUser} from "../User/services/UserServices";
import Swal from "sweetalert2";
import CardImg from "reactstrap/es/CardImg";
import CardBody from "reactstrap/es/CardBody";
import {BASEURL} from "../../shared/BaseURL";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import withStyles from "@material-ui/core/styles/withStyles";



function UserProfile(props) {
    const [modalUser, setModalUser] = React.useState(false);
    const [pills, setPills] = React.useState("2");
    const [isInvalid, setInvalid] = React.useState(false);
    const [isInvalidEmail, setInvalidEmail] = React.useState(false);
    const [nameFocus, setNameFocus] = React.useState(false);
    const [usernameFocus, setUsernameFocus] = React.useState(false);
    const [companyFocus, setCompanyFocus] = React.useState(false);
    const [emailFocus, setEmailFocus] = React.useState(false);
    const [addressFocus, setAddressFocus] = React.useState(false);
    const [cookies, setCookies] = useCookies();
    const [transactions, setTransactions] = React.useState([])
    const [profile, setProfile]= React.useState({})
    const [passwordFocus, setPasswordFocus] = React.useState(false);
const [isLoading, setLoading]= React.useState(true)
    const [localState, setLocalState]= React.useState('user')

    React.useEffect(() => {
        document.body.classList.add("profile-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        return function cleanup() {
            document.body.classList.remove("profile-page");
            document.body.classList.remove("sidebar-collapse");
        };

    });

    // let pageHeader = React.createRef();
    React.useEffect(() => {
        if (window.innerWidth > 991) {
            const updateScroll = () => {
                let windowScrollTop = window.pageYOffset / 3;
                // pageHeader.current.style.transform =
                //     "translate3d(0," + windowScrollTop + "px,0)";
            };
            window.addEventListener("scroll", updateScroll);
            return function cleanup() {
                window.removeEventListener("scroll", updateScroll);
            };
        }


    },[localState]);

    function handleEditProfile() {
        const {handleEdit} = props
        const {transactions, ...form} = profile
        handleEdit(form)
        setModalUser(true)
    }

    const handleSubmit=()=> {
        const {resetForm, form,setLoading, submitComplete} = props
        handleInputChanges('id',cookies.user)

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
        setLoading()
        updateUser(form).then((response) => {
            setLocalState('save')
            if (response){
                Toast.fire({
                    icon: 'succes',
                    title: `your profile has been updated!`
                }).then(()=> resetForm())

            }
            submitComplete(response);
        });
    }


    const getData= async ()=>{
        setLoading(true)
       await setLoading(false)
        if(cookies.user!==null){
         await getSingleData(cookies.user)
                .then((response)=>{
                    setProfile(response)
                    setTransactions(response.transactions)
                    setLocalState('user')
                    setLoading(false)
                })
        }else{
        }
    }

    React.useEffect(()=>{
        getData()
    },[localState])


        const{form,handleInputChanges}=props;

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.black,
        },
        body: {
            fontSize: 12,
        },
    }))(TableCell);

    return (
        <>
            <UserNavbar/>
            <div className="wrapper">
                <div
                    className="page-header clear-filter page-header-small"
                    filter-color="blue"
                >
                    <div
                        className="page-header-image"
                        style={{
                            backgroundImage: "url(" + require("../../assets/img/pictprofile.jpg") + ")"
                        }}
                        // ref={pageHeader}
                    ></div>
                    <Container>
                        <div className="photo-container">
                            {
                                profile==null || profile.photo == null ?
                                    <img alt="..." src={require("../../assets/img/photoDefault.png")}></img> :

                                    <img alt="..." src={`${BASEURL}/user/photo/${profile.id}`}></img>
                            }
                        </div>
                        <h3 className="title">{profile.name}</h3>
                        <p className="category">{profile.company}</p>
                        <div className="content">
                            {/*<div className="social-description">*/}
                            <h3>{profile.address}</h3>
                            {/*</div>*/}

                        </div>
                    </Container>
                </div>
                <div className="section">
                    <Container>
                        <div className="button-container">
                            <Button className="btn-round"
                                    color="info" size="lg"
                                    onClick={() => handleEditProfile()}>
                                Edit Profile

                            </Button>


                        </div>
                        <Row>
                            <Col className="ml-auto mr-auto" md="6">
                                <h4 className="title text-center">Shopping History</h4>
                                <div className="nav-align-center">
                                    <Nav
                                        className="nav-pills-primary"

                                        pills
                                        role="tablist"
                                    >
                                        <NavItem>
                                            <NavLink
                                                className={pills === "2" ? "active" : ""}
                                                href="#pablo"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    setPills("2");
                                                }}
                                            >Payment
                                            </NavLink>


                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={pills === "1" ? "active" : ""}
                                                href="#pablo"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    setPills("1");
                                                }}
                                            >
                                                On Shipment
                                            </NavLink>
                                        </NavItem>


                                    </Nav>
                                </div>
                            </Col>

                        </Row>
                    </Container>
                    <TabContent className="gallery" activeTab={"pills" + pills}>
                        <TabPane tabId="pills1">
                            <Col className="ml-auto mr-auto" md="10">
                                <Row className="collections">

                                </Row>
                            </Col>
                        </TabPane>
                        <TabPane tabId="pills2">

                            <Col className="ml-auto mr-auto" md="6">
                                <Row className="collections">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Quantity</StyledTableCell>
                                            <StyledTableCell align="right">Date Transaction</StyledTableCell>
                                            <StyledTableCell align="right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                Location</StyledTableCell>
                                            <StyledTableCell align="right"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total Prices</StyledTableCell>
                                            <StyledTableCell align="right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Status</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            transactions.map((transaction, index) => {
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={transaction.date}
                                                    >
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                                // checked={isItemSelected}
                                                                inputProps={{ 'aria-labelledby': labelId }}
                                                            />
                                                        </TableCell>
                                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                                            {transaction.quantity}
                                                        </TableCell>
                                                        <TableCell align="right">{transaction.date}</TableCell>
                                                        <TableCell align="right">{transaction.price}</TableCell>
                                                        <TableCell align="right">{transaction.sendLocation}</TableCell>
                                                        <TableCell align="right">{transaction.totalPrice}</TableCell>
                                                        <TableCell align="right">{transaction.units.name}</TableCell>
                                                        <TableCell align="right"><Button variant="contained" color="secondary" >Paid Off</Button></TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Row>
                            </Col>
                        </TabPane>
                    </TabContent>
                </div>
                <DefaultFooter />
            </div>


            <Modal isOpen={modalUser} toggle={() => setModalUser(false)}>
                <div className="modal-header justify-content-center">
                    <button
                        className="close"
                        type="button"
                        onClick={() => setModalUser(false)}
                    >
                        <i className="now-ui-icons ui-1_simple-remove"></i>
                    </button>
                    <h4 className="title title-up"
                    >Edit Profile</h4>
                </div>
                <Form action="" className="form" method=""
                >
                    <ModalBody>
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
                                invalid={isInvalid}
                                onFocus={() => setUsernameFocus(true)}
                                onBlur={() => setUsernameFocus(false)}
                                onChange={(event)=>handleInputChanges('username', event.target.value)}
                            />
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
                                invalid={isInvalidEmail}
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
                            (companyFocus ? " input-group-focus" : "")
                        }
                        >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>


                                    <PhoneIcon/>
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="Phone Number..."
                                type="text"
                                value={form.phone}
                                onFocus={() => setCompanyFocus(true)}
                                onBlur={() => setCompanyFocus(false)}
                                onChange={(event)=>handleInputChanges('phone', event.target.value)}

                            ></Input>
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
                    </ModalBody>
                </Form>
                <div className="modal-footer">
                    <Button color="default" type="submit"
                            onClick={(event)=>handleSubmit(event)}
                    >
                        Submit Profile user
                    </Button>
                    <Button
                        color="danger"
                        type="button"
                        onClick={() => setModalUser(false)}
                    >
                        Close
                    </Button>
                </div>
            </Modal>
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
        fetchComplete:(payload) => dispatch({type: FETCH_COMPLETE, payload}),
        handleEdit:(payload)=>dispatch({type: HANDLE_EDIT_PROFILE, payload }),
        resetForm:()=>dispatch({type:RESET_FORM})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile));
