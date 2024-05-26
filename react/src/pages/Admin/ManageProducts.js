import { useEffect, useState } from 'react';
import '../../stylesheets/Admin/ProductManagement.css';
import axios from 'axios';

export default function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        productId: '',
        productName: '',
        productImage: '',
        productDescription: '',
        productType: 1, // default to 'Crop'
        productQuantity: 0
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        fetch('http://localhost:3001/show-all-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(body => {
                setProducts(body);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    const inputChanges = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); //state updater function for the formData state
    };                //creates a copy of the current formData state    

    const formSubmission = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3001/add-product', formData)
        if (response.data.inserted) {
            fetchProducts();
            setFormData({
                productId: '',
                productName: '',
                productImage: '',
                productDescription: '',
                productType: 1,
                productQuantity: 0
            });
        } 
        console.log(response.data);

    }

    const handleProductDeletion = async (e) => {
        const productId = e.target.parentElement.querySelector('p').textContent.split(' ')[1];
        const response = await axios.post('http://localhost:3001/delete-product', { productId });
        if (response.data.deletedCount > 0) {
            fetchProducts();
        } else {
            console.error('Failed to delete product');
        }

        console.log(response.data);
    }
    return (
        <div className="product-management-container">
            <div className="product-items-container">
                {products.map(product => (
                    <div key={product.productId} className="product-item">
                        <img src={product.productImage} alt={product.productName} />
                        <h2>{product.productName}</h2>
                        <p>ID: {product.productId}</p>
                        <p>Description: {product.productDescription}</p>
                        <p>Price: ${product.productPrice}</p>
                        <p>Type: {product.productType === 1 ? 'Crop' : 'Poultry'}</p>
                        <p>Quantity: {product.productQuantity}</p>
                        <button id='adminDeleteProductButton' onClick={handleProductDeletion}>Delete</button>
                    </div>
                ))}
            </div>

            <div className="product-form-container">
                <h2>Add New Product</h2>
                <form onSubmit={formSubmission} className="product-form">
                    <div>
                        <label>Product ID:</label>
                        <input
                            type="text"
                            name="productId"
                            value={formData.productId}
                            onChange={inputChanges}
                            required
                        />
                    </div>
                    <div>
                        <label>Product Name:</label>
                        <input
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={inputChanges}
                            required
                        />
                    </div>
                    <div>
                        <label>Product Image (URL):</label>
                        <input
                            type="text"
                            name="productImage"
                            value={formData.productImage}
                            onChange={inputChanges}
                            required
                        />
                    </div>
                    <div>
                        <label>Product Description:</label>
                        <textarea
                            name="productDescription"
                            value={formData.productDescription}
                            onChange={inputChanges}
                            required
                        />
                    </div>
                    <div>
                        <label>Product Price:</label>
                        <input
                            type="number"
                            name="productPrice"
                            value={formData.productPrice}
                            onChange={inputChanges}
                            required
                        />
                    </div>
                    <div>
                        <label>Product Type:</label>
                        <select
                            name="productType"
                            value={formData.productType}
                            onChange={inputChanges}
                            required
                        >
                            <option value="1">Crop</option>
                            <option value="2">Poultry</option>
                        </select>
                    </div>
                    <div>
                        <label>Product Quantity:</label>
                        <input
                            type="number"
                            name="productQuantity"
                            value={formData.productQuantity}
                            onChange={inputChanges}
                            required
                        />
                    </div>
                    <button type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
}
