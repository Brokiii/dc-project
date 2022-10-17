import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';


const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    }
        

    return (
        <div className="form">
            <h1>Login</h1>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <label htmlFor="username"> Nazwa użytkownika:
                <input 
                    id="username"
                    type="text" 
                    value={user} 
                    onChange={(e) => setUser(e.target.value)}
                    required
                />
                </label><br /><br />
                <label htmlFor="password"> Password:
                <input
                    type="password" 
                    id="password"
                    value={password}  
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </label><br/><br/>
                <br/><br/>
                <button>Zaloguj</button>
            </form>
        </div>
    );
}

export default Login;