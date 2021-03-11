import React from "react";

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
    ModalBody,
    Modal, CardImg, CardBody,
    Form, Card, CardHeader, CardFooter, Alert
} from "reactstrap";

// core components
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import ProfileNavbar from "../../components/Navbars/ProfileNavbar";
import {useCookies} from "react-cookie";
import {
    FETCH_COMPLETE,
    HANDLE_CHANGES,
    HANDLE_EDIT_PROFILE, RESET_FORM,
    SET_LOADING,
    SUBMIT_COMPLETE
} from "../Vendor/reducers/ActionVendor";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getSingleData, updateVendor} from "../Vendor/services/VendorServices";
import Swal from "sweetalert2";
import {deleteUnit, saveUnit, updateUnit} from "../product/Services/UnitService";
import {
    EDIT_BUTTON_UNIT, EDIT_DESIGN,
    FETCH_COMPLETE_UNIT, FETCH_DESIGN, HANDLE_CHANGES_DESIGN, HANDLE_CHANGES_UNIT, RESET_FORM_DESIGN,
    RESET_FORM_UNIT, SUBMIT_COMPLETE_DESIGN,
    SUBMIT_COMPLETE_UNIT
} from "../product/reducers/ActionProduct";
import {deleteDesign, updateDesign} from "../product/Services/DesignService";
import FormVendor from "./FormVendor";

import logo from "../../assets/loadingmybel.gif"
import FormUnit from "./FormUnit";
import FormDesign from "./FormDesign";
import {BASEURL} from "../../shared/BaseURL";

