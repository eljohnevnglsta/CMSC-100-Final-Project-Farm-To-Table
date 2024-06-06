export default function ProductCard(props) {
    const product = props.product;
    const quantity = product.productQuantity;
    const isOutOfStock = quantity === 0;
    return (
        (isOutOfStock ? 
            <div className="card-grayed-out">
                <div className="card-content">
                    <img src={product.productImage} alt={product.productName} />
                    <p className="PCProductName">{product.productName}</p>

                    <p>{product.productDescription}</p>
                    <p>{product.productPrice}</p>
                    <p>Out of Stock</p>
                </div>
            </div>
            :
            <div className="card">
                <div className="card-content">
                    <img src={product.productImage} alt={product.productName} />
                    <p className="PCProductName">{product.productName}</p>
                    <p>Stock: {product.productQuantity}</p>
                    <p>{product.productDescription}</p>
                    <p>${product.productPrice}</p>
                    <button onClick={() => props.addToCart(product)}>Add to Cart</button>
                </div>
            </div> 
        )
    );
}