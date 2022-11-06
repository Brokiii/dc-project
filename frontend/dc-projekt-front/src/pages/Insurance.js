import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import React from 'react'
import Select from 'react-select'
import '../css/insurance.css';

const Insurance = () => {

    const [login, setLogin] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [insuranceType, setInsuranceType] = useState(null);
    const [price, setPrice] = useState(0);
    const [goodPass, setGoodPass] = useState(false);

    const options = [
        { value: 'Lager', label: 'Lager', price: 2.0 },
        { value: 'Porter', label: 'Porter', price: 5.0 },
        { value: 'Ipa', label: 'Ipa', price: 6.0 }
    ]

    const handleChange = async (option) => {
        console.log(option);
        setPrice(option.price);
        setInsuranceType(option.value);
    }

    const checkPassword = async (repeatPassword) => {
        if (repeatPassword === password && password !== "") {
            setGoodPass(true);
        }
        else {
            setGoodPass(false);
        }
    }

    useEffect(() => {
        checkPassword(repeatPassword)
    }, [repeatPassword, password])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const jsonToSend = JSON.stringify({
            name,
            surname,
            email,
            password,
            accountType:"client"
        });
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: jsonToSend
        };
        fetch("http://localhost:8080/register", requestOptions)
            .then(response => response.json())

    }

    return (
        <div className="insurance-box">
            <h1>Nowe ubezpieczenie</h1>
            <br />
            <br />
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
                {goodPass ? <span style={{ color: "green",backgroundColor:"white" }}>Passwords are the same</span> : <span style={{ color: "red",backgroundColor:"white" }}>Not the same passwords</span>}
                <br />
                <label class="label-insurance"> Typ ubezpieczenia:</label>
                <Select options={options} onChange={handleChange} />
                <label class="label-price">Cena:{price} zł</label>
                <br />
                <div className="insurance-button-box">
                    <button className="button-insurance">Kup</button>
                </div>
            </form>
        </div>
    );
}

export default Insurance;