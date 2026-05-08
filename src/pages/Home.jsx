import { useState, useCallback } from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import ProductList from "../components/ui/ProductList/ProductList";
import ProductDetail from "./ProductDetail";

function Home() {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = useCallback((product) => {
        setSelectedProduct(product);
    }, []);

    const handleCloseDetail = useCallback(() => {
        setSelectedProduct(null);
    }, []);

    return (
        <>
            <Navbar />
            <ProductList 
                onProductClick={handleProductClick} 
            />
            {selectedProduct && (
                <ProductDetail 
                    product={selectedProduct} 
                    onClose={handleCloseDetail} 
                />
            )}
        </>
    );
}

export default Home;