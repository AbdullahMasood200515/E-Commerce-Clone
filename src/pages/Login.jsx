import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/ui/Navbar/Navbar";
import Buttons from "../components/ui/Buttons/Buttons";
import Inputs from "../components/ui/Inputs/Inputs";
import Forms from "../components/ui/Forms/Forms";
import { useAuth } from "../context/AuthContext";
import adminData from "../data/admin_details.json";
import "../components/style/Login.css";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = () => {
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Check regular users
        const validUser = existingUsers.find(
            (user) => user.email === form.email && user.password === form.password
        );

        // Check admins
        const validAdmin = adminData.admins.find(
            (admin) => admin.email === form.email && admin.password === form.password
        );

        const authenticatedUser = validAdmin || validUser;

        if (authenticatedUser) {
            login(authenticatedUser);
            alert(`Welcome ${authenticatedUser.username}`);

            // Redirect based on role
            if (validAdmin) {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } else {
            alert("Wrong Email or Password");
        }

        setForm({
            email: "",
            password: ""
        });
    };

    return (
        <div className="login-page">
            <Navbar />
            <div className="login-container">
                <Forms onSubmit={handleSubmit} autoComplete="off" className="login-card">
                    <div className="login-header">
                        <h2>Admin Login</h2>
                    </div>
                    <input type="text" style={{ display: 'none' }} />
                    <input type="password" style={{ display: 'none' }} />

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Inputs
                            name="email"
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Inputs
                            name="password"
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" /> Remember me
                        </label>
                        <Link to="#" className="forgot-password">Forgot password?</Link>
                    </div>
                    <Buttons text="Log In" type="submit" className="login-btn" />
                    <div className="login-footer">
                        <p>Not an Admin? <Link to="/">Home</Link></p>
                    </div>
                </Forms>
            </div>
        </div>
    );
}

export default Login;
