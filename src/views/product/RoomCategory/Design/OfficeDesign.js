import React from "react";


// reactstrap components
import {
    Button,
    Card,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Col, Row, Modal, ModalBody, FormGroup, Alert
} from "reactstrap";
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import DescriptionIcon from '@material-ui/icons/Description';
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Chip from "@material-ui/core/Chip";
import IconButton from '@material-ui/core/IconButton';
import {red} from '@material-ui/core/colors'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Avatar from '@material-ui/core/Avatar';

import {withRouter} from "react-router";
import {getRoomByName} from "../../Services/RoomService";
import {BASEURL} from "../../../../shared/BaseURL";
import {FETCH_DESIGN, HANDLE_CHANGES_TRANSACTION, SUBMIT_TRANSACTION} from "../../reducers/ActionProduct";
import {connect} from "react-redux";
import Swal from "sweetalert2";
import {createTransaction} from "../../../transaction/services/TransactionServices";
import {useCookies} from "react-cookie";
import RoomNavbar from "../RoomNavbar";
import FooterPage from "../FooterPage";






const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: 'auto',
        borderRadius: 0,
        position: 'relative',
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
function BedRoomDesign(props) {
    const classes = useStyles();
    // const styles = useStyles();
    const mediaStyles = useCoverCardMediaStyles();
    const shadowStyles = useLightTopShadowStyles();
    const [modal1, setModal1] = React.useState(false);
    const [desc, setDesc] = React.useState(false);
    const [firstFocus, setFirstFocus] = React.useState(false);
    const [lastFocus, setLastFocus] = React.useState(false);
    const [designs, setDesigns]= React.useState([])
    const [desgn, setDesgn] = React.useState({});
    const [alert, setAlert] = React.useState(true);
    const[cookies, setCookies]=useCookies()
    const [isloading, setLoading] = React.useState(true)
    const [countLove, setCountLove] = React.useState(0);


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
    });

    const getDataRoom=async ()=>{
        await getRoomByName("Office Room").then((response)=>{
            setDesigns(response.designInteriors)
        })
    }
    React.useEffect(()=>{
        getDataRoom()
    },[])


    const handleModalDesc =(design)=>{
        setDesgn(design)
        setDesc(true)
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

    const handleModalTrx = (design)=>{
        if (cookies.user==null && cookies.user==undefined){
            Toast.fire({
                icon: 'warning',
                title: `Please, login first!`
            }).then()
        }else {
            setModal1(true)
            setDesgn(design)
            const {handleInputTrx} = props

            handleInputTrx('selectUser', cookies.user)
            handleInputTrx('design', design.id)
            handleInputTrx('totalPrice', design.price)
        }


    }

    const handleSubmitTrx=()=>{
        const {formTrx, submitTrx}= props
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: `Are you sure want to request ${desgn.theme} theme ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, buy it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                createTransaction(formTrx).then((response)=>{
                    if (response.status==200){
                        submitTrx(response)
                        Swal.fire({
                            title: 'You request this theme!',
                            text: `please, transfer to BNI 0378857589 with amount ${response.data.totalPrice}`,
                            imageUrl: `${BASEURL}/design/photo/${desgn.id}`,
                            imageAlt: '',
                        }).then((result)=>{
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
                    `${desgn.theme} is canceled to buy :)`,
                    'error'
                )
            }
        })
    }

    const designsCard = () => {
        return (
            <>
                <Row>
                    {
                        designs.length == 0 ?
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
                            designs.map((design, index) => {
                                    return (
                                        <>
                                            <Col md="4" className="mb-5">
                                                <Card className={classes.root}>
                                                    <CardActionArea>
                                                        {
                                                            design.picture==null || design.picture==undefined ?
                                                                (<CardMedia
                                                                    component="img"
                                                                    color="primary"
                                                                    height="200"
                                                                    src={require("../../../../assets/img/now-logo.png")}                                                            onClick={() => handleModalDesc(design)}
                                                                />) :
                                                                (<CardMedia
                                                                    component="img"
                                                                    color="primary"
                                                                    height="200"
                                                                    src={`${BASEURL}/design/photo/${design.id}`}
                                                                    onClick={() => handleModalDesc(design)}
                                                                />)
                                                        }
                                                        <CardContent>
                                                            <Typography gutterBottom variant="h5" component="h2">
                                                                {design.theme}
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                    <CardActions>
                                                        <Chip variant="outlined" color="primary"
                                                              label={`Duration : ${design.duration} Day`}/>
                                                    </CardActions>
                                                    <CardActions>
                                                        <IconButton aria-label="add to favorites" key={index} onClick={()=>setCountLove(countLove+1)}>
                                                            <FavoriteIcon/> <Typography>{countLove}</Typography>
                                                        </IconButton>
                                                        <IconButton aria-label="add to favorites">
                                                            <DescriptionIcon color="primary"
                                                                             className="mr-1"
                                                                             onClick={() => handleModalDesc(design)}/>
                                                        </IconButton>
                                                        <IconButton aria-label="add to favorites">
                                                            <ShoppingCartIcon color="primary"
                                                                              className="mr-1"
                                                                              onClick={() => handleModalTrx(design)}/>
                                                        </IconButton>
                                                        <Chip label={`${design.price}`} variant="outlined" color="primary"
                                                              avatar={<Avatar>Rp</Avatar>}/>
                                                    </CardActions>
                                                </Card>
                                            </Col>


                                        </>


                                    )
                                }
                            )
                    }
                </Row>
            </>
        )
    }


    const {handleInputTrx, formTrx}=props
    return (
        <>
            <div
                className="section section-signup"
                style={{
                    // backgroundImage: "url(" + require("../../../../assets/img/designwallpaper.jpg") + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    minHeight: "700px"
                }}
            >
                <Container>
                    <h2 className={classes.header}>Office Room Design Interior</h2>
                    {
                        designsCard()
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
                        className="now-ui-icons travel_info"></i> {desgn.description}</h6>
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
                            value={formTrx.quantity}
                            onFocus={() => setFirstFocus(true)}
                            onBlur={() => setFirstFocus(false)}
                            onChange={(event)=>handleInputTrx('quantity', event.target.value)}
                        ></Input>
                    </InputGroup>                      <InputGroup
                    className={
                        "no-border input-lg" +
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
                        value={formTrx.sendLocation}
                        onChange={(event)=>handleInputTrx('sendLocation', event.target.value)}
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
    return{designs:[...state.product.designs], formTrx:{...state.product.formTrx}};
}

function mapDispatchToProps(dispatch) {
    return{
        fetchCompleteDesigns: (payload) => dispatch({type: FETCH_DESIGN, payload}),
        handleInputTrx: (inputNameTrx, inputValueTrx)=> dispatch({type: HANDLE_CHANGES_TRANSACTION, payload: {inputNameTrx, inputValueTrx}}),
        submitTrx:(payload)=>dispatch({type:SUBMIT_TRANSACTION, payload}),

    }
}

export default connect(mapStateToProps, mapDispatchToProps) (BedRoomDesign);
