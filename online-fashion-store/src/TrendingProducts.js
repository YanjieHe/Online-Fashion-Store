import React from 'react';
import NavigationBar from "./NavigationBar";
import ProductDisplay from "./ProductDisplay";

class TrendingProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        fetch("/trending_products/12")
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({products: json})
            });
    }

    render() {
        let products = this.state.products;
        return (
            <div>
                <NavigationBar/>
                <h1>Trending Products</h1>
                <hr/>
                <ProductDisplay products={products}/>
            </div>
        );
    }
}

export default TrendingProducts;