function ProfilePage(props) {
    const [modalDesign, setModalDesign] = React.useState(false);
    const [modalUnit, setModalUnit] = React.useState(false);
    const [modalDesgn, setModalDesgn] = React.useState(false);

    const [pills, setPills] = React.useState("2");

    const [profile, setProfile] = React.useState({})
    const [alert, setAlert] = React.useState(true)
    const [localState, setLocalState] = React.useState('vendor')
    const [units, setUnits] = React.useState([])
    const [designs, setDesigns] = React.useState([])
    const [isLoading, setLoading] = React.useState(true)


    const [cookies, setCookies] = useCookies()

    React.useEffect(() => {
        document.body.classList.add("profile-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        return function cleanup() {
            document.body.classList.remove("profile-page");
            document.body.classList.remove("sidebar-collapse");
        };

    });

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


    }, [localState]);


    const handleSubmit = () => {
        const {resetForm, form, submitComplete} = props

        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            // timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        updateVendor(form).then((response) => {
            setLocalState('save')
            if (response) {
                Toast.fire({
                    icon: 'succes',
                    title: `your profile has been updated!`
                }).then(() => resetForm())

            }
            submitComplete(response);
        });
    }

    const handleSubmitUnit = () => {
        const {resetFormUnit, formUnit, submitCompleteUnit, handleInputUnit} = props


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
        handleInputUnit('idVendor', cookies.vendor)

        updateUnit(formUnit).then((response) => {
            setLocalState('save')
            console.log(response)
            if (response) {
                Toast.fire({
                    icon: 'succes',
                    title: `your product has been updated!`
                }).then(() => resetFormUnit())

            }
            submitCompleteUnit(response);
        });
    }

    const handleSubmitDesign = () => {
        const {resetFormDesign, formDesign, submitCompleteDesign, handleInputDesign} = props
        handleInputDesign('idVendor',cookies.vendor)


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

        updateDesign(formDesign).then((response) => {
            setLocalState('save')
            console.log(response)
            if (response) {
                Toast.fire({
                    icon: 'succes',
                    title: `your product has been updated!`
                }).then(() => resetFormDesign())

            }
            submitCompleteDesign(response);
        });
    }


    const handleDeleteUnit = (id) => {
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

        deleteUnit(id).then((response) => {

            Toast.fire({
                icon: 'success',
                title: `Delete Success!`
            }).then(() => setLocalState('delete'))
        })
    }

    const handleDeleteDesign = (id) => {
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

        deleteDesign(id).then((response) => {

            Toast.fire({
                icon: 'success',
                title: `Delete Success!`
            }).then(() => setLocalState('deleteDesign'))
        })
    }


    const getData = async () => {
        setLoading(true)
        let vid = cookies.vendor
        if (vid !== null) {
            getSingleData(cookies.vendor)
                .then((response) => {
                    if (response != undefined) {
                     setUnits(response.units)
                        setDesigns(response.designInteriors)
                        setProfile(response)
                        setLocalState('vendor')
                        setLoading(false)

                    }
                })
        } else {
            setLoading(true)
        }
    }

    const handleEditUnit = (unit) => {
        const {handleEditUnit} = props
        handleEditUnit(unit)
        setModalUnit(true)
    }
    const handleEditDesign = (design) => {
        const {handleEditDesign} = props
        handleEditDesign(design)
        setModalDesgn(true)

    }

    function handleEditProfile() {
        const {handleEdit} = props
        const {units, designInteriors, ...form} = profile
        handleEdit(form)
        setModalDesign(true)
    }

    React.useEffect(() => {
        getData()
    }, [localState])


    const {form} = props;
    const cardDesign = () => {
        return (
            <div className='row'>
                {
                    designs.length == 0 ?
                        (
                            <div className='col-md-12'>
                                <div className='select section-notifications'>
                                    <Alert color="warning" isOpen={alert}>
                                        <Container>
                                            <div className="alert-icon">
                                                <i className="now-ui-icons ui-1_bell-53"></i>
                                            </div>
                                            <strong>Warning!</strong> you haven't uploaded your product yet!
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
                        (
                            designs.map((design, index) => {
                                return (

                                    <div className='col-md-6'>
                                        <Card className="shadow">
                                            <CardHeader className="text-center"> {design.theme}</CardHeader>
                                            <CardImg variant="top"
                                                     src={`${BASEURL}/design/photo/${design.id}`} width="1000" height="350"/>
                                            <CardBody>
                                                <h5 className="text-center">{design.price}</h5>
                                                <h5 className="text-center">{design.duration} Day</h5>
                                                <h5 className="text-center">{design.description}</h5>
                                            </CardBody>
                                            <CardFooter>
                                                <Button type="button" color="primary" className="align-items-md-start"
                                                        onClick={() => handleDeleteDesign(design.id)}> Delete </Button>
                                                <Button type="button" color="primary"
                                                        className="align-items-md-end"
                                                        onClick={()=>handleEditDesign(design)}

                                                > Edit </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>

                                )
                            })
                        )}
            </div>
        );
    }

    const cardUnit = () => {


        return (
            <div className='row'>
                {
                    units == null ?
                        (
                            <div className='col-md-12'>
                                <div className='select section-notifications'>
                                    <Alert color="warning" isOpen={alert}>
                                        <Container>
                                            <div className="alert-icon">
                                                <i className="now-ui-icons ui-1_bell-53"></i>
                                            </div>
                                            <strong>Warning!</strong> you haven't uploaded your product yet!
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
                        )
                        : (
                            units.map((unit, index) => {
                                return (
                                    <div className='col-md-6'>
                                        <Card className="shadow">
                                            <CardHeader className="text-center"> {unit.name}</CardHeader>
                                            <CardImg variant="top"
                                                     src={`${BASEURL}/unit/photo/${unit.id}`}  width="1000" height="350"/>
                                            <CardBody>
                                                <h5 className="text-center">{unit.name}</h5>
                                                <h5 className="text-center">{unit.price}</h5>
                                                <h5 className="text-center">{unit.description}</h5>
                                            </CardBody>
                                            <CardFooter>
                                                <Button type="button" color="primary" className="align-items-center"
                                                        onClick={() => handleDeleteUnit(unit.id)}> Delete </Button>
                                                <Button type="button" color="primary"
                                                        className="align-items-center"
                                                        onClick={() => handleEditUnit(unit)}
                                                > Edit </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                )
                            })
                        )}
            </div>
        );
    }
    console.log(form, "ini formnya")


    const {formDesign} = props
    console.log(formDesign, "form designya profile")
    return (
        <>
            <ProfileNavbar/>
            {
                isLoading ? (<tr>
                        <td className="text-center"><img src={logo} alt="loading..." width="200" height="200"/></td>
                    </tr>) :

                    <div className="wrapper">
                        <div
                            className="page-header clear-filter page-header-small"
                            filter-color="blue"
                        >
                            <div
                                className="page-header-image"
                                style={{
                                    backgroundImage: "url(" + require("../../assets/img/bg5.jpg") + ")"
                                }}
                                // ref={pageHeader}
                            ></div>
                            <Container>
                                <div className="photo-container">
                                    {
                                        profile == null || profile.photo == null ?
                                            <img alt="..." src={require("../../assets/img/photoDefault.png")}></img> :

                                            <img alt="..."
                                                 src={`${BASEURL}/vendor/photo/${profile.id}`}></img>
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
                                            onClick={handleEditProfile}>
                                        Edit Profile

                                    </Button>


                                </div>
                                <Row>
                                    <Col className="ml-auto mr-auto" md="6">
                                        <h4 className="title text-center">My Product</h4>
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
                                                    >
                                                        Furniture
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
                                                    >Interior Design
                                                    </NavLink>
                                                </NavItem>

                                            </Nav>
                                        </div>
                                    </Col>
                                    <TabContent className="gallery" activeTab={"pills" + pills}>
                                        <TabPane tabId="pills2">
                                            <Col className="ml-auto mr-auto" md="10">
                                                <Row className="collections">
                                                    {
                                                        cardUnit()
                                                    }
                                                </Row>
                                            </Col>
                                        </TabPane>
                                        <TabPane tabId="pills1">
                                            <Col className="ml-auto mr-auto" md="10">
                                                <Row className="collections">
                                                    {
                                                        cardDesign()
                                                    }
                                                </Row>
                                            </Col>
                                        </TabPane>
                                    </TabContent>
                                </Row>
                            </Container>
                        </div>
                        <DefaultFooter/>
                    </div>
            }

            <Modal isOpen={modalDesign} toggle={() => setModalDesign(false)}>
                <div className="modal-header justify-content-center">
                    <button
                        className="close"
                        type="button"
                        onClick={() => setModalDesign(false)}
                    >
                        <i className="now-ui-icons ui-1_simple-remove"></i>
                    </button>
                    <h4 className="title title-up"
                    >Edit Profile</h4>
                </div>
                <Form action="" className="form" method=""
                >
                    <ModalBody>
                        <FormVendor/>
                    </ModalBody>
                </Form>
                <div className="modal-footer">
                    <Button color="default" type="submit"
                            onClick={() => handleSubmit()}
                    >
                        Submit Profile Vendor
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


            <Modal isOpen={modalUnit} toggle={() => setModalUnit(false)}>
                <div className="modal-header justify-content-center">
                    <button
                        className="close"
                        type="button"
                        onClick={() => setModalUnit(false)}
                    >
                        <i className="now-ui-icons ui-1_simple-remove"></i>
                    </button>
                    <h4 className="title title-up"
                    >Edit Your Furniture</h4>
                </div>
                <Form action="" className="form" method=""
                >
                    <ModalBody>
                        <FormUnit/>
                    </ModalBody>
                </Form>
                <div className="modal-footer">
                    <Button color="default" type="submit"
                            onClick={() => handleSubmitUnit()}
                    >
                        Submit Updated Data
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


            <Modal isOpen={modalDesgn} toggle={() => setModalDesgn(false)}>
                <div className="modal-header justify-content-center">
                    <button
                        className="close"
                        type="button"
                        onClick={() => setModalDesgn(false)}
                    >
                        <i className="now-ui-icons ui-1_simple-remove"></i>
                    </button>
                    <h4 className="title title-up"
                    >Edit Your Interior Design</h4>
                </div>
                <Form action="" className="form" method=""
                >
                    <ModalBody>
                        <FormDesign value={formDesign}/>
                    </ModalBody>
                </Form>
                <div className="modal-footer">
                    <Button color="default" type="submit"
                            onClick={() => handleSubmitDesign()}
                    >
                        Submit Updated Data
                    </Button>
                    <Button
                        color="danger"
                        type="button"
                        onClick={() => setModalDesgn(false)}
                    >
                        Close
                    </Button>
                </div>
            </Modal>
        </>

    );
}

function mapStateToProps(state) {
    return {
        form: {...state.vendor.form}, formDesign: {...state.product.formDesign}, formUnit: {...state.product.formUnit},
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleInputChanges: (inputName, inputValue) => dispatch({
            type: HANDLE_CHANGES,
            payload: {inputName, inputValue}
        }),
        handleInputUnit: (inputName, inputValue) => dispatch({
            type: HANDLE_CHANGES_UNIT,
            payload: {inputName, inputValue}
        }),
        handleInputDesign: (inputNameDesign, inputValueDesign) => dispatch({
            type: HANDLE_CHANGES_DESIGN,
            payload: {inputNameDesign, inputValueDesign}
        }),
        submitComplete: (payload) => dispatch({type: SUBMIT_COMPLETE}),
        fetchData: () => dispatch({type: SET_LOADING}),
        fetchComplete: (payload) => dispatch({type: FETCH_COMPLETE, payload}),
        fetchCompleteUnit: (payload) => dispatch({type: FETCH_COMPLETE_UNIT, payload}),
        fetchCompleteDesign: (payload) => dispatch({type: FETCH_DESIGN, payload}),
        handleEdit: (payload) => dispatch({type: HANDLE_EDIT_PROFILE, payload}),
        handleEditUnit: (payload) => dispatch({type: EDIT_BUTTON_UNIT, payload}),
        handleEditDesign: (payload) => dispatch({type: EDIT_DESIGN, payload}),
        resetForm: () => dispatch({type: RESET_FORM}),
        resetFormUnit: () => dispatch({type: RESET_FORM_UNIT}),
        resetFormDesign: () => dispatch({type: RESET_FORM_DESIGN}),
        submitCompleteUnit: (payload) => dispatch({type: SUBMIT_COMPLETE_UNIT}),
        submitCompleteDesign: (payload) => dispatch({type: SUBMIT_COMPLETE_DESIGN}),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfilePage));
