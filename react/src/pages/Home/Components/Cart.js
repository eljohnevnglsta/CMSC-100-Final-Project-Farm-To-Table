
export default function Cart(props) {
    let itemArray = props.data; 
    const totalDue = props.data.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleDelete = (itemId) => {
        const updatedCartItems = props.data.filter(item => item.id !== itemId); //this will return a new array that shall not include the matching id
        props.setCartItems(updatedCartItems);
    };

    return (
    <div>
        <div className="cartHolders">
            <div className="totalDue">
                <div className="totalItems">Cart Summary</div>
                <div>Total: {props.data.length}</div>
                Total Due: ${totalDue.toFixed(2)}
                <br/><button type="submit" class="checkout" >CHECKOUT</button>
            </div>  
        </div>
        <div className="cartHolder">
            <div className="totalItems">Shopping Cart</div>
            <div className="itemList">
                {itemArray.map(item => (
                <div key={item.id} className="cartItem">
                    <img src={item.url} alt={item.name} />                   
                    <div className="details">
                        <div>{item.name}</div>
                        <div className="subtotal">${item.price}</div>
                    </div>    
                        <div className="quantity"> QTY: {item.quantity}</div>
                        <div className="price">${(item.price * item.quantity).toFixed(2)}</div>
                        <br/>
                        <button onClick={() => handleDelete(item.id)}>remove</button>
                </div>
                ))}
        </div>
    </div>
    </div>
    );
}
