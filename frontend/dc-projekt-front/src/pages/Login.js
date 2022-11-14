import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import useAuth from "../hooks/useAuth";
import '../css/login.css';

const Login = () => {

    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const jsonToSend = JSON.stringify({
            email,
            password,
        });
        console.log(jsonToSend);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: jsonToSend
        };
        try {
            await fetch("http://localhost:8081/api/user/login", requestOptions)
            .then(response => response.json())
            .then(data => {
                const token = data?.jwt;
                const email = data?.email; 
                const type = data?.accountType;
                localStorage.setItem('token', token);
                localStorage.setItem('email', email);
                localStorage.setItem('type', type);
                console.log(data);
                setAuth({ token: token, email: email, type:type})
            })
            navigate("/home");
            window.location.reload();
            setError(false);
        }
        catch (err) {
            setError(true);
        }
    }

    return (
        <div className="login-box">
            <br />
            <br />
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="user-box">
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="username"> Email:</label>
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
                    <label htmlFor="password"> Password:</label><br /><br />
                </div>
                {error ? <span>COULD NOT LOG IN</span> : <></>}
                <div className="login-button-box">
                    <button className="button-login">Zaloguj</button>
                </div>
                <br /><br />
            </form>
        </div>
    );
}

export default Login;