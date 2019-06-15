import React from 'react';
import {Button, Container, Form} from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import {NavLink} from "react-router-dom";

class Register extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <Container>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Send Confirmation Email
                    </Button>
                    <Form.Group controlId="formBasicCode">
                        <Form.Label>Enter Code</Form.Label>
                        <Form.Control type="password" placeholder="Enter Code"/>
                        <Form.Text className="text-muted">
                            Enter the code in the email you received.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    &nbsp;&nbsp;<NavLink to="/login">Already have an account? Click here to login!</NavLink>
                </Form>
                </Container>
            </div>
        );
    }
}

export default Register;