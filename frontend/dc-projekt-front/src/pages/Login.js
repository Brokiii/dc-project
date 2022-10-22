<<<<<<< HEAD
import { useState } from 'react';
=======
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
>>>>>>> c8ac754 (added style to login and insurance form view)
import '../css/login.css';



const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    }

    return (
        <div className="login-box">
            <br />
            <br />
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="user-box">
                    <input 
                        id="username"
                        type="text" 
                        value={user} 
                        onChange={(e) => setUser(e.target.value)}
                        required
                    />
                    <label htmlFor="username"> Nazwa użytkownika:</label>
                </div>
                <br /><br />
                <div className="user-box">
                    <input
                        type="password" 
                        id="password"
                        value={password}  
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    <label htmlFor="password"> Password:</label><br/><br/>
                </div>

                <div className="login-button-box">
                    <button className="button-login">Zaloguj</button>
                </div>
                <br/><br/>
            </form>
        </div>
    );
}

export default Login;