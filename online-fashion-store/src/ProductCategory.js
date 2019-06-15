import React from 'react';
import NavigationBar from "./NavigationBar";
import ProductDisplay from "./ProductDisplay";
import {Container, Row, Col, InputGroup, DropdownButton, Dropdown, FormControl} from 'react-bootstrap';
import base from "./Url";

class ProductCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            sortCriteria: "SORT",
            distinctValues: {"Color": [], "Size": []},
            options: {}
        };
        this.handleSortCriteriaClick = this.handleSortCriteriaClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch(base + "/distinct_values")
            .then(response => response.json())
            .then(json => this.setState({distinctValues: json},
                () =>
                    fetch(base + "/filter_products", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(this.state.options)
                    })
                        .then(response => response.json())
                        .then(json => {
                            console.log("retrieved information");
                            console.log(json);
                            console.log(this.state.sortCriteria);
                            if (this.state.sortCriteria === "price high to low") {
                                json.sort((a, b) => a.inventories[0].price < b.inventories[0].price);
                            } else if (this.state.sortCriteria === "price low to high") {
                                json.sort((a, b) => a.inventories[0].price > b.inventories[0].price);
                            }
                            this.setState({products: json})
                        })
            ));
    }

    handleSortCriteriaClick(criteria) {
        this.setState({sortCriteria: criteria}, () => this.componentDidMount());
    }

    handleChange(category, value, event) {
        let checked = event.target.checked;
        if (checked) {
            if (category in this.state.options) {
                if (value in this.state.options[category]) {
                    let options = Object.assign({}, this.state.options);
                    options[category][value] = true;
                    this.setState({options: options}, () => this.componentDidMount());
                } else {
                    let options = Object.assign({}, this.state.options);
                    options[category][value] = true;
                    this.setState({options: options}, () => this.componentDidMount());
                }
            } else {
                let options = Object.assign({}, this.state.options);
                options[category] = {};
                options[category][value] = true;
                this.setState({options: options}, () => this.componentDidMount());
            }
        } else {
            if (category in this.state.options) {
                if (value in this.state.options[category]) {
                    let options = Object.assign({}, this.state.options);
                    options[category][value] = false;
                    this.setState({options: options}, () =>
                        this.componentDidMount());
                } else {

                }
            } else {

            }
        }
    }

    check(category, value) {
        if (category in this.state.options) {
            if (value in this.state.options[category]) {
                return this.state.options[category][value];
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    option(category, value) {
        return <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Checkbox aria-label="Checkbox for following text input"
                                     checked={this.check(category, value)}
                                     onChange={event => this.handleChange(category, value, event)}/>
            </InputGroup.Prepend>
            <InputGroup.Prepend>
                <InputGroup.Text>{value}</InputGroup.Text>
            </InputGroup.Prepend>
        </InputGroup>
    }

    render() {
        let products = this.state.products;
        return (
            <div>
                <NavigationBar/>
                <InputGroup className="mb-3">
                    <DropdownButton
                        as={InputGroup.Prepend}
                        variant="outline-secondary"
                        title={this.state.sortCriteria}
                        id="input-group-dropdown-1"
                    >
                        <Dropdown.Item onClick={() =>
                            this.handleSortCriteriaClick("price high to low")}>price
                            high to low</Dropdown.Item>
                        <Dropdown.Item onClick={() =>
                            this.handleSortCriteriaClick("price low to high")}>price
                            low to high</Dropdown.Item>
                        <Dropdown.Item onClick={() =>
                            this.handleSortCriteriaClick("just added")}>just
                            added</Dropdown.Item>
                        <Dropdown.Item onClick={() =>
                            this.handleSortCriteriaClick("top rated")}>top
                            rated</Dropdown.Item>
                    </DropdownButton>
                    <FormControl aria-describedby="basic-addon1"/>
                </InputGroup>
                <Container fluid>
                    <Row>
                        <Col>
                            <h2>Browse Category</h2>
                            <hr/>
                            <div>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input"/>
                                    </InputGroup.Prepend>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Dresses</InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input"/>
                                    </InputGroup.Prepend>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Skirts</InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
                            </div>
                            <br/>
                            <h2>Product Filters</h2>
                            <hr/>
                            {Object.keys(this.state.distinctValues).concat().sort().map(
                                key =>
                                    <div>
                                        <h4>{key}</h4>
                                        {this.state.distinctValues[key].map(
                                            color =>
                                                this.option(key, color))}
                                    </div>
                            )}
                        </Col>
                        <Col xs={9}>
                            <ProductDisplay products={products}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ProductCategory;