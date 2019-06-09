import React from 'react';
import NavigationBar from './NavigationBar';
import {Form, Col, Button} from 'react-bootstrap';

class Checkout extends React.Component {
    render() {
        return <div>
            <NavigationBar/>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control placeholder=""/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control placeholder=""/>
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address 1</Form.Label>
                    <Form.Control placeholder="1234 Main St"/>
                </Form.Group>

                <Form.Group controlId="formGridAddress2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Apartment, studio, or floor"/>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control/>
                    </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit">
                    Checkout
                </Button>
            </Form>
        </div>
    }
}

export default Checkout;