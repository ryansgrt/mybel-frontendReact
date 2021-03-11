import React from "react";
import {Col, Container, Row} from "reactstrap";


function InformationLanding() {

    return(
    <>
    <div className="section section-about-us">
        <Container>
            <Row>
                <Col className="ml-auto mr-auto text-center" md="8">
                    <h2 className="title">Who we are?</h2>
                    <h5 className="description">
                        Online Furniture Shop, Solutions for Your Minimalist & Modern Furniture Needs.
                        Although buying furniture online, it is a misperception if you think that the choices offered are limited - quite the opposite, buying furniture at an online furniture store gives you the flexibility to choose the best items to fill your home. A wide selection of furniture designs, models, to colors you can choose at will. You can adjust it to your favorite color, or even a lucky color. Furniture that can be purchased at mybel.com can be used for a variety of residential styles from Scandinavian, mid-century, minimalist, to modern.

                    </h5>
                </Col>
            </Row>
            <div className="separator separator-primary"></div>
            <div className="section-story-overview">
                <Row>
                    <Col md="6">
                        <div
                            className="image-container image-left"
                            style={{
                                backgroundImage:
                                    "url(" + require("../../assets/img/bg-image/blue3.jpg") + ")"
                            }}
                        >
                            <p className="blockquote blockquote-info">
                                "Minimalism is not a style. it's an additude, a way of being . it's fundamental reaction against noise, visual noise, disorder, vulgarity. minimalism is a pursuit of the assence of things, not appearance" <br></br>
                                <br></br>
                                <small>-Massimo Vignelli</small>
                            </p>
                        </div>
                        <div
                            className="image-container"
                            style={{
                                backgroundImage:
                                    "url(" + require("../../assets/img/bg-image/blue2.jpg") + ")"
                            }}
                        ></div>
                    </Col>
                    <Col md="5">
                        <div
                            className="image-container image-right"
                            style={{
                                backgroundImage:
                                    "url(" + require("../../assets/img/bg-image/blue1.jpg") + ")"
                            }}
                        ></div>
                        <h3>
                            Find Furniture For Various Interior Styles
                        </h3>
                        <p>
                            As one of the online-based furniture stores but has a variety of showrooms spread across JABODETABEK,
                            mybel.com makes it easy when you want to buy minimalist and modern furniture online. Online furniture offered by mybel.com also has a variety of choices, ranging from a wide selection of living room furniture, dining rooms, bedrooms, work space, and home decoration can be found here. Buying furniture online at mybel.com is as easy as buying ordinary equipment. With just a few clicks, you can shop for minimalist home furniture that you want. As one of the online furniture stores in Indonesia, Fabelio.com wants to ensure convenience and comfort when you want to shop for minimalist or modern furniture online.

                        </p>
                        <p>
                            What is your favorite furniture style, Scandinavian, minimalist, industrial, or the other? Whatever it is, you can find it at the online furniture store mybel.com. You can easily mix and match the dream interior thanks to the large selection of online furniture at mybel.com without needing to doubt about its quality. You can directly ask the mybel.com team if you have questions about the product or interior design that you want.
                        </p>
                    </Col>
                </Row>
            </div>
        </Container>
    </div>

        </>
)
}
export default InformationLanding
