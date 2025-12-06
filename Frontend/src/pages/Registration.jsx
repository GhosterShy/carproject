import React, { useState } from "react";
import "../Styles/Auth.css";
import { useNavigate,Link } from 'react-router-dom';
import { useAuth } from "../components/AuthContext.jsx";

export default function RegisterPage() {
    const {register } = useAuth();

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await register(email, password, firstName, lastName, phone);

        if (result.success) {
            setMessage("Успешная регистрация");
            navigate('/');

        } else {
            alert(result.message);
        }
    };

    return (
        <div className="auth-wrapper">
        <div className="auth-box">
            <h2 className="auth-title">Registration</h2>

            <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-row">
                <input
                type="text"
                value={firstName}
                placeholder="First Name"
                className="auth-input"
                required
                onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                type="text"
                value={lastName}
                placeholder="Last Name"
                className="auth-input"
                required
                onChange={(e) => setLastName(e.target.value)}
                />
            </div>

            <input
                type="email"
                value={email}
                placeholder="Email"
                className="auth-input full"
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type="tel"
                value={phone}
                placeholder="Phone Number"
                className="auth-input full"
                onChange={(e) => setPhone(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input full"
                required
            />

            <button type="submit" className="auth-submit">
                Register
            </button>

            <Link style={{textAlign:'center'}} to={'/login'}>У вас есть аккаунт?</Link>


             {message && <p className="auth-message">{message}</p>}
            </form>
        </div>
        </div>
    );
}
