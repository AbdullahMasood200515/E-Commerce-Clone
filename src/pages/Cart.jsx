import { Link } from "react-router-dom";
import Navbar from "../components/ui/Navbar/Navbar";
import { useCart } from "../context/CartContext";
import "../components/style/Cart.css";
import { FaArrowLeft } from "react-icons/fa6";

function Cart() {
    const { cartItems, handleAddToCart, handleRemoveFromCart, cartCount } = useCart();

    const SHIPPING_FEE = 250;

    const subtotal = cartItems.reduce((total, item) => total + (item.new_price * item.quantity), 0);
    const total = subtotal > 0 ? subtotal + SHIPPING_FEE : 0;

    return (
        <div className="cart-page-container">
            <Navbar />

            <div className="cart-content">
                <div className="cart-left">
                    <Link to="/" className="cart-back-btn" style={{ textDecoration: "none" }}>
                        <FaArrowLeft /> Back
                    </Link>
                    <h2 className="cart-title">Shopping Cart</h2>

                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <p>Your cart is empty.</p>
                            <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
                        </div>
                    ) : (
                        <div className="cart-items-list">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-img">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="cart-item-details">
                                        <h3>{item.name}</h3>
                                        <p className="cart-item-category">{item.category}</p>
                                        <p className="cart-item-price">${item.new_price}</p>
                                    </div>
                                    <div className="cart-item-actions">
                                        <div className="cart-quantity-controls">
                                            <button className="cart-qty-btn" onClick={() => handleRemoveFromCart(item.id)}>-</button>
                                            <span className="cart-qty-value">{item.quantity}</span>
                                            <button className="cart-qty-btn" onClick={() => handleAddToCart(item)}>+</button>
                                        </div>
                                        <p className="cart-item-total">${(item.new_price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="cart-right">
                    <div className="order-summary">
                        <h2>Order Summary</h2>

                        <div className="summary-row">
                            <span>Subtotal ({cartCount} items)</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping Fee</span>
                            <span>${subtotal > 0 ? SHIPPING_FEE.toFixed(2) : "0.00"}</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row total-row">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <Link to="/checkout" className={`checkout-btn ${cartItems.length === 0 ? 'disabled' : ''}`}>
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
