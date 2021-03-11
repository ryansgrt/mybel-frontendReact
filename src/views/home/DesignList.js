import React from "react";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

import {makeStyles} from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';

import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import Container from "@material-ui/core/Container";
import {
    Button,
    Col,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    ModalBody,
    Row
} from "reactstrap";

import {
    FETCH_DESIGN, HANDLE_CHANGES_TRANSACTION, SUBMIT_TRANSACTION
} from "../product/reducers/ActionProduct";
import {connect} from "react-redux";
import CardActionArea from "@material-ui/core/CardActionArea";
import Chip from "@material-ui/core/Chip";
import {getDesigns} from "../product/Services/DesignService";
import {BASEURL} from "../../shared/BaseURL";
import DescriptionIcon from "@material-ui/icons/Description";
import {useCookies} from "react-cookie";
import {createTransaction} from "../transaction/services/TransactionServices";
import Swal from "sweetalert2";


const useStyles = makeStyles((theme) => ({

    root: {
        maxWidth: 345,
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
    header: {
        display: 'block',
        textAlign: 'center',
        color: '#ffffff',
        letterSpacing: '2px',
        fontWeight: 200,
        fontSize: 40,
    },
}));

function DesignList(props) {
    const classes = useStyles();
    const [modal1, setModal1] = React.useState(false);
    const [firstFocus, setFirstFocus] = React.useState(false);
    const [lastFocus, setLastFocus] = React.useState(false);
    const [isloading, setLoading] = React.useState(true)
    const [desc, setDesc] = React.useState(false);
    const [desgn, setDesgn] = React.useState({});
    const [countLove, setCountLove] = React.useState(0);
    const [modalTransfer, setModalTransfer] = React.useState(false);
    const[cookies, setCookies]=useCookies()


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
    const getDataDesigns = async () => {
        const {fetchCompleteDesigns} = props;
        getDesigns().then((response) => {
            if (response != undefined) {
                setLoading(false)
                fetchCompleteDesigns(response)
            }
        })
    }

    React.useEffect(() => {
        getDataDesigns()
    }, [])
    const {designs} = props

    const designsCard = () => {
        return (
            <>
                <Row>
                    {
                        designs.map((design, index) => {
                                return (
                                    <>
                                    <Col md="4" className="mb-5">
                                        <Card className={classes.root}>
                                            <CardActionArea>
                                                {
                                                    design.picture===null || design.picture===undefined ?
                                                        (<CardMedia
                                                            component="img"
                                                            color="primary"
                                                            height="200"
                                                            src={require("../../assets/img/now-logo.png")}                                                            onClick={() => handleModalDesc(design)}
                                                        />) : (<CardMedia
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
                backgroundImage: "url(" + require("../../assets/img/designwallpaper.jpg") + ")",
                backgroundSize: "cover",
                backgroundPosition: "top center",
                minHeight: "700px"
            }}
        >
            <Container>
                <h2 className={classes.header}>New Design</h2>
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

export default connect(mapStateToProps, mapDispatchToProps) (DesignList)
