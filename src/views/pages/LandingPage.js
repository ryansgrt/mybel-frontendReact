import React from "react";

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col, Modal, ModalBody
} from "reactstrap";
import {useCookies} from "react-cookie";

// core components
import LandingPageHeader from "../..//components/Headers/LandingPageHeader.js";
import DefaultFooter from "../..//components/Footers/DefaultFooter.js";
import Card from "@material-ui/core/Card";
import cx from "clsx";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {
  SET_LOADING,
  HANDLE_CHANGES_DESIGN,
  SUBMIT_COMPLETE_DESIGN,
  FETCH_DESIGN,
  RESET_FORM_DESIGN,
  HANDLE_CHANGES_UNIT,
  SUBMIT_COMPLETE_UNIT, FETCH_COMPLETE_UNIT, RESET_FORM_UNIT
} from "../product/reducers/ActionProduct";
import {saveUnit} from "../product/Services/UnitService";
import Swal from "sweetalert2";
import LandingNavbar from "../..//components/Navbars/LandingNavbar";
import InformationLanding from "./InformationLanding";
import {saveDesign} from "../product/Services/DesignService";
import FormUnit from "./FormUnit";
import FormDesign from "./FormDesign";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 400,
    margin: 'auto',
    borderRadius: 0,
    position: 'relative',
  },
  content: {
    padding: 24,
  },
  cta: {
    display: 'block',
    textAlign: 'top',
    color: '#fff',
    letterSpacing: '3px',
    fontWeight: 100,
    fontSize: 24,
  },
  title: {
    color: '#fff',
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
}));

function LandingPage(props) {
  const styles = useStyles();
  const mediaStyles = useCoverCardMediaStyles();
  const shadowStyles = useLightTopShadowStyles();
  const [modalUnit, setModalUnit] = React.useState(false);
  const [modalDesign, setModalDesign] = React.useState(false);


  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  },[]);


  const{handleInputUnit}=props;
  const[cookies, setCookies]=useCookies()

  const handleSubmitDesign=async ()=>{
    const {resetFormDesign, formDesign, submitCompleteDesign}= props

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
    handleInputDesign('idVendor',cookies.vendor)
    saveDesign(formDesign).then((response) => {
      submitCompleteDesign(response);
      Toast.fire({
        icon: 'succes',
        title: `your product has been added! visit your profile account to check it!`
      }).then(()=> resetFormDesign())
    });


  }

  const handleSubmit=async ()=> {
    const {resetForm, formUnit, submitCompleteUnit}= props

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

    handleInputUnit('idVendor',cookies.vendor)
    saveUnit(formUnit).then((response) => {
      submitCompleteUnit(response);
      Toast.fire({
        icon: 'succes',
        title: `your product has been added! visit your profile account to check it!`
      }).then(()=> resetForm())
    });
  }

  const{ handleInputDesign}=props

  return (
      <>
        <LandingNavbar/>
        <div className="wrapper">
          <LandingPageHeader />
          <InformationLanding/>
          <div className="section section-team text-center">
            <Container>
              <h2 className="title">Upload Your Design / Unit</h2>
              <div className="team">
                <Row>
                  <Col md="6">

                    <Card className={cx(styles.root, shadowStyles.root)}>
                      <CardMedia classes={mediaStyles} image={require("../..//assets/img/landingpict/desaininterior.jpg")} />
                      <CardActionArea>
                        <Typography className={styles.cta} variant={'overline'}>
                          Upload Design
                        </Typography>
                        <CardContent className={styles.content}>

                          <Box
                              display={'flex'}
                              flexDirection={'column'}
                              alignItems={'center'}
                              justifyContent={'center'}
                              minHeight={200}
                              color={'common.white'}
                              textAlign={'center'}
                              onClick={() => setModalDesign(true)}/>

                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Col>
                  <Col md="6">
                    <Card className={cx(styles.root, shadowStyles.root)}>
                      <CardMedia classes={mediaStyles}image={require("../..//assets/img/landingpict/kursi.jpg")} />
                      <CardActionArea>
                        <Typography className={styles.cta} variant={'overline'}>
                          upload unit
                        </Typography>
                        <CardContent className={styles.content}>
                          <Box
                              display={'flex'}
                              flexDirection={'column'}
                              alignItems={'center'}
                              justifyContent={'center'}
                              minHeight={200}
                              color={'common.white'}
                              textAlign={'center'}
                              onClick={() => setModalUnit(true)}/>

                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Col>

                </Row>
              </div>
            </Container>
          </div>
          <DefaultFooter />
        </div>

        <Modal isOpen={modalUnit} toggle={() => setModalUnit(false)}>
          <div className="modal-header justify-content-center">
            <button
                className="close"
                type="button"
                onClick={() => setModalUnit(false)}
            >
              <i className="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <h4 className="title title-up">Post Unit</h4>
          </div>
          <ModalBody>
            <FormUnit/>
          </ModalBody>
          <div className="modal-footer">
            <Button color="default" type="submit"
                    onClick={(event)=>handleSubmit(event)}
            >
              Post Now
            </Button>
            <Button
                color="danger"
                type="button"
                onClick={() => setModalUnit(false)}
            >
              Close
            </Button>
          </div>
        </Modal>



        <Modal isOpen={modalDesign} toggle={() => setModalDesign(false)}>
          <div className="modal-header justify-content-center">
            <button
                className="close"
                type="button"
                onClick={() => setModalDesign(false)}
            >
              <i className="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <h4 className="title title-up">Post Design Interior</h4>
          </div>
          <ModalBody>

            <FormDesign/>

          </ModalBody>
          <div className="modal-footer">
            <Button color="default"
                    type="submit"
                    onClick={(event)=>handleSubmitDesign(event)}

            >
              Post Now
            </Button>
            <Button
                color="danger"
                type="button"
                onClick={() => setModalDesign(false)}
            >
              Close
            </Button>
          </div>


        </Modal>
      </>
  );
}

function mapStateToProps(state) {
  return{...state.product};
}

function mapDispatchToProps(dispatch) {
  return{
    handleInputUnit:(inputName, inputValue)=> dispatch({type: HANDLE_CHANGES_UNIT, payload: {inputName, inputValue}}),
    setLoading:() => dispatch({type:SET_LOADING}),
    submitCompleteUnit:(payload)=>dispatch({type:SUBMIT_COMPLETE_UNIT, payload}),
    fetchComplete:(payload) => dispatch({type: FETCH_COMPLETE_UNIT, payload}),
    resetForm:()=>dispatch({type:RESET_FORM_UNIT}),
    handleInputDesign:(inputNameDesign, inputValueDesign)=> dispatch({type: HANDLE_CHANGES_DESIGN, payload: {inputNameDesign, inputValueDesign}}),
    submitCompleteDesign:(payload)=>dispatch({type:SUBMIT_COMPLETE_DESIGN, payload}),
    fetchCompleteDesign:(payload) => dispatch({type: FETCH_DESIGN, payload}),
    resetFormDesign:()=>dispatch({type:RESET_FORM_DESIGN}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter( LandingPage));
