import needle from 'needle';
import { deleteUser } from './controllers/UserController';

// Define the base URL where your server is running
const baseURL = 'http://localhost:3001';

// Function to test addUser endpoint
async function AddUser(userData) {
    try {
        const response = await needle('post', `${baseURL}/add-user`, userData);
        console.log('Add User Response:', response.body);
        return response.body;
    } catch (error) {
        console.error('Error adding user:', error.message);
    }
}

// Function to test getUserByEmail endpoint
async function GetUserByEmail(emailq) {
    needle.post(    
        'http://localhost:3001/get-user-by-email',
        { email: emailq }, // Pass email as a query parameter
        (err, res) => { 
            if (err) {
                console.error('Error:', err);
                return;
            }
            console.log(res.body);
            return res.body;
        }
    );  
}

// Function to test updateUserDetails endpoint
async function UpdateUserDetails(email, updatedData) {
    try {
        const response = await needle('post', `${baseURL}/update-user`, {...updatedData, email: email});
        console.log('Update User Response:', response.body);
        return response.body; 
    } catch (error) {
        console.error('Error updating user details:', error.message);
    }
}

async function DeleteUser(email) {
    try {
        const response = await needle('post', `${baseURL}/delete-user`, {email: email});
        console.log('Delete Product Response:', response.body);
        return response.body; 
    } catch (error) {
        console.error('Error deleting product:', error.message);
    }
}

// Function to test addNewProduct endpoint
async function AddNewProduct(productData) {
    try {
        const response = await needle('post', `${baseURL}/add-product`, productData);
        console.log('Add Product Response:', response.body);
        return response.body; 
    } catch (error) {
        console.error('Error adding product:', error.message);
    }
}

// Function to test getProductByID endpoint
async function GetProductByID(productId) {
    try {
        const response = await needle('post', `${baseURL}/get-product-by-id`, {productId: productId});
        console.log('Get Product by ID Response:', response.body);
        return response.body; 
    } catch (error) {
        console.error('Error getting product by ID:', error.message);
    }
}

// Function to test updateProductDetails endpoint
async function UpdateProductDetails(productId, updatedData) {
    try {
        const response = await needle('post', `${baseURL}/update-product`, {...updatedData, productId: productId});
        console.log('Update Product Response:', response.body);
        return response.body; 
    } catch (error) {
        console.error('Error updating product details:', error.message);
    }
}

// Function to test deleteProduct endpoint
async function DeleteProduct(productId) {
    try {
        const response = await needle('post', `${baseURL}/delete-product`, {productId: productId});
        console.log('Delete Product Response:', response.body);
        return response.body; 
    } catch (error) {
        console.error('Error deleting product:', error.message);
    }
}

// You may use thes functions to get and modify items from the database. Just follow these function prototypes.
// You may opt to create other methods if necessary

//functions for user
AddUser({
        firstName: 'John',
        lastName: 'Doe',
        userType: 'customer',
        email: 'john@example.com',
        password: 'password123'
});

GetUserByEmail('john@example.com');
UpdateUserDetails('john@example.com', { firstName: 'Johnny' });   //email cannot be modified here
DeleteUser('john@example.com');

//functions for products

AddNewProduct({
    productId: '123456',
    productName: 'Apple',
    productDescription: 'Fresh red apple',
    productType: 1,
    productQuantity: 50
});

GetProductByID('123456');
UpdateProductDetails('123456', { productName: 'Green Apple' });   //productid cannot be modified here
DeleteProduct('123456');