import Navbar from "../components/navbar"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from "../components/productcard";
import CartItems from "../components/cartitems";    
import "../stylesheets/Home.css";
import { set } from "mongoose";


const getProducts = async () => {
    const url = 'http://localhost:3001/show-all-product';
    var products = [];
    try {
        const response = await axios.post(url);
        products = response.data;
    } catch (error) {
        console.error('Error:', error);
    }
    return products;
}

export const getUserData = async (email) => {
    const url = 'http://localhost:3001/get-user-by-email';
    var user = {};
    try {
        const response = await axios.post(url, {email: email});
        user = response.data;
    } catch (error) {
        console.error('Error:', error);
    }
    return user;

}

const saveCart = async (email, cart) => {
    const url = 'http://localhost:3001/update-cart';
    try {
        const response = await axios.post(url, {email: email, shoppingCart: cart});
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

const checkout = async (email) => {
    const url = 'http://localhost:3001/checkout';
    try {
        const response = await axios.post(url, {email: email});
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

export default function Home(props) {

    const email = JSON.parse(localStorage.getItem('user'));
    const [productList, setProductList] = useState([]);
    const [initialCart, setInitialCart] = useState([]);
    const [userData, setUserData] = useState({});

    var products = [];
    var user = {};
    useState(() => {
        async function fetchData() {
            //get data from API
            products = await getProducts();
            user = await getUserData(email);

            //move out of stock products to the end of array
            const outOfStock = products.filter(product => product.productQuantity === 0);
            const inStock = products.filter(product => product.productQuantity > 0);
            setProductList([...inStock, ...outOfStock]);
            
            //set initial cart and user data
            setInitialCart(user.shoppingCart);
            setUserData(user);
        }
        fetchData();
    });

    const [cart, setCart] = useState(initialCart);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.productId === product.productId);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.productId === product.productId ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const updateQuantity = (productId, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.productId === productId ? { ...item, quantity: Math.max(item.quantity + quantity, 1) } : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
    };

    function handleSorting() {
        const holder = productList
        const name = document.querySelector('#name').value;
        const price = document.querySelector('#price').value;
        const category = document.querySelector('#category').value;

        var sortedProducts = productList;

        if (name !== 'none') {
            sortedProducts = sortedProducts.sort((a, b) => {
                if (name === 'asc') {
                    return a.productName.localeCompare(b.productName);
                } else {
                    return b.productName.localeCompare(a.productName);
                }
            });
        }

        if (price !== 'none') {
            sortedProducts = sortedProducts.sort((a, b) => {
                if (price === 'asc') {
                    return a.productPrice - b.productPrice;
                } else {
                    return b.productPrice - a.productPrice;
                }
            });
        }

        if (category !== 'all') {
            sortedProducts = sortedProducts.filter(product => product.productType === (category === 'poultry' ? 2 : 1));
        } else {
            sortedProducts = products;
        }

        setProductList(sortedProducts);
    }

    return (
        <div id="home-root">
            <Navbar links={navElements} />
            <div className="home-body">
                <div className="cardsHolder">
                    <div className="sort-options">
                        <p>Name:</p>
                        <div className="button-group">
                            <select defaultValue="none" id="name">
                                <option value="none">Select</option>
                                <option value="asc">ASC</option>
                                <option value="low">DESC</option>
                            </select>
                        </div>
                        <p>Price:</p>
                        <div className="button-group">
                            <select defaultValue="none" id="price">
                                <option value="none">Select</option>
                                <option value="asc">ASC</option>
                                <option value="low">DESC</option>
                            </select>
                        </div>
                        <p>Category:</p>
                        <select defaultValue="all" id="category">
                            <option value="all">All</option>
                            <option value="poultry">Poultry</option>
                            <option value="dairy">Crop</option>
                        </select>
                        <button id="home-show-all" onClick={handleSorting}>APPLY</button>
                    </div>
                    <div className="products">
                        {productList.map((product) => (
                            <ProductCard key={product.productId} product={product} addToCart={addToCart} />
                        ))}
                    </div>
                </div>
                <div className="cartHolder">
                    <h2>CART</h2>
                    <div className="cart-items">
                        {cart.map((item) => (
                            <CartItems
                                key={item.productId}
                                item={item}
                                updateQuantity={updateQuantity}
                                removeFromCart={removeFromCart}
                            />
                        ))}
                    </div>
                    <button id="checkout-btn" onClick={() => {checkout(email); setCart([])}}>Checkout</button>
                    <button id="save-cart" onClick={() => saveCart(email, cart)}>Save Current Cart</button>
                </div>  
            </div>
        </div>
    );
} 

const navElements = [
    {title: "Orders", path: "/orders"},
    {title: "Profile", path: "/profile"}
]