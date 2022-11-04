import { useState } from 'react';
import '../css/login.css';



const SignUp = () => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, checkPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

    }

    return (
        <div className="login-box">
            <br />
            <br />
            <h1>Rejestracja</h1>
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
                <br />
                <div className="user-box">
                    <input
                        type="password" 
                        id="repeatPassword"
                        value={repeatPassword}  
                        onChange={(e) => checkPassword(e.target.value)}
                        required
                        />
                    <label htmlFor="password"> Repeat password:</label><br/><br/>
                </div>

                <div className="login-button-box">
                    <button className="button-login">Zaloguj</button>
                </div>

                <br/><br/>
            </form>
        </div>
    );
}
export default SignUp;