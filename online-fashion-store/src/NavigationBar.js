import React from 'react';
import {Nav, Navbar, Form, FormControl, Button, NavDropdown} from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";

class NavigationBar extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            sessionId: cookies.get('SessionID') || '',
            isLogin: false,
            customer: {}
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/customer/" + this.state.sessionId)
            .then(response => {
                if (response.ok) {
                    response.json().then(json =>
                        this.setState({isLogin: true, customer: json}));
                } else {
                    this.setState({isLogin: false});
                }
            })
    }

    render() {
        let loginStatus = [];
        if (this.state.isLogin) {
            loginStatus.push(
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: {this.state.customer.firstName}&nbsp;{this.state.customer.lastName}
                    </Navbar.Text>
                </Navbar.Collapse>
            );
        }
        return (
            <Navbar bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="#" onClick={() => this.props.history.push('/')}>FARFETCH</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => this.props.history.push('/')}>HOME</Nav.Link>
                    <NavDropdown title="SHOP" id="basic-nav-dropdown">
                        <NavDropdown.Item
                            onClick={() => this.props.history.push('/category')}>CATEGORY</NavDropdown.Item>
                        <NavDropdown.Item
                            onClick={() => this.props.history.push('/shopping_cart')}>CART</NavDropdown.Item>
                        <NavDropdown.Item
                            onClick={() => this.props.history.push('/checkout')}>CHECKOUT</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="ACCOUNT" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => this.props.history.push('/login')}>LOGIN</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">REGISTER</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#sale">CONTACT</Nav.Link>
                </Nav>
                {loginStatus}
                {/*<Form inline>*/}
                {/*<FormControl type="text" placeholder="Search" className="mr-sm-1"/>*/}
                {/*<Button variant="outline-info">Search</Button>*/}
                {/*</Form>*/}
            </Navbar>
        )
    }
}

export default withRouter(withCookies(NavigationBar));