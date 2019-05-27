import React from 'react';
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import {withRouter} from 'react-router-dom';

class ShoppingCart extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            sessionId: cookies.get('SessionID') || ''
        };
    }

    componentDidMount() {
        if (this.state.sessionId === '') {
            this.props.history.push('/login');
        } else {
            fetch("http://localhost:8080/shopping_cart/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId: this.state.sessionId
                })
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                });
        }
    }

    render() {
        let rows = [];
        return <div>{this.state.sessionId}</div>
    }
}

export default withRouter(withCookies(ShoppingCart));