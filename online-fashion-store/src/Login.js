import React from 'react';
import {Button, Container, Form} from "react-bootstrap";
import NavigationBar from './NavigationBar';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
import {NavLink, withRouter} from 'react-router-dom';

class Login extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        fetch('/login/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.text();
                }
            })
            .then(text => {
                if (text) {
                    const {cookies} = this.props;
                    cookies.set("SessionID", text, {path: '/'});
                    this.props.history.push('/');
                } else {
                    alert("fail");
                }
            })
            .catch(e => console.log(e));
        event.preventDefault();
    }


    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    renderForm() {
        return <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email}
                              onChange={this.handleChange}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" value={this.state.password}
                              onChange={this.handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
            &nbsp;&nbsp;<NavLink to="/register">New to our website? Click here to register an account in one minute!</NavLink>
        </Form>
    }

    render() {
        return <div>
            <NavigationBar/>
            <Container>
                {this.renderForm()}
            </Container>
        </div>
    }
}

export default withCookies(withRouter(Login));