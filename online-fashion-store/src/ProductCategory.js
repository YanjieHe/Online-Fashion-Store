import React from 'react';
import NavigationBar from "./NavigationBar";
import ProductDisplay from "./ProductDisplay";
import {Container, Row, Col, InputGroup, DropdownButton, Dropdown, FormControl} from 'react-bootstrap';

class ProductCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            sortCriteria: "SORT",
            options: {}
        };
        this.handleSortCriteriaClick = this.handleSortCriteriaClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch("/trending_products/12")
            .then(response => response.json())
            .then(json => {
                this.setState({products: json})
            });
    }

    handleSortCriteriaClick(criteria) {
        this.setState({sortCriteria: criteria});
    }

    handleChange(category, value, event) {
        let checked = event.target.checked;
        if (checked) {
            if (category in this.state.options) {
                if (value in this.state.options[category]) {
                    return this.state.options[category];
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    check(category, value) {
        if (category in this.state.options) {
            if (value in this.state.options[category]) {
                return this.state.options[category];
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
                <InputGroup.Checkbox aria-label="Checkbox for following text input" checked={() =>
                    this.check(category, value)}
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
                            <div>
                                <h4>Color</h4>
                                {this.option("Color", "Black")}
                                {this.option("Color", "White")}
                            </div>
                            <div>
                                <h4>Size</h4>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input"/>
                                    </InputGroup.Prepend>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Large</InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input"/>
                                    </InputGroup.Prepend>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Small</InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
                            </div>
                            <div>
                                <h4>Material</h4>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input"/>
                                    </InputGroup.Prepend>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Cotton</InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input"/>
                                    </InputGroup.Prepend>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Linen</InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input"/>
                                    </InputGroup.Prepend>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Nylon</InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
                            </div>
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