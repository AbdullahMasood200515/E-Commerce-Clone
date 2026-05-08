import React from 'react';
import { useProducts } from "../../../context/ProductContext";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

const ProductList = React.memo(function ProductList({ cartItems, onProductClick, onAddToCart, onRemoveFromCart }) {
    const { products } = useProducts();

    return (
        <section className="product-list-section">
            <h2 className="product-list-title">Our Products</h2>
            <p className="product-list-subtitle">Browse our latest collection</p>

            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        cartItems={cartItems}
                        onProductClick={onProductClick}
                        onAddToCart={onAddToCart}
                        onRemoveFromCart={onRemoveFromCart}
                    />
                ))}
            </div>
        </section>
    )
});

export default ProductList;