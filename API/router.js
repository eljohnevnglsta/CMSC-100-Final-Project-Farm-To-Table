import { addUser, getUserbyEmail, updateUserDetails, deleteUser, showAllUser } from "./controllers/UserController.js"
import { addNewProduct, getProductByID, updateProductDetails, deleteProduct, showAllProducts } from "./controllers/ProductController.js"

//sends the function logic from controller to the server

const router = (app) => {
    // user 
    app.post('/add-user', addUser);
    app.post('/get-user-by-email', getUserbyEmail)
    app.post('/update-user', updateUserDetails);
    app.post('/delete-user', deleteUser);
    app.post('/show-all-user', showAllUser);


    // product
    app.post('/add-product', addNewProduct)
    app.post('/get-product-by-id', getProductByID);
    app.post('/update-product', updateProductDetails);
    app.post('/delete-product', deleteProduct);
    app.post('/show-all-product', showAllProducts);

    //order
    
}

export default router;