export default function CartItems(props) {
    const item = props.item;
    const updateQuantity = props.updateQuantity;
    const removeFromCart = props.removeFromCart;
    return (
        <div className="cartItem">
            <p className="productName">{item.productName}</p>
            <p className="productPrice">${item.productPrice.toFixed(2)}</p>
            <div className="cart-item-quantity">
                <button className="decrement-btn" onClick={() => updateQuantity(item.productId, -1)}>-</button>
                <div className="quantity">{item.quantity}</div>
                <button className="increment-btn" onClick={() => updateQuantity(item.productId, 1)}>+</button>
                <button className="remove-btn" onClick={() => removeFromCart(item.productId)}>X</button>
            </div>
            <div className="cartPrice">
                <p>${(item.quantity * item.productPrice).toFixed(2)}</p>
            </div>
        </div>
    );
}