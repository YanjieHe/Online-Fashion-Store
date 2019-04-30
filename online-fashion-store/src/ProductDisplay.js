import React from 'react';
import {Card, Button, Row, Col, Container} from "react-bootstrap";

class ProductDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/trending_products/10")
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({products: json})
            });
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
                {this.state.products.map(
                    product =>
                        this.renderOneProduct(product.name, product.price, product.imageLink)
                )}
            </Container>
        </div>
    }
}

export default ProductDisplay;