import needle from "needle";

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

async function GetAllProducts(){
    try {
        const response = await needle('post', `${baseURL}/show-all-product`);
        console.log('Product List:', response.body);
        return response.body; 
    } catch (error) {
        console.error('Error showing all products:', error.message);
    }
}

//function calls example
// AddNewProduct({
//     productId: '125456',
//     productName: 'Apple',
//     productDescription: 'Fresh red apple',
//     productType: 1,
//     productQuantity: 50
// });

// GetProductByID('125456');
// UpdateProductDetails('125456', { productName: 'kineme', productQuantity: 10 });   //productid cannot be modified here
// DeleteProduct('125456');
// GetAllProducts();

export {AddNewProduct, GetProductByID, UpdateProductDetails, DeleteProduct, GetAllProducts}