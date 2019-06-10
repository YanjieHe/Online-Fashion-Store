import React from 'react';
import NavigationBar from "./NavigationBar";
import TrendingProducts from "./TrendingProducts";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }

    componentDidMount() {
        fetch("/test")
            .then(response => response.text())
            .then(text => this.setState({text: text}));
    }

    render() {

        return (
            <div>
                <NavigationBar/>
                <TrendingProducts/>
            </div>
        );
    }
}

export default App;
