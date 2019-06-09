import React from 'react';
import {Card, Row, Col, Container} from "react-bootstrap";
import {withRouter} from 'react-router-dom';

class ProductDisplay extends React.Component {
    constructor(props) {
        super(props);
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
        let N = this.props.products.length;
        for (let i = 0; i < N; i = i + 3) {
            let row = [];
            for (let k = 0; k < 3 && i + k < N; k++) {
                let product = this.props.products[i + k];
                row.push(<Col>
                    {this.renderOneProduct(product.productId, product.productName, product.inventories[0].price, product.inventories[0].imageLink)}
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