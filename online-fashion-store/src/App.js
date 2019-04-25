import React from 'react';

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
            .then(text => this.setState({text:text}));
    }

    render() {
        return (
            <div>{this.state.text}</div>
        );
    }
}

export default App;
