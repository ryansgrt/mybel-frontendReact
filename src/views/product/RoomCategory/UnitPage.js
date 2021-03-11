import React, {useEffect} from "react";
// reactstrap components
import {
    Container, Col, Row, Spinner, Modal, ModalBody, Button, InputGroup, InputGroupAddon, InputGroupText, Input, Alert
} from "reactstrap";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import {makeStyles} from "@material-ui/core/styles";
import RoomNavbar from "./RoomNavbar";
import FooterPage from "./FooterPage";
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import {red} from '@material-ui/core/colors'
import {withRouter} from "react-router";
import ListUnit from "./ListUnit";
import {getTypeByName} from "../Services/TypeRoom";
import {useCookies} from "react-cookie";
import * as Swal from "sweetalert2";
import {FETCH_COMPLETE_UNIT, HANDLE_TRANSACTION_UNIT, SUBMIT_TRANSACTION_UNIT} from "../reducers/ActionProduct";
import {connect} from "react-redux";
import {BASEURL} from "../../../shared/BaseURL";
import logo from './loadingmybel.gif'
import {createTransaction} from "../../transaction/services/TransactionServices";
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: 'auto',
        borderRadius: 0,
        position: 'relative',
        marginBottom: 60
    },
    content: {
        padding: 24,
    },
    cta: {
        display: 'block',
        textAlign: 'center',
        color: '#fff',
        letterSpacing: '3px',
        fontWeight: 'bold',
        fontSize: 12,
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        letterSpacing: '2px',
    },
    header: {
        display: 'block',
        textAlign: 'center',
        color: '#000000',
        letterSpacing: '2px',
        fontWeight: 200,
        fontSize: 40,
    },
    text: {
        display: 'block',
        textAlign: 'center',
        color: '#000000',
        letterSpacing: '2px',
        fontWeight: 200,
        fontSize: 20,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));
