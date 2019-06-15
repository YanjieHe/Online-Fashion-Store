import React from 'react';
import NavigationBar from "./NavigationBar";
import {Button, ButtonToolbar, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import {withRouter} from 'react-router-dom';
import base from './Url';

class ProductDetails extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.productId = this.props.match.params.productId;
        this.state = {
            sessionId: cookies.get('SessionID') || '',
            product: {
                inventories: [{
                    imageLink: "",
                    price: "",
                    name: "",
                    description: ""
                }]
            },
            quantity: 1
        };
        this.handleClicked = this.handleClicked.bind(this);
        this.handleChanged = this.handleChanged.bind(this);
    }

    componentDidMount() {
        if (this.state.sessionId === '') {
            this.props.history.push('/login');
        } else {
            fetch("/products/" + this.productId)
                .then(response => {
                    if (response.ok) {
                        response.json().then(json => {
                            console.log(json);
                            this.setState({product: json})
                        });
                    } else {

                    }
                });
        }
    }

    addToShoppingCart(sessionId, inventoryId, quantity) {
        fetch(base + "/add_to_shopping_cart", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionId: sessionId,
                inventoryId: inventoryId,
                quantity: quantity
            })
        })
            .then(response => {
                if (response.ok) {
                    alert("Successfully added to your shopping cart");
                } else {
                    alert("Please login first");
                }
            })
    }

    handleClicked(event) {
        this.addToShoppingCart(this.state.sessionId,
            this.state.product.inventories[0].inventoryId,
            this.state.quantity);
    }

    handleChanged(event) {
        this.setState({quantity: event.target.value});
    }

    render() {
        let product = this.state.product;
        let imageLink = product.inventories[0].imageLink;
        let price = product.inventories[0].price;
        let productName = product.productName;
        let description = product.description;

        let sizeList = [];
        let colorList = [];
        for (let i = 0; i < product.inventories.length; i++) {
            sizeList.push(product.inventories[i].size);
            colorList.push(product.inventories[i].color);
        }

        let priceText = "$" + price.toString();
        console.log(priceText);
        return <div>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col>
                        <Image src={imageLink}/>
                    </Col>
                    <Col>
                        <h3> {productName}</h3>

                        <Form>
                            <Form.Group as={Row} controlId="formPlaintextPrice">
                                <Form.Label column sm="2">
                                    Price
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly value={priceText}/>
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Size</Form.Label>
                                <Form.Control as="select">
                                    {sizeList.map(size => <option>{size}</option>)}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect2">
                                <Form.Label>Color</Form.Label>
                                <Form.Control as="select">
                                    {colorList.map(color => <option>{color}</option>)}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        <hr/>
                        <p>
                            {description}
                        </p>
                        <hr/>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Quantity</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Amount (to the nearest dollar)" value={this.state.quantity}
                                         onChange={this.handleChanged}/>
                        </InputGroup>
                        <ButtonToolbar>
                            <Button variant="primary" size="lg" block onClick={this.handleClicked}>Add to cart</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Container>
        </div>
    }
}

export default withRouter(withCookies(ProductDetails));