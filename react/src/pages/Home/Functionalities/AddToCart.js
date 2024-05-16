export function addToCart(item, cartItems, setCartItems) {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
        const updatedCartItems = cartItems.map((cartItem, index) => {
            if (index === existingItemIndex) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
        });
        setCartItems(updatedCartItems);
    } else {
        const updatedCartItems = [...cartItems, { ...item, quantity: 1 }];
        setCartItems(updatedCartItems);
    }
    console.log(`Added ${item.name} to cart!`);
}