function UnitPage(props) {
    const classes = useStyles();
    const [units,setUnits]=React.useState([])
    const [cookies, setCookies] = useCookies();
    const [modal1, setModal1] = React.useState(false);
    const [firstFocus, setFirstFocus] = React.useState(false);
    const [lastFocus, setLastFocus] = React.useState(false);
    const [isLoading, setLoading] = React.useState(true)
    const [desc, setDesc] = React.useState(false);
    const [unitFurniture, setUnitFurniture] = React.useState({});
    const [countLove, setCountLove] = React.useState(0);
    const [alert, setAlert] = React.useState(true);

    React.useEffect(()=>{
        document.body.classList.add("login-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("login-page");
            document.body.classList.remove("sidebar-collapse");
        };
    });
    const handleModalDesc = (unit) => {
        setUnitFurniture(unit)
        setDesc(true)
    }
    const handleModalTrx = (unit) => {
        if (cookies.user == null || cookies.user == undefined) {
            Toast.fire({
                icon: 'warning',
                title: `Please, login first!`
            }).then()
        } else {
            setModal1(true)
            setUnitFurniture(unit)
            const {handleInputTrxUnit} = props
            handleInputTrxUnit('selectUser', cookies.user)
            handleInputTrxUnit('unit', unit.id)
            handleInputTrxUnit('totalPrice', unit.price)
        }
    }
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
    const handleSubmitTrx = () => {
        const {formTrxUnit, submitTrxUnit} = props
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: `Are you sure want to buy ${unitFurniture.name} ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, buy it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                createTransaction(formTrxUnit).then((response) => {
                    if (response.status === 200) {
                        submitTrxUnit(response)
                        Swal.fire({
                            title: 'You buy this item!',
                            text: `please, transfer to BNI 0378857589 with amount ${response.data.totalPrice}`,
                            imageUrl: `${BASEURL}/unit/photo/${unitFurniture.id}`,
                            imageAlt: '',
                        }).then((result) => {
                            Toast.fire({
                                icon: 'succes',
                                title: `Thank you for trusting us, Happy Shopping!`
                            }).then()
                        })
                    }
                })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    `${unitFurniture.name} is canceled to buy :)`,
                    'error'
                )
            }
        })
    }
    useEffect(()=>{
        if (cookies.type)
            getTypeByName(cookies.type)
                .then((response)=> {
                        setUnits(response.units)
                        setLoading(false)
                    }
                )
    },[cookies.type])

   const {formTrxUnit,  handleInputTrxUnit} = props
    return (
        <>
            <div
                className="section section-signup"
                style={{
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    minHeight: "700px"
                }}
            >
                <Container>
                    <h2 className={classes.header}>{cookies.type} Units</h2>
                    {
                        isLoading? <img src={logo}  width="200" height="200"  class="center"  />

                            :
                            <Row>
                                {
                                    units.length == 0 ?
                                        (
                                            <div className='col-md-12'>
                                                <div className='select section-notifications'>
                                                    <Alert severity="success" color="info" isOpen={alert}>
                                                        <Container>
                                                            <div className="alert-icon">
                                                                <i className="now-ui-icons travel_info"></i>
                                                            </div>
                                                            <strong>Sorry, </strong>
                                                            This product is not yet available.
                                                            <button
                                                                type="button"
                                                                className="close"
                                                                onClick={() => setAlert(false)}
                                                            >
              <span aria-hidden="true">
                <i className="now-ui-icons ui-1_simple-remove"></i>
              </span>
                                                            </button>
                                                        </Container>
                                                    </Alert>
                                                </div>
                                            </div>
                                        ) :

                                    units.map((unit,index)=>{
                                        return(
                                            <Col md="4" className="mb-5">
                                                <ListUnit
                                                    index={index}
                                                    unit={unit}
                                                    classes = {classes}
                                                    handleModalDesc = {handleModalDesc}
                                                    countLove = {countLove}
                                                    setCountLove = {setCountLove}
                                                    handleModalTrx = {handleModalTrx}
                                                />
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                    }
                </Container>
            </div>
            <Modal isOpen={desc} toggle={() => setDesc(false)}>
                <div className="modal-header justify-content-center">
                    <button
                        className="close"
                        type="button"
                        onClick={() => setDesc(false)}
                    >
                        <i className="now-ui-icons ui-1_simple-remove"></i>
                    </button>
                    <h4 className="title title-up">Description Product</h4>
                </div>
                <ModalBody>
                    <h6 className="title title-up"><i
                        className="now-ui-icons travel_info"></i> {unitFurniture.description}</h6>
                </ModalBody>
                <div className="modal-footer">
                    <Button
                        color="danger"
                        type="button"
                        onClick={() => setDesc(false)}
                    >
                        Close
                    </Button>
                </div>
            </Modal>
            <Modal isOpen={modal1} toggle={() => setModal1(false)}>
                <div className="modal-header justify-content-center">
                    <button
                        className="close"
                        type="button"
                        onClick={() => setModal1(false)}
                    >
                        <i className="now-ui-icons ui-1_simple-remove"></i>
                    </button>
                    <h4 className="title title-up">Your Order</h4>
                </div>
                <ModalBody>
                    <InputGroup
                        className={
                            "no-border input-lg" +
                            (firstFocus ? " input-group-focus" : "")
                        }
                    >
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <FormatListNumberedIcon/>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            placeholder="Quantity..."
                            type="number"
                            min="0"
                            value={formTrxUnit.quantity}
                            onFocus={() => setFirstFocus(true)}
                            onBlur={() => setFirstFocus(false)}
                            onChange={(event)=>handleInputTrxUnit('quantity', event.target.value)}
                        ></Input>
                    </InputGroup>
                    <InputGroup
                        className={"no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                        }
                    >
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <LocalShippingIcon/>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            placeholder="Address..."
                            onFocus={() => setLastFocus(true)}
                            onBlur={() => setLastFocus(false)}
                            value={formTrxUnit.sendLocation}
                            onChange={(event)=>handleInputTrxUnit('sendLocation', event.target.value)}
                        ></Input>
                    </InputGroup>
                </ModalBody>
                <div className="modal-footer">
                    <Button color="default" type="button" onClick={(event)=>handleSubmitTrx(event)}>
                        Buy Now
                    </Button>
                    <Button
                        color="danger"
                        type="button"
                        onClick={() => setModal1(false)}
                    >
                        Close
                    </Button>
                </div>
            </Modal>
            <RoomNavbar/>
            <FooterPage/>
        </>
    );
}

function mapStateToProps(state) {
    return{units:[...state.product.units], formTrxUnit:{...state.product.formTrxUnit}};
}

function mapDispatchToProps(dispatch) {
    return{
        handleInputTrxUnit: (inputNameTrxUnit, inputValueTrxUnit)=> dispatch({type: HANDLE_TRANSACTION_UNIT, payload: {inputNameTrxUnit, inputValueTrxUnit}}),
        submitTrxUnit:(payload)=>dispatch({type:SUBMIT_TRANSACTION_UNIT, payload}),


    }
}

export default connect(mapStateToProps, mapDispatchToProps) (UnitPage);
