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
- price
- image link
- post date
- color
- size
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
- product ID
- order date
- order status
- quantity
- price

## RESTful API
[API.md](./Documents/API.md)