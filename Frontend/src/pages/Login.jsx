import React, { useState } from "react";
import "../Styles/Auth.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../components/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function LoginPage() {

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);

    if (result.success) {
        setMessage("Успешный вход");
        navigate('/');

    } else {
        alert(result.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2 className="auth-title">Login</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-row">
            
           

          <input
            type="email"
            placeholder="Email"
            value={email}
            className="auth-input full"
            onChange={(e) => setEmail(e.target.value)}
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
      </div>

          <button type="submit" className="auth-submit">
      Login
          </button>


          <Link style={{textAlign:'center'}} to={'/register'}>У вас нет аккаунта?</Link>
        </form>
      </div>
    </div>
  );
}
