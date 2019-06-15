import React from 'react';
import NavigationBar from "./NavigationBar";
import {Button, Container, Form} from "react-bootstrap";

class Contact extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <Container>
                    <h1>Contact Us</h1>
                    <br/>
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Control type="text" placeholder="Your name"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Your e-mail"/>
                        </Form.Group>

                        <Form.Group controlId="formBasicSubject">
                            <Form.Control type="text" placeholder="Subject"/>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows="3" placeholder="Message"/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            SEND NOW
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default Contact;