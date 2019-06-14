import React from 'react';
import NavigationBar from "./NavigationBar";
import {Button, ButtonToolbar, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
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
                if(response.ok){
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
        let imageLink = this.state.product.inventories[0].imageLink;
        let price = this.state.product.inventories[0].price;
        let size = this.state.product.inventories[0].size;
        let color = this.state.product.inventories[0].color;
        let productName = this.state.product.productName;
        let description = this.state.product.description;
        return <div>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col>
                        <Image src={imageLink}/>
                    </Col>
                    <Col>
                        <h3> {productName}</h3>
                        ${price}
                        {size}
                        {color}
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