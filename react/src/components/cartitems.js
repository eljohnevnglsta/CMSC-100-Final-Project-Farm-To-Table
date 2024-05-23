export default function CartItems(props) {
    const item = props.item;
    return (
        <div className="cartItem">
            <p>{item.productName}</p>
            <p>{item.productPrice}</p>
            <div className="cart-item-quantity">
                <button className="decrement-btn" onClick={() => props.updateQuantity(item.productId, -1)}>-</button>
                <div>{item.quantity}</div>
                <button className="increment-btn" onClick={() => props.updateQuantity(item.productId, 1)}>+</button>
                <button className="remove-btn" onClick={() => props.removeFromCart(item.productId)}>Remove</button>
            </div>
            <div className="cartPrice"><p>{item.quantity * item.productPrice}</p></div>
        </div>
    );
}