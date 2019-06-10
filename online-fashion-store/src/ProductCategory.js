import React from 'react';
import NavigationBar from "./NavigationBar";
import ProductDisplay from "./ProductDisplay";
import {Container, Row, Col, InputGroup, DropdownButton, Dropdown, FormControl} from 'react-bootstrap';

class ProductCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            sortCriteria: "SORT"
        };
        this.handleSortCriteriaClick = this.handleSortCriteriaClick.bind(this);
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
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input"/>
                                    </InputGroup.Prepend>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Black</InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input"/>
                                    </InputGroup.Prepend>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>White</InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
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