
# BookVoyage Frontend

## Goal: 

Create an e-commerce website for books.

## Table of contents

- [Technologies](#technologies)
- [User flow](#user-flow)
- [Features](#features)
- [Project usage](#project-usage) 
- [Future development](#future-development)


## Technologies
![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)

## User flow
![User flow](https://github.com/chinguyen202/BookVoyage-Frontend/assets/58989517/41935738-96d3-414b-8406-bf49aee414e9)


## Features

1. Home page:
   - Display all books on the website 
   - Sort options:
     - Price (highest - lowest)
     - Price (lowest - highest)
     - Name ( A-Z)
     - Name ( Z-A)
   - Search for books by name
   - Filter books by category
2. Admin pannel: accessed for admin only
   -  My orders: display all order of admin
   -  All orders: display all orders in database, show details of order, admin can change order status if the status is not confirmed.
   -  Book List: display all book, function to add new book
   -  Category List: display list of all categories and function to delete, add new category.
   - Author List: display list of all authors and function to delete, add new author.
3. My order pages
   - Show the history of orders made by user.
   - User can go to see the detail of order.
4. Cart page:
   - Display all the cart items with function to add or remove quantity or delete the item from cart
   - It is empty if there is no items in cart
   - Button to link to checkout page.
5. Book detail page
   - Show information of the book
   - User can add to cart if log in.
6. Checkout page
   - Form for user to add the shipping address
   - Button so user can make the order
7. Order confirm page
   - Display the confirmation if the order is created successfully.

## Future development

1. Check out page
2. Write more tests
3. Optimize performance

## Project usage 

In the project directory, you can run:

### `npm install`

Install all the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Future development

1. More admin function
2. Write more tests
3. Optimize performance
4. Implement stripe payment
5. Implement inventory system
