import { createContext, useContext, useState, useEffect } from "react";
import all_product_data from "../data/all_product";

const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem("products");
        // We use the initial JS data only if no localStorage data exists
        return savedProducts ? JSON.parse(savedProducts) : all_product_data;
    });

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    const addProduct = (product) => {
        const newProduct = {
            ...product,
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
        };
        setProducts([...products, newProduct]);
    };

    const updateProduct = (id, updatedProduct) => {
        setProducts(products.map(p => p.id === id ? { ...updatedProduct, id } : p));
    };

    const deleteProduct = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    return useContext(ProductContext);
}
