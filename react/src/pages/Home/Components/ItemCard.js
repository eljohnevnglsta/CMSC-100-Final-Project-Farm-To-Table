import React from 'react';
import { addToCart } from '../Functionalities/AddToCart';

export default function ItemCard(props){
    let alter = "Photo of " + props.name;

    const handleClick = () => {
        addToCart(props.item, props.cartItems, props.setCartItems); // Call addToCart with the necessary parameters
    };

    return (
        <div className="card">
            <div className="card-content">
                <img src={props.url} alt={alter}></img>
                <div>{props.name}</div>
                <div>${props.price}</div>
                {/* Call handleClick function on button click */}
                <button onClick={handleClick}> add to cart </button>
            </div>
        </div>
    )
}