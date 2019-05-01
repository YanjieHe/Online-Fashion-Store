import React from 'react';
import {Card, Button, Row, Col, Container} from "react-bootstrap";
import {withRouter} from 'react-router-dom';

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

    renderOneProduct(productId, title, price, imageUrl) {
        return <Card style={{width: '15rem'}}>
            <Card.Img variant="top" src={imageUrl} onClick={() => this.props.history.push("/product/" + productId)}/>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>${price}</Card.Text>
                {/*<Button variant="primary">Go somewhere</Button>*/}
            </Card.Body>
        </Card>;
    }

    render() {
        let rows = [];
        let N = this.state.products.length;
        for (let i = 0; i < N; i = i + 3) {
            let row = [];
            for (let k = 0; k < 3 && i + k < N; k++) {
                let product = this.state.products[i + k];
                row.push(<Col>
                    {this.renderOneProduct(product.productId, product.name, product.price, product.imageLink)}
                </Col>);
            }
            rows.push(
                <Row>
                    {row}
                </Row>
            );
        }
        return <div>
            <Container>
                {rows}
            </Container>
        </div>
    }
}

export default withRouter(ProductDisplay);