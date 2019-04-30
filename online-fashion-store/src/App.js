import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import NavigationBar from "./NavigationBar";

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
<NavigationBar/>
            </div>
        );
    }
}

export default App;
