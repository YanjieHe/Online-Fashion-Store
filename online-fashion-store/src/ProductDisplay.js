import React from 'react';
import {Card, Button, Row, Col, Container} from "react-bootstrap";

class ProductDisplay extends React.Component {

    renderOneProduct(url) {
        return <Card style={{width: '15rem'}}>
            <Card.Img variant="top" src={url}/>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text></Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>;
    }

    render() {
        return <div>
            <Container>
                <Row>
                    <Col>
                        {this.renderOneProduct("https://katespade.insnw.net/KateSpade/PXRUA160_399_1?$large$")}
                    </Col>
                    <Col>
                        {this.renderOneProduct("https://katespade.insnw.net/KateSpade/PXRUA350_104_1?$large$")}
                    </Col>
                    <Col>
                        {this.renderOneProduct("https://katespade.insnw.net/KateSpade/PXRUA350_429_1?$large$")}
                    </Col>
                </Row>
            </Container>
        </div>
    }
}

export default ProductDisplay;