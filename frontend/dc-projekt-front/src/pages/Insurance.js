import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import React from 'react'
import Select from 'react-select'


const Insurance = () => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [pesel, setPesel] = useState('');
    const [insuranceType, setInsuranceType] = useState(null);
    const [price, setPrice] = useState(0);

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
    }

    return (
        <div className="form">
            <h1>Nowe ubezpieczenie</h1>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <label htmlFor="name"> Imie użytkownika:
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label><br /><br />
                <label htmlFor="surname">Nazwisko:
                    <input
                        id="surname"
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                    />
                </label><br /><br />
                <label htmlFor="surname">Pesel:
                    <input
                        id="pesel"
                        type="text"
                        value={pesel}
                        onChange={(e) => setPesel(e.target.value)}
                        required
                    />
                </label><br /><br />
                <Select options={options} onChange={handleChange} />
                <br /><br />
                <label htmlFor="surname">Cena:{price}
                </label><br /><br />
                <button>Kup</button>
            </form>
        </div>
    );
}

export default Insurance;