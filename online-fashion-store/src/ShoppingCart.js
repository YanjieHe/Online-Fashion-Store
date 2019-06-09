import React from 'react';
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import {withRouter} from 'react-router-dom';
import {Image, Table} from "react-bootstrap";
import NavigationBar from "./NavigationBar";

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
                <td><Image src={inventoryList[i].imageLink} width="100px"/></td>
                <td>Handbag</td>
                <td>{inventoryList[i].price}</td>
                <td>{inventoryList[i].color}</td>
                <td>{inventoryList[i].size}</td>
                <td>{inventoryList[i].quantity}</td>
            </tr>)
        }
        return <div>
            <NavigationBar/>
            <Table bordered hover>
                <thead>
                <td>Product</td>
                <td>Name</td>
                <td>Price</td>
                <td>Color</td>
                <td>Size</td>
                <td>Quantity</td>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    }
}

export default withRouter(withCookies(ShoppingCart));