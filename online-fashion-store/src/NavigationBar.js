import React from 'react';
import {Nav, Navbar, Form, FormControl, Button} from "react-bootstrap";
import {withRouter} from 'react-router-dom';

class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="#home">kate spade</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => this.props.history.push('/')}>HOME</Nav.Link>
                    <Nav.Link href="#new">NEW</Nav.Link>
                    <Nav.Link href="#shop">SHOP</Nav.Link>
                    <Nav.Link href="#sale">SALE</Nav.Link>
                    <Nav.Link onClick={() => this.props.history.push('/login')}>LOGIN</Nav.Link>
                    <Nav.Link onClick={() => this.props.history.push('/shopping_cart')}>CART</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-1"/>
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        )
    }
}

export default withRouter(NavigationBar);