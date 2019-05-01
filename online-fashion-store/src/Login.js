import React from 'react';
import {Button, Container, Form} from "react-bootstrap";
import NavigationBar from './NavigationBar';

class Login extends React.Component {

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
        alert("email: " + this.state.email + "\npassword: " + this.state.password);
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

export default Login;