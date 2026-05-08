import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/ui/Navbar/Navbar";
import { useCart } from "../context/CartContext";
import "../components/style/Checkout.css";

function Checkout() {
    const { cartItems, handleClearCart } = useCart();
    const navigate = useNavigate();

    const SHIPPING_FEE = 250;
    const subtotal = cartItems.reduce((total, item) => total + (item.new_price * item.quantity), 0);
    const total = subtotal > 0 ? subtotal + SHIPPING_FEE : 0;

    const handleConfirmOrder = () => {
        alert("Order Placed Successfully!");
        handleClearCart();
        navigate("/");
    };

    return (
        <div className="checkout-page-container">
            <Navbar />
            <div className="checkout-content">
                <h1 className="checkout-title">Checkout</h1>

                <div className="checkout-grid">
                    {/* Order Information */}
                    <div className="checkout-section">
                        <h2 className="checkout-section-title">Order Items</h2>

                        {cartItems.length === 0 ? (
                            <p className="empty-checkout-msg">Your cart is empty.</p>
                        ) : (
                            <div className="checkout-items-list">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="checkout-item">
                                        <div className="checkout-item-info">
                                            <img src={item.image} alt={item.name} className="checkout-item-img" />
                                            <div>
                                                <h4 className="checkout-item-name">{item.name}</h4>
                                                <p className="checkout-item-qty">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="checkout-item-price">${(item.new_price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <Link to="/cart" className="edit-cart-link">
                            Edit Cart
                        </Link>
                    </div>

                    {/* Summary & Confirm */}
                    <div className="checkout-section">
                        <h2 className="checkout-section-title">Order Summary</h2>

                        <div className="checkout-summary-list">
                            <div className="summary-item">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-item">
                                <span>Shipping</span>
                                <span>${subtotal > 0 ? SHIPPING_FEE.toFixed(2) : "0.00"}</span>
                            </div>
                            <div className="summary-item-divider"></div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleConfirmOrder}
                            disabled={cartItems.length === 0}
                            className="confirm-order-btn"
                        >
                            Confirm Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
