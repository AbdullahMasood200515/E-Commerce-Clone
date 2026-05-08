// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/ui/Navbar/Navbar";
// import Buttons from "../components/ui/Buttons/Buttons";
// import Inputs from "../components/ui/Inputs/Inputs";
// import Forms from "../components/ui/Forms/Forms";
// import "../components/style/Signup.css";

// function Signup() {
//     const navigate = useNavigate();
//     const [form, setForm] = useState({
//         username: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm({ ...form, [name]: value });
//     };

//     const handleSubmit = () => {
//         if (form.password !== form.confirmPassword) {
//             alert("Passwords do not match");
//             return;
//         }

//         const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

//         const checkEmail = existingUsers.find((user) => user.email === form.email);

//         if (checkEmail) {
//             alert("Email already registered!");
//             return;
//         }

//         const newUser = {
//             username: form.username,
//             email: form.email,
//             password: form.password
//         };

//         const updateUsers = [...existingUsers, newUser];

//         localStorage.setItem("users", JSON.stringify(updateUsers));

//         setForm({
//             username: "",
//             email: "",
//             password: "",
//             confirmPassword: ""
//         });

//         alert("Account Created!");
//         navigate("/login");
//     };

//     return (
//         <div className="signup-page">
//             <Navbar />
//             <div className="signup-container">
//                 <Forms onSubmit={handleSubmit} autoComplete="off" className="signup-card">
//                     {/* Hidden inputs to prevent browser autofill issues */}
//                     <input type="text" style={{ display: 'none' }} />
//                     <input type="password" style={{ display: 'none' }} />
//                     <div className="signup-header">
//                         <h2>Create Account</h2>
//                         <p>Join us today! Please enter your details.</p>
//                     </div>


//                     <div className="form-group">
//                         <label htmlFor="username">Username</label>
//                         <Inputs
//                             name="username"
//                             placeholder="Enter Username"
//                             value={form.username}
//                             onChange={handleChange}
//                             autoComplete="off"
//                             required
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="email">Email</label>
//                         <Inputs
//                             name="email"
//                             type="email"
//                             placeholder="Enter Email"
//                             value={form.email}
//                             onChange={handleChange}
//                             autoComplete="off"
//                             required
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="password">Password</label>
//                         <Inputs
//                             name="password"
//                             type="password"
//                             placeholder="••••••••"
//                             value={form.password}
//                             onChange={handleChange}
//                             autoComplete="new-password"
//                             required
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="confirmPassword">Confirm Password</label>
//                         <Inputs
//                             name="confirmPassword"
//                             type="password"
//                             placeholder="••••••••"
//                             value={form.confirmPassword}
//                             onChange={handleChange}
//                             autoComplete="new-password"
//                             required
//                         />
//                     </div>

//                     <Buttons text="Signup" type="submit" className="signup-btn" />
//                     <div className="signup-footer">
//                         <p>Already have an account? <Link to="/login">Login</Link></p>
//                     </div>
//                 </Forms>
//             </div>
//         </div >
//     );
// }

// export default Signup;
