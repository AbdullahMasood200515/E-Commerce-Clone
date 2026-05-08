import { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Create the Context
const CartContext = createContext();

// Create a Provider Component
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const handleAddToCart = useCallback((product) => {
        setCartItems((prev) => {
            const existingItemIndex = prev.findIndex((item) => item.id === product.id);
            if (existingItemIndex !== -1) {
                const newCart = [...prev];
                newCart[existingItemIndex] = { 
                    ...newCart[existingItemIndex], 
                    quantity: newCart[existingItemIndex].quantity + 1 
                };
                return newCart;
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }, []);

    const handleRemoveFromCart = useCallback((productId) => {
        setCartItems((prev) => {
            const existingItemIndex = prev.findIndex((item) => item.id === productId);
            if (existingItemIndex === -1) return prev;
            
            const newCart = [...prev];
            if (newCart[existingItemIndex].quantity > 1) {
                newCart[existingItemIndex] = { 
                    ...newCart[existingItemIndex], 
                    quantity: newCart[existingItemIndex].quantity - 1 
                };
                return newCart;
            }
            // Remove completely if quantity is 1
            return newCart.filter(item => item.id !== productId);
        });
    }, []);

    const handleClearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    // Calculate total items in cart
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const value = {
        cartItems,
        cartCount,
        handleAddToCart,
        handleRemoveFromCart,
        handleClearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

// Custom hook to use the Cart Context easily
export function useCart() {
    return useContext(CartContext);
}
