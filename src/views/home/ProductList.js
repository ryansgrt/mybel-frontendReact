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

import Chip from "@material-ui/core/Chip";
import CardActionArea from "@material-ui/core/CardActionArea";
import {
    FETCH_COMPLETE_UNIT,
    HANDLE_TRANSACTION_UNIT, SUBMIT_TRANSACTION_UNIT
} from "../product/reducers/ActionProduct";
import {connect} from "react-redux";
import {getUnits} from "../product/Services/UnitService";
import {BASEURL} from "../../shared/BaseURL";
import {useCookies} from "react-cookie";
import {createTransaction} from "../transaction/services/TransactionServices";
import DescriptionIcon from "@material-ui/icons/Description";
import Swal from "sweetalert2";
// reactstrap components

// import {makeStyles} from "@material-ui/core/styles";
// import {red} from "@material-ui/core/colors";

// core components




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

 function ProductList(props) {

     const classes = useStyles();
     const [modal1, setModal1] = React.useState(false);
     const [firstFocus, setFirstFocus] = React.useState(false);
     const [lastFocus, setLastFocus] = React.useState(false);
     const [isLoading, setLoading] = React.useState(true)
     const [cookies, setCookies] = useCookies();
     const [desc, setDesc] = React.useState(false);
     const [unitFurniture, setUnitFurniture] = React.useState({});
     const [countLove, setCountLove] = React.useState(0);

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
                     if (response.status == 200) {
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


    const getDataUnit= async ()=>{
        const { fetchCompleteUnit} = props;
        getUnits().then((response)=>{
            if(response != undefined){
                setLoading(false)
                fetchCompleteUnit(response)
            }
        })
    }

     const {units} = props
     React.useEffect(() => {
         getDataUnit()
     }, [units])

     const unitCard =()=>{
        return (
            <>
                <Row>
                {
                    units.map((unit, index) => {
                            return(
                                    <Col md="4" className="mb-5">
                                        <Card className={classes.root}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    color="primary"
                                                    height="200"
                                                    src={`${BASEURL}/unit/photo/${unit.id}`}
                                                    onClick={() => handleModalDesc(unit)}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {unit.name}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <IconButton aria-label="add to favorites" key={index} onClick={()=>setCountLove(countLove+1)}>
                                                    <FavoriteIcon/> <Typography>{countLove}</Typography>
                                                </IconButton>

                                                <IconButton aria-label="add to favorites">
                                                    <DescriptionIcon color="primary"
                                                                     className="mr-1"
                                                                     onClick={() => handleModalDesc(unit)}/>
                                                </IconButton>
                                                <IconButton aria-label="add to favorites">
                                                    <ShoppingCartIcon color="primary"
                                                                      className="mr-1"
                                                                      onClick={() => handleModalTrx(unit)}/>
                                                </IconButton>

                                                <Chip label={`${unit.price}`} variant="outlined" color="primary"
                                                      avatar={<Avatar>Rp</Avatar>}/>
                                            </CardActions>
                                        </Card>
                                    </Col>

                            )
                        }
                    )
                }
                </Row>
            </>
        )
     }

     const {formTrxUnit, handleInputTrxUnit}=props
    return (
        <>
            <div
                className="section section-signup"
                style={{
                    backgroundImage: "url(" + require("../../assets/img/wall.jpg") + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    minHeight: "700px"
                }}
            >
                <Container>
                    <h2 className={classes.header}>New Products</h2>
                    {
                        unitCard()
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

        </>
    );
}


function mapStateToProps(state) {
    return{units:[...state.product.units], formTrxUnit:{...state.product.formTrxUnit}};
}

function mapDispatchToProps(dispatch) {
    return{
        fetchCompleteUnit: (payload) => dispatch({type: FETCH_COMPLETE_UNIT, payload}),
        handleInputTrxUnit: (inputNameTrxUnit, inputValueTrxUnit)=> dispatch({type: HANDLE_TRANSACTION_UNIT, payload: {inputNameTrxUnit, inputValueTrxUnit}}),
        submitTrxUnit:(payload)=>dispatch({type:SUBMIT_TRANSACTION_UNIT, payload}),


    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ProductList);
