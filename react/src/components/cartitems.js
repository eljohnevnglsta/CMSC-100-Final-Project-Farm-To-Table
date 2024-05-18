export default function CartItems(props) {
    const item = props.item;
    return (
        <div className="cart-item">
            <p>{item.productName}</p>
            <p>{item.productPrice}</p>
            <div className="cart-item-quantity">
                <button>-</button>
                <div>{item.quantity}</div>
                <button>+</button>
                <button>Remove</button>
            </div>
            <p>{item.quantity * item.productPrice}</p>
        </div>
    )
}