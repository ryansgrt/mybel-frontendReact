import React from "react";
import {Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from "reactstrap";

function MessageForm() {
    const [firstFocus, setFirstFocus] = React.useState(false);
    const [lastFocus, setLastFocus] = React.useState(false);
return(
    <div className="section section-contact-us text-center">
        <Container>
            <h2 className="title">Do you have any advice for us?</h2>
            <p className="description">Your advice is important to us.</p>
            <Row>
                <Col className="text-center ml-auto mr-auto" lg="6" md="8">
                    <InputGroup
                        className={
                            "input-lg" + (firstFocus ? " input-group-focus" : "")
                        }
                    >
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            placeholder="First Name..."
                            type="text"
                            onFocus={() => setFirstFocus(true)}
                            onBlur={() => setFirstFocus(false)}
                        ></Input>
                    </InputGroup>
                    <InputGroup
                        className={
                            "input-lg" + (lastFocus ? " input-group-focus" : "")
                        }
                    >
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="now-ui-icons ui-1_email-85"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            placeholder="Email..."
                            type="text"
                            onFocus={() => setLastFocus(true)}
                            onBlur={() => setLastFocus(false)}
                        ></Input>
                    </InputGroup>
                    <InputGroup className="textarea-container">
                        <Input
                            cols="80"
                            name="name"
                            placeholder="Type a message..."
                            rows="4"
                            type="textarea"
                        ></Input>
                    </InputGroup>
                    <div className="send-button">
                        <Button
                            block
                            className="btn-round"
                            color="info"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            size="lg"
                        >
                            Send Message
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>

)
}
export default MessageForm;
