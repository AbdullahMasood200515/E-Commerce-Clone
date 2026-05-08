import React from 'react';
import Buttons from "../Buttons/Buttons";
import { useCart } from "../../../context/CartContext";
import "./ProductCard.css";

const ProductCard = React.memo(function ProductCard({ product, onProductClick }) {
    const { cartItems, handleAddToCart, handleRemoveFromCart } = useCart();

    const cartItem = cartItems?.find(item => item.id === product.id);

    return (
        <div className="product-card" onClick={() => onProductClick(product)}>

            <div className="product-img">
                <img src={product.image} alt={product.name} />
            </div>

            <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="category">{product.category}</p>

                <p className="product-price">${product.new_price}</p>
                <p className="old-price">${product.old_price}</p>
            </div>

            {cartItem ? (
                <div className="quantity-controls" onClick={(e) => e.stopPropagation()}>
                    <button className="qty-btn" onClick={() => handleRemoveFromCart(product.id)}>-</button>
                    <span className="qty-value">{cartItem.quantity}</span>
                    <button className="qty-btn" onClick={() => handleAddToCart(product)}>+</button>
                </div>
            ) : (
                <Buttons
                    text="Add to Cart"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                    }}
                />
            )}

        </div>
    );
});

export default ProductCard;