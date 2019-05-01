# Online-Fasion-Store

## Technical Stack

- Front-end: React.js
- Back-end: Spring, Hibernate, MySQL
- API: RESTful API

## Entities

- Customer
- Product
- Shopping Cart
- Order

Product:
- product ID
- category ID
- name
- post date
- score
- description

Product Categories:
- category ID
- category name
- parent category id (nullable)

Customer:
- customer ID
- email
- password
- first name
- last name

Order:
- order ID
- customer ID
- inventory id
- order date
- order status
- quantity
- price

Inventory:
- inventory id
- product id
- color
- size
- price
- image link
- quantity

Shopping cart:
- inventory id
- customer id
- adding date
- quantity


## RESTful API
[API.md](./Documents/API.md)