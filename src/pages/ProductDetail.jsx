import { RxCross2 } from "react-icons/rx";
import Buttons from "../components/ui/Buttons/Buttons";
import { useCart } from "../context/CartContext";
import "../components/style/ProductDetail.css";

function ProductDetail({ product, onClose }) {
    if (!product) return null;

    const { cartItems, handleAddToCart, handleRemoveFromCart } = useCart();

    const cartItem = cartItems?.find(item => item.id === product.id);

    return (
        <div className="detail-overlay" onClick={onClose}>
            <div className="detail-card" onClick={(e) => e.stopPropagation()}>
                <Buttons className="detail-close" onClick={onClose}>
                    <RxCross2 />
                </Buttons>

                <img className="detail-img" src={product.image} alt={product.name} />

                <div className="detail-content">
                    <h2 className="detail-title">{product.name}</h2>

                    <div className="detail-info-group">
                        <div className="detail-info-item">
                            <span className="info-label">Category:</span>
                            <span className="info-value">{product.category}</span>
                        </div>

                        <div className="detail-info-item">
                            <span className="info-label">Price:</span>
                            <span className="info-value price-highlight">${product.new_price}</span>
                        </div>

                        {product.old_price && (
                            <div className="detail-info-item">
                                <span className="info-label">Old Price:</span>
                                <span className="info-value price-strikethrough">${product.old_price}</span>
                            </div>
                        )}
                    </div>

                    {cartItem ? (
                        <div className="detail-quantity-controls">
                            <button className="detail-qty-btn" onClick={() => handleRemoveFromCart(product.id)}>-</button>
                            <span className="detail-qty-value">{cartItem.quantity}</span>
                            <button className="detail-qty-btn" onClick={() => handleAddToCart(product)}>+</button>
                        </div>
                    ) : (
                        <Buttons className="detail-add-btn" text="Add to Cart" onClick={() => {
                            handleAddToCart(product);
                            onClose();
                        }} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;