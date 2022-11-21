import '../css/insurance.css';
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import React from 'react'
import Select from 'react-select'
import useAuth from "../hooks/useAuth";



const SignUp = () => {

    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const [login, setLogin] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [accountType, setAccountType] = useState(null);
    const [goodPass, setGoodPass] = useState(false);
    const [error, setError] = useState(false);

    const options = [
        { value: 'agent', label: 'AGENT'},
        { value: 'client', label: 'KLIENT'}
    ]

    const handleChange = async (option) => {
        setAccountType(option.value);
    }

    const checkPassword = async (repeatPassword) => {
        if (repeatPassword === password && password !== "") {
            setGoodPass(true);
        }
        else {
            setGoodPass(false);
        }
        console.log(auth?.token);
    }

    useEffect(() => {
        checkPassword(repeatPassword)
    }, [repeatPassword, password])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (goodPass === true) {
            const jsonToSend = JSON.stringify({
                login,
                name,
                surname,
                email,
                password,
                accountType: "agent"
            });
            console.log(jsonToSend);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: jsonToSend
            };
            try {
                await fetch("http://localhost:8081/api/user/register", requestOptions).then(response =>
                response.json());
                setError(false);
                navigate("/home");
                window.location.reload();
            }
            catch (err) {
                setError(true);
            }
        }
        else {
            setError(true);
        }
    }

    return (
        <div className="insurance-box">
            <br />
            <br />
            <h1>Rejestracja</h1>
            <form onSubmit={handleSubmit}>
                <div class="user-box">
                    <label htmlFor="login"> Login:</label>
                    <input
                        type="text"
                        id="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>
                <div class="user-box">
                    <label htmlFor="name"> Imię:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div class="user-box">
                    <label htmlFor="surname"> Nazwisko:</label>
                    <input
                        type="text"
                        id="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                    />
                </div>
                <div class="user-box">
                    <label htmlFor="email"> Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="user-box">
                    <label htmlFor="password"> Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <br />
                <div className="user-box">
                    <label htmlFor="password"> Repeat password:</label>
                    <input
                        type="password"
                        id="repeatPassword"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                    />
                </div>
                {goodPass ? <span style={{ color: "green", backgroundColor: "white" }}>Passwords are the same</span> : <span style={{ color: "red", backgroundColor: "white" }}>Not the same passwords</span>}
                <br />
                <br />
                <br />
                <label class="label-insurance"> Typ konta:</label>
                <Select options={options} onChange={handleChange} />
                <div className="insurance-button-box">
                    <button className="button-insurance">Zarejestruj się</button>
                </div>
                {error ? <span style={{ color: "red", backgroundColor: "white" }}>Could not buy</span> : <span></span>}
            </form>
        </div>
    );
}

export default SignUp;