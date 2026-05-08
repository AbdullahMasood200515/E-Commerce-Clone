import React, { useState } from 'react';
import { useProducts } from "../../../context/ProductContext";
import ProductCard from "../ProductCard/ProductCard";
import Pagination from "../Pagination/Pagination";
import "./ProductList.css";

const ProductList = React.memo(function ProductList({ cartItems, onProductClick, onAddToCart, onRemoveFromCart }) {
    const { products } = useProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Pagination Logic
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <section className="product-list-section">
            <h2 className="product-list-title">Our Products</h2>
            <p className="product-list-subtitle">Browse our latest collection</p>

            <div className="product-grid">
                {currentProducts.map((product) => (
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

            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
            />
        </section>
    )
});

export default ProductList;