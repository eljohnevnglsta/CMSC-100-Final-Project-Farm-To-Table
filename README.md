# Farm-to-Table E-commerce Website

## Overview

The "Farm-to-Table" project aims to create an e-commerce platform that connects consumers directly with farmers, facilitated by the Department of Agriculture (DA). This is a project in CMSC 100 - Web Programming at the University of the Philppines Los Baños showcasing the students mastery on creating a functional website with a server, database and user interface. 

## How To Run?
- **Install Dependencies:**
    - Open a terminal and navigate to the **API/MongoDB** folder and type in ```npm i``` to install dependencie on the server side. 
    - Navigate to the **react** folder and type in ```npm i``` to install dependencie on the client side. 
- **Run the App**
    - Create two terminals dedicated to both the client and server side.
    - In the first terminal, navigate to the **API/MongoDB** folder and type in ```node index.js``` or ```npm run dev``` to initiate the server. Without this, majority of the client side will not work.
    - In the second terminal, navigate to the **react** folder and type in ```npm start```. This shall initialize the website and should automatically open a browser to [http://localhost:3000/](http://localhost:3000/). If not, check if port 3000 is in use; the terminal will prompt you if you want to use another port.
- **Start Navigating**
    - You will now be greeted by the root page of the site. You may login or signup depending if you already have an account to access the customer side. 
    - To access the admin side the you would need to enter the following credentials {email: ```admin@da.gov.ph```, password: ```adminadmin```}

## Navigation
### Customer Side
- **Home**
    - Once logged in you will be greeted by the home page. 
    - You can access the products lists and add items to your cart.
    - You may utilize the search and filter functions to easily find products that you want. 
    - You are not allowed to add an item that is out of stock. 
    - Before checking out, you need to save your cart first in order to update the database. This shall also ensure that when you log out, your cart is synced.
    - When you click checkout, your cart will be automatically cleared and will be processed by the admin.

- **Orders**
    - You will see here the status of your orders grouped by the time you clicked check out.
    - You may cancel any pending orders not confirmed by the admin.
- **Profile**
    - This page contains your user information.
    - You may click logout if you are done with the site.

### Admin Side
- **Admin Home**
    - When logged in as admin, you will be greeted by the product listings. 
    - You may arrange them by name, price or type.
    - You may opt to add another product. Note that image only supports URL input. 
    - You may also opt to edit an existing product. You cannot edit the product ID

- **User Management**
    - You can see here the total count and all the user's name and email.
    - You can delete any user. 
    - When you click the user's name, you can see their details, and all transaction history they made.

- **Order Management**
    - You can see here all the pending orders arranged by user and date.
    - You may opt to accept or cancel any orders.
    - If an item, has insufficient stock, you are not allowed to accept the order. 

- **Sales Report**
    - You have the power to view the best selling products and filter them by date range.
    - Start Date should always be earlier or the same as end date. Otherwise, no data will be shown. 
    - The table will also show the sales information of all the products in the database given that date you selected.
- **Profile**
    - This page contains your user information.
    - You may click logout if you are done with the site.


## Project Features

### User Types and Accounts
- **Customers (Registered Users):**
  - Register using an email address without the need for verification.
  - Login/Logout functionality.
  - Browse and purchase products.
  - Manage shopping cart and orders.

- **Department of Agriculture (Administrator or Merchant):**
  - Pre-assigned admin account to manage the entire product catalog.
  - Oversee user accounts, product listings, order fulfillment, and sales reports.

### Authentication
- Users must register and log in to access the system.
- Customers cannot see admin-exclusive routes or endpoints.

### E-commerce Management (Admin)
- **Dashboard:**
  - User account management with a total count of registered users.
  - Product listings with the ability to add, edit, delete, and sort products.
  - Order fulfillment with confirmation.
  - Sales reports providing weekly, monthly, and annual summaries.

### Shop (Customers)
- **Product Listings:**
  - View and sort products by name, type, price, or quantity.
  - Add products to the shopping cart and manage cart items.
  - Proceed to order confirmation

## Technology Stack

- **Front End:** React JS
- **Back End:** Node JS (Express JS)
- **Database:** MongoDB