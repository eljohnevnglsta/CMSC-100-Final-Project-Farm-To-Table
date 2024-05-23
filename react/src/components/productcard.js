export default function ProductCard(props) {
    const product = props.product;
    return (
        <div className="card">
            <div className="card-content">
                <img src={product.productImage} alt={product.productName} />
                <p className="PCProductName">{product.productName}</p>
                <p>{product.productDescription}</p>
                <p>{product.productPrice}</p>
                <button onClick={() => props.addToCart(product)}>Add to Cart</button>
            </div>
        </div>
    );
}