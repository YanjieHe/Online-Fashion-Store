import React from 'react';
import {Card, Col, Container, Nav, Row} from 'react-bootstrap';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/test")
            .then(response => response.text())
            .then(text => this.setState({text: text}));
    }

    render() {

        return (
            <div>
                <Nav
                    activeKey="/home"
                    onSelect={selectedKey => alert(`selected ${selectedKey}`)}
                >
                    <Nav.Item>
                        <Nav.Link href="/home">NEWS</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1">HANDBAGS</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2">CLOTHING</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Container>
                    <Row>
                    <Col width={"30%"}>
                        <ul>
                            <li>VIEW ALL</li>
                            <li>DRESSES & JUMPSUITS</li>
                        </ul>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <Card style={{width: '6rem'}}>
                                    <Card.Img variant="top"
                                              src="https://katespade.insnw.net/KateSpade/NJMUA521_092_1?$large$"/>
                                    <Card.Body>
                                        <Card.Title>femme denim jacket</Card.Title>
                                        <Card.Text>$248.00</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card style={{width: '6rem'}}>
                                    <Card.Img variant="top"
                                              src="https://katespade.insnw.net/KateSpade/NJMUA521_092_1?$large$"/>
                                    <Card.Body>
                                        <Card.Title>femme denim jacket</Card.Title>
                                        <Card.Text>$248.00</Card.Text>
                                    </Card.Body>
                                </Card></Col>
                            <Col>
                                <Card style={{width: '6rem'}}>
                                    <Card.Img variant="top"
                                              src="https://katespade.insnw.net/KateSpade/NJMUA521_092_1?$large$"/>
                                    <Card.Body>
                                        <Card.Title>femme denim jacket</Card.Title>
                                        <Card.Text>$248.00</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
