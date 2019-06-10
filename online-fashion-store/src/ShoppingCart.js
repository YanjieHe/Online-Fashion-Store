import React from 'react';
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import {withRouter} from 'react-router-dom';
import {Image, Table, Button, ButtonToolbar} from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import "./ShoppingCart.css";

class ShoppingCart extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            sessionId: cookies.get('SessionID') || '',
            cart: [],
            inventoryList: {}
        };
    }

    getInventoryList(inventoryIdList) {
        fetch("http://localhost:8080/inventory_list/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    inventoryIdList)
            }
        )
            .then(response => response.json())
            .then(json => {
                console.log("inventory: ");
                console.log(json);
                this.setState({inventoryList: json})
            });
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
                    console.log("retrieved information: ");
                    console.log(json);
                    this.setState({cart: json}, () => {
                        let inventoryIdList = [];
                        for (let i = 0; i < this.state.cart.length; i++) {
                            let inventoryId = this.state.cart[i].inventoryId;
                            inventoryIdList.push(inventoryId);
                        }
                        this.getInventoryList(inventoryIdList);
                    });
                });
        }
    }

    render() {
        let rows = [];
        let inventoryList = this.state.inventoryList;
        for (let i = 0; i < this.state.inventoryList.length; i++) {
            console.log(inventoryList[i]);
            rows.push(<tr>
                <td id="cart"><Image src={inventoryList[i].imageLink} width="50px"/></td>
                <td id="cart">Handbag</td>
                <td id="cart">${inventoryList[i].price.toFixed(2)}</td>
                <td id="cart">{inventoryList[i].color}</td>
                <td id="cart">{inventoryList[i].size}</td>
                <td id="cart">{inventoryList[i].quantity}</td>
                <td id="cart">
                    <ButtonToolbar>
                        <Button variant="primary">Move to Wish List</Button>
                        <Button variant="danger">Remove</Button>
                    </ButtonToolbar>
                </td>
            </tr>)
        }
        return <div>
            <NavigationBar/>
            <Table hover>
                <thead>
                <td id="cart">Product</td>
                <td id="cart">Name</td>
                <td id="cart">Price</td>
                <td id="cart">Color</td>
                <td id="cart">Size</td>
                <td id="cart">Quantity</td>
                <td id="cart"></td>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
            <Button variant="primary" onClick={() => this.props.history.push("/checkout")}>Proceed to Checkout</Button>
        </div>
    }
}

export default withRouter(withCookies(ShoppingCart));