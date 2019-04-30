import React from 'react';
import {Card, Button, Row, Col, Container} from "react-bootstrap";

class ProductDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {}
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/products/1")
            .then(response => response.json())
            .then(json => this.setState({product: json}));
    }

    renderOneProduct(title, price, imageUrl) {
        return <Card style={{width: '15rem'}}>
            <Card.Img variant="top" src={imageUrl}/>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{price}</Card.Text>
                {/*<Button variant="primary">Go somewhere</Button>*/}
            </Card.Body>
        </Card>;
    }

    render() {
        return <div>
            <Container>
                {this.renderOneProduct(this.state.product.product_name,this.state.product.price, this.state.product.image_link)}
            </Container>
        </div>
    }
}

export default ProductDisplay;