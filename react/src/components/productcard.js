export default function ProductCard(props) {
    const product = props.product;
    return (
        <div className="product-card">
            <img src={product.productImage} alt={product.productName}/>
            <p>{product.productName}</p>
            <p>{product.productDescription}</p>
            <p>{product.productPrice}</p>
            <button>Add to Cart</button>
        </div>
    )
}