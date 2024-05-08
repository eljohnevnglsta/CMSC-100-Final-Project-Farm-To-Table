import { addUser, getUserbyEmail, updateUserDetails, deleteUser } from "./controllers/UserController.js"
import { addNewProduct, getProductByID, updateProductDetails, deleteProduct } from "./controllers/ProductController.js"

//sends the function logic from controller to the server

const router = (app) => {
    // user 
    app.post('/add-user', addUser);
    app.post('/get-user-by-email', getUserbyEmail)
    app.post('/update-user', updateUserDetails);
    app.post('/delete-user', deleteUser);


    // product
    app.post('/add-product', addNewProduct)
    app.post('/get-product-by-id', getProductByID);
    app.post('/update-product', updateProductDetails);
    app.post('/delete-product', deleteProduct);


    //order
    
}

export default router;