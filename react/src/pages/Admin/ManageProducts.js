import { useEffect, useState } from 'react';
import '../../stylesheets/Admin/ProductManagement.css';
import axios from 'axios';
import rootbg from '../../images/root-img.jpg';

export default function ProductManagement() {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [formData, setFormData] = useState({
        productId: '',
        productName: '',
        productImage: '',
        productDescription: '',
        productPrice: 0,
        productType: 1, // default to 'Crop'
        productQuantity: 0
    });
    const [filter, setFilter] = useState('all');
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUsers();
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        fetch('http://localhost:3001/show-all-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, 
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                // Check if the response status is 401 (Unauthorized)
                if (response.status === 401) {
                    // Handle unauthorized access
                    localStorage.removeItem('user');
                    localStorage.removeItem('type');
                    window.location.href = '/login';
                }
                // Throw an error to be caught in the catch block
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // If the response is ok, parse it as JSON
            return response.json();
        })
        .then(body => {
            setProducts(body);
            setTotalProducts(body.length);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
    };
    

    const inputChanges = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const formSubmission = async (e) => {
        e.preventDefault();
        const url = isEditing ? 'http://localhost:3001/update-product' : 'http://localhost:3001/add-product';
        const response = await axios.post(url, formData, {withCredentials: true, credentials: 'include'});
        if (response.data.inserted || response.data.updated) {
            fetchProducts();
            resetForm();
        }
        console.log(response.data);
    };
    
    const fetchUsers = () => {
        fetch('http://localhost:3001/show-all-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                // Check if the response status is 401 (Unauthorized)
                if (response.status === 401) {
                    // Handle unauthorized access
                    localStorage.removeItem('user');
                    localStorage.removeItem('type');
                    window.location.href = '/login';
                }
                // Throw an error to be caught in the catch block
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // If the response is ok, parse it as JSON
            return response.json();
        })
        .then(body => {
            const customers = body.filter(user => user.userType === 'customer');
            setUsers(customers);
            setTotalUsers(customers.length);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            if (error.response.status === 401) {
                localStorage.removeItem('user');
                localStorage.removeItem('type');
                window.location.href = '/login';
            }
        });
    };

    const handleProductDeletion = async (e) => {
        const productId = e.target.parentElement.querySelector('p').textContent.split(' ')[1];
        const response = await axios.post('http://localhost:3001/delete-product', { productId }, {withCredentials: true, credentials: 'include'});
        if (response.data.deletedCount > 0) {
            fetchProducts();
        } else {
            console.error('Failed to delete product')
        }
        console.log(response.data);
    };

    const handleProductEdit = (product) => {
        setFormData(product);
        setShowForm(true);
        setIsEditing(true);
    };

    const resetForm = () => {
        setFormData({
            productId: '',
            productName: '',
            productImage: '',
            productDescription: '',
            productPrice: 0,
            productType: 1,
            productQuantity: 0
        });
        setShowForm(false);
        setIsEditing(false);
        fetchProducts();  //products are fetched when form is reset
    };

    const filteredProducts = filter === 'all' ? products : products.filter(product => product.productType === parseInt(filter));

    return (
        <div>
            <div className="product-management-container">
                <div class="h">
                    <h1><span>Manage</span> Products</h1>
                </div>

<div className="filter-add-container">
    <div className="filter-container">
        <div className="filter-buttons">
            <button className="add-product-button" onClick={() => {
                setShowForm(true);
                setIsEditing(false);
            }}>Add Product</button>
            <button className={`filter-button ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
            <button className={`filter-button ${filter === '1' ? 'active' : ''}`} onClick={() => setFilter('1')}>Crop</button>
            <button className={`filter-button ${filter === '2' ? 'active' : ''}`} onClick={() => setFilter('2')}>Poultry</button>
        </div>
    </div>
</div>

                
<div className={`product-form-overlay ${showForm ? 'show' : ''}`}>
    <div className="product-form-container">
        <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <div className="form-scroll-container"> {/*for scrolling*/}
            <form onSubmit={formSubmission} className="product-form">
                            <div>
                                <label>Product ID:</label>
                                <input
                                    type="text"
                                    name="productId"
                                    value={formData.productId}
                                    onChange={inputChanges}
                                    required
                                    disabled={isEditing}
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
                            <button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</button>
                            <button type="button" onClick={resetForm}>Close</button>
                            </form>
        </div>
    </div>
</div>

                <div className="product-items-container">
                    {filteredProducts.map(product => (
                        <div key={product.productId} className="product-item">
                            <img src={product.productImage} alt={product.productName} />
                            <h2>{product.productName}</h2>
                            <p>ID: {product.productId}</p>
                            <p>Description: {product.productDescription}</p>
                            <p>Price: ${product.productPrice}</p>
                            <p>Type: {product.productType === 1 ? 'Crop' : 'Poultry'}</p>
                            <p>Quantity: {product.productQuantity}</p>
                            <button className="adminEditProductButton" onClick={() => handleProductEdit(product)}>Edit</button>
                            <button id='adminDeleteProductButton' onClick={handleProductDeletion}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}