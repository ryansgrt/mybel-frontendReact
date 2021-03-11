import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Button from "@material-ui/core/Button";
import ExploreIcon from '@material-ui/icons/Explore';

const FooterPage = () => {
    return (
        <MDBFooter color="blue" className="font-small pt-4 mt-4">
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                    <MDBCol md="6">
                        <h5 className="title">Online Furniture Shop, Solutions for Your Minimalist & Modern Furniture Needs</h5>
                        <p>
                            When buying minimalist or modern furniture, there are some things that we often worry about. Starting from goods that are less suitable, far away store locations, to the price issue. Seeing these concerns, online furniture store MyBel.com was present. In the internet era like today, buying furniture online is a common thing and very easy to do. Buying minimalist or modern furniture stays in a few taps of fingers and again online furniture stores are very easily visited via the website. Of the many online furniture stores, which have an attractive quality and design is MyBel.com, an online furniture store that focuses on minimalist, modern home loose furniture and interior design and planning work both for homes, apartments and offices.



                        </p>
                    </MDBCol>
                    <MDBCol md="3">
                        <h5 className="title">Contact Us</h5>
                        <ul>
                            <WhatsAppIcon/> : Whatsapp
                            <li className="list-unstyled">
                                <a> (+62)857-2566-4442</a>

                            </li>
                            <br></br>

                            <PhoneIcon/> : Telp
                            <li className="list-unstyled">
                                <a>(021)30021632</a>

                            </li>
                            <br></br>

                            <MailIcon/> : Mail
                            <li className="list-unstyled">
                                <a>mybel@gmail.com</a>
                            </li>
                            <br></br>
                            <LocationOnIcon/> : Address
                            <li className="list-unstyled">
                                <a>Jl. H. Dahlan No.75, RT.6/RW.4, Ragunan, Kec. Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12550</a>

                            </li>
                            <br></br>
                        </ul>
                    </MDBCol>

                    <MDBCol md="3">
                        <h5 className="title">Our Showroom</h5>
                        <Button variant="contained" color="primary" href="/index/showroom">

                            <ExploreIcon/> <a>find our showroom</a>
                        </Button>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a> mybel Store - House & Furniture </a>
                </MDBContainer>
            </div>
        </MDBFooter>
    );
}

export default FooterPage;
