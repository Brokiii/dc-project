import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import React from 'react'
import Select from 'react-select'
import useAuth from "../hooks/useAuth";
import '../css/insurance.css';

const Insurance = () => {

    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [insuranceType, setInsuranceType] = useState(null);
    const [goodType, setGoodType] = useState("");
    const [price, setPrice] = useState(0);
    const [error, setError] = useState(false);

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const jsonToSend = JSON.stringify({
            goodType,
            insuranceType,
            email
        });
        console.log(jsonToSend);
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'JWT '+ localStorage.getItem("token")
            },
            body: jsonToSend
        };

        try {
            await fetch("http://localhost:8081/api/insurance", requestOptions)
                .then(response => response.json())
            setError(false);
            navigate("/home");
            window.location.reload();
        }
        catch (err) {
            setError(true);
        }



    }

    return (
        <div className="insurance-box">
            <h1>Nowe ubezpieczenie</h1>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <label class="label-insurance"> Typ dobra:</label>
                <br/>
                <input
                value={goodType}
                onChange={(e) => setGoodType(e.target.value)}
                />
                <br/>
                <label class="label-insurance"> Typ ubezpieczenia:</label>
                <Select options={options} onChange={handleChange} />
                <label class="label-price">Cena:{price} zł</label>
                <br />
                <div className="insurance-button-box">
                    <button className="button-insurance">Kup</button>
                </div>
                {error ? <span style={{ color: "red", backgroundColor: "white" }}>Could not buy</span> : <span></span>}
            </form>
        </div>
    );
}

export default Insurance;