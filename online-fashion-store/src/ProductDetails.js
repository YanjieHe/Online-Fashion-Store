import React from 'react';
import NavigationBar from "./NavigationBar";
import {Button, ButtonToolbar, Col, Container, Row} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import {withRouter} from 'react-router-dom';

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
                inventories: [""]
            }
        };
        this.handleClicked = this.handleClicked.bind(this);
    }

    componentDidMount() {
        if (this.state.sessionId === '') {
            this.props.history.push('/login');
        } else {
            fetch("http://localhost:8080/products/" + this.productId)
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    this.setState({product: json})
                });
        }
    }

    handleClicked(event) {
        console.log(JSON.stringify({
            sessionId: this.state.sessionId,
            inventoryId: this.state.product.inventories[0].inventoryId,
            quantity: 1
        }));
        fetch("http://localhost:8080/add_into_shopping_cart/", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionId: this.state.sessionId,
                inventoryId: this.state.product.inventories[0].inventoryId,
                quantity: 1
            })
        })
            .then(response => response.text())
            .then(text => {
                alert(text);
            });
    }

    render() {
        let imageLink = this.state.product.inventories[0].imageLink;
        let price = this.state.product.inventories[0].price;
        let name = this.state.product.name;
        let description = this.state.product.description;
        return <div>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col>
                        <Image src={imageLink}/>
                    </Col>
                    <Col>
                        <h3> {name}</h3>
                        ${price}
                        <p>
                            {description}
                        </p>
                        <ButtonToolbar>
                            <Button variant="primary" size="lg" block onClick={this.handleClicked}>Add to cart</Button>
                            <Button variant="primary" size="lg" block>Buy it!</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Container>
        </div>
    }
}

export default withRouter(withCookies(ProductDetails));