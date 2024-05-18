import { get } from "mongoose";
import Navbar from "../components/navbar"
import axios from 'axios';
import ProductCard from "../components/productcard";
import CartItems from "../components/cartitems";    
import "../stylesheets/Home.css";


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


const productList = await getProducts();
console.log(productList);


export default function Home(props) {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    
    //dummy cart only
    const cart = [
        {
            productId: "120",
            productName: "orange",
            productDescription: "fresh orange orange",
            productType: 1,
            productQuantity: 3,
            productPrice: 12,
            quantity: 3
        },
        {
            productId: "120",
            productName: "orange",
            productDescription: "fresh orange orange",
            productType: 1,
            productQuantity: 3,
            productPrice: 12,
            quantity: 3
        },
        {
            productId: "120",
            productName: "orange",
            productDescription: "fresh orange orange",
            productType: 1,
            productQuantity: 3,
            productPrice: 12,
            quantity: 3
        }
    ]

    return(
        <div>
            <Navbar links={navElements}/>
            <div id="home-profile-tab">
                <h2>Now Serving: </h2>
                <p>{userData.firstName + " " + (!userData.middleName ? " " : userData.middleName) + " " + userData.lastName}</p>
                <p>{userData.email}</p>
            </div>
            <div className="home-body">
                <div className="card-holder">
                    <h2>Products</h2>
                    <div className="products">
                        {productList.map((product) => {
                            return(
                                <ProductCard product={product}/>
                            )
                        })}
                    </div>
                </div>
                <div className="cart-holder">
                    <h2>Cart</h2>
                    <div className="cart-items">
                        {cart.map((item) => {
                            return(
                                <CartItems item={item} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

const navElements = [
    {title: "Orders", path: "/orders"},
    {title: "Profile", path: "/profile"}
]