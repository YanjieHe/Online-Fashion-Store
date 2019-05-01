import React from 'react';
import NavigationBar from "./NavigationBar";
import {Button, ButtonToolbar, Card, Col, Container, Row} from "react-bootstrap";
import Image from "react-bootstrap/Image";

class ProductDetails extends React.Component {
    constructor(props) {
        super(props);
        this.productId = this.props.match.params.productId;
        this.state = {
            product: {}
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/products/" + this.productId)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({product: json})
            });
    }

    render() {
        let imageLink = this.state.product.imageLink;
        let price = this.state.product.price;
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
                            <Button variant="primary" size="lg" block>Add to cart</Button>
                            <Button variant="primary" size="lg" block>Buy it!</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Container>
        </div>
    }
}

export default ProductDetails;