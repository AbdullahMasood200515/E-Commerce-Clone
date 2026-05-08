import logo from "../../../assets/logo.png"
import { IoCartSharp, IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
    const { cartCount } = useCart();
    const { currentUser, logout } = useAuth();
    const location = useLocation();
    const isAdminPage = location.pathname === "/admin";

    return (
        <nav className="navbar">
            <Link to="/" className="navbar__logo" style={{ textDecoration: 'none' }}>
                <img src={logo} alt="Shopara logo" />
                <span className="navbar__brand">Shopara</span>
            </Link>
            <div className="navbar__actions">
                <Link to={currentUser ? "/admin" : "/login"} className="admin-btn" style={{ textDecoration: 'none' }}>
                    Admin
                </Link>
                {!isAdminPage && (
                    <Link to="/cart" className="cart" style={{ textDecoration: 'none' }}>
                        <IoCartSharp />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                )}
                <div className="profile">
                    <CgProfile />
                    <p>{currentUser ? currentUser.username : "Guest"}</p>
                </div>
                {currentUser && (
                    <button className="logout-btn" onClick={logout}>Logout</button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;