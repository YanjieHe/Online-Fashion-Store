import React from 'react';
import NavigationBar from './NavigationBar';
import {Form, Container, Row, Col, Button, Table} from 'react-bootstrap';
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import {withRouter} from 'react-router-dom';
import "./Checkout.css";

class Checkout extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            sessionId: cookies.get('SessionID') || '',
            cart: []
        };
    }

    componentDidMount() {
        if (this.state.sessionId === '') {
            this.props.history.push('/login');
        } else {
            fetch("/shopping_cart/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId: this.state.sessionId
                })
            })
                .then(response => response.json())
                .then(json => this.setState({cart: json}));
        }
    }

    render() {
        let rows = [];
        let cart = this.state.cart;
        let subtotal = 0;
        for (let i = 0; i < cart.length; i++) {
            let total = parseFloat(cart[i].quantity) * parseFloat(cart[i].price);
            rows.push(
                <tr>
                    <td id="product">
                        {cart[i].name}
                    </td>
                    <td id="product">
                        x&nbsp;{cart[i].quantity}
                    </td>
                    <td id="product">
                        ${total.toFixed(2)}
                    </td>
                </tr>
            );
            subtotal = subtotal + total;
        }
        let shipping = 50;
        return <div>
            <NavigationBar/>
            <Container fluid>
                <Row>
                    <Col>
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
                                        <option>DC</option>
                                        <option>VA</option>
                                        <option>MD</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="phone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPayment">
                                    <Form.Label>Payment</Form.Label>
                                    <Form.Control as="select">
                                        <option>Choose...</option>
                                        <option>Debit Card</option>
                                        <option>Credit Card</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="cardNumber">
                                    <Form.Label>Card Number</Form.Label>
                                    <Form.Control/>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Col>
                    <Col>
                        <h3>Your Order</h3>
                        <Table>
                            <thead>
                            <td>Product</td>
                            <td></td>
                            <td>Total</td>
                            </thead>
                            <tbody>
                            {rows}
                            <tr>
                                <td>SUBTOTAL</td>
                                <td></td>
                                <td>${subtotal.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>SHIPPING</td>
                                <td></td>
                                <td>Flat rate: ${shipping.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>TOTAL</td>
                                <td></td>
                                <td>${(subtotal + shipping).toFixed(2)}</td>
                            </tr>
                            </tbody>
                        </Table>
                        <Button variant="primary" type="submit" block>
                            Checkout
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    }
}

export default withCookies(withRouter(Checkout));