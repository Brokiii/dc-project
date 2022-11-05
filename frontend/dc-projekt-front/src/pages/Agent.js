// import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
// import { useRef, useState, useEffect } from 'react';
import { useState } from 'react';
import Select from 'react-select'
import '../css/client.css';

import {
    Container,
    Typography,
    makeStyles,
  } from "@material-ui/core";



const options = [
{ value: 'Polisa 1', label: 'Polisa 1', price: 2.0 },
{ value: 'Polisa 2', label: 'Polisa 2', price: 5.0 },
{ value: 'Polisa 3', label: 'Polisa 3', price: 6.0 }
]

const handleChange = async (option) => {
    console.log(option);
}

const polises = [
    { value: 'Polisa 1331', label: 'Polisa 1331', price: 2.0 },
    { value: 'Polisa 1332', label: 'Polisa 1332', price: 5.0 },
    { value: 'Polisa 1333', label: 'Polisa 1333', price: 6.0 }
]

const destroyers = [
    { value: 'Zgloszenie szkody 231', label: 'Zgloszenie szkody 231', price: 2.0 },
    { value: 'Zgloszenie szkody 233', label: 'Zgloszenie szkody 232', price: 5.0 },
    { value: 'Zgloszenie szkody 233', label: 'Zgloszenie szkody 233', price: 6.0 }
]


const useStyles = makeStyles(({
    root: {
        fontFamily: '"Nunito Sans", sans-serif',
        backgroundColor: "#6f6e6f",
        position: "justify",
        padding: '80px',
        boxShadow: "0 15px 25px rgba(11, 11, 11, 0.7)",
        borderRadius: "10px",
    },
    section: {
        backgroundColor: "lightGrey",
        position: "justify",
        height: '200px',
        width: 'auto',
        margin: '50px',
        borderRadius: '10px',
        fontSize: "25px",
    },
    tab: {
      display: "inline-block",
      marginLeft: "20px",
  },
  }));

const Agent = () => {

    const classes = useStyles();
    
    const [fortune1, setFortune1] = useState('');
    const [fortune2, setFortune2] = useState('');
    const [fortune3, setFortune3] = useState('');
    const [reghisid, setRegHisId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    }

    return (
        <Container fixed className={classes.root}>
            <Typography style={{fontFamily:'"Nunito Sans", sans-serif', fontSize: "40px", textAlign: "center"}}>
             <h3>AGENT</h3>
            </Typography>
            
            <Container fixed className={classes.section} style={{ width:"1100px" , height:"800px" }} >
                <h2>Polisy Ubezpieczeniowe</h2>

                <div className="client-box" style={{ width:"800px", height:"650px"  }}>
                    <h3 style={{fontFamily:'"Nunito Sans", sans-serif', fontSize: "25px", textAlign: "center"}}>Nowe polisy</h3>

                    <Select options={polises} onChange={handleChange} />
                    <br/>
                    <form onSubmit={handleSubmit}>
                        <div class="user-box">
                            <input 
                                id="fortune1name"
                                type="text" 
                                value="Jan Kowalski" 
                                onChange={(e) => setFortune1(e.target.value)}
                                required
                            />
                            <label htmlFor="username"> Klient:</label>
                        </div>
                        <div class="user-box">
                            <input 
                                id="fortune1name"
                                type="text" 
                                value="Lmaborghini Huracan" 
                                onChange={(e) => setFortune1(e.target.value)}
                                required
                            />
                            <label htmlFor="username"> Przedmiot:</label>
                        </div>

                        <div class="user-box">
                            <input 
                                id="fortune1name"
                                type="text" 
                                value="Larger" 
                                onChange={(e) => setFortune1(e.target.value)}
                                required
                            />
                            <label htmlFor="username"> Rodzaj polisy:</label>
                        </div>
                        
                        <div className="client-button-box">
                            <button className="button-client">Weryfikuj</button>
                        </div>

                        <div className="client-button-box">
                            <button className="button-client">Akceptuj</button>
                        </div>

                        <br/><br/>
                    </form>
                </div>
            
            </Container>

            <Container fixed className={classes.section} style={{ width:"1100px", height:"900px"}} >
                <h2>Polisa ubezpieczeniowa</h2>
                <div className="client-box" style={{ width:"800px", height:"780px", position:"center", backgroundColor:"rgb(36,200,73)" }}>
                    <h3 style={{fontFamily:'"Nunito Sans", sans-serif', fontSize: "25px", textAlign: "center"}}>Nowe polisy</h3>

                    <Select options={destroyers} onChange={handleChange} />
                    <br/>
                    <form onSubmit={handleSubmit}>
                        <div class="user-box">
                            <input 
                                id="fortune1name"
                                type="text" 
                                value="Jan Kowalski" 
                                onChange={(e) => setFortune1(e.target.value)}
                                required
                            />
                            <label htmlFor="username"> Klient:</label>
                        </div>
                        <div class="user-box">
                            <input 
                                id="fortune1name"
                                type="text" 
                                value="Lmaborghini Huracan" 
                                onChange={(e) => setFortune1(e.target.value)}
                                required
                            />
                            <label htmlFor="username"> Przedmiot:</label>
                        </div>

                        <div class="user-box">
                            <input 
                                id="fortune1name"
                                type="text" 
                                value="Larger" 
                                onChange={(e) => setFortune1(e.target.value)}
                                required
                            />
                            
                            <label htmlFor="username"> Rodzaj polisy:</label>
                        </div>

                        <div class="user-box">
                            <input 
                                id="fortune1name"
                                type="text" 
                                value="Pęknięty wał korbowy" 
                                onChange={(e) => setFortune1(e.target.value)}
                                required
                            />
                            <br/>
                            <label htmlFor="username" > Opis szkody:</label>
                        </div>
                        
                        <div className="client-button-box">
                            <button className="button-client">Weryfikuj</button>
                        </div>

                        <div className="client-button-box">
                            <button className="button-client">Akceptuj</button>
                        </div>

                        <br/><br/>
                    </form>
                </div>

            </Container>

            <Container fixed className={classes.section} style={{ height:"450px" }}>
                <h2>Wskazówki systemu</h2>

                <div className="client-box" style={{ width:"800px", height:"300px", position:"center", backgroundColor:"rgb(36,73,200)" }}>
                    <h3 style={{fontFamily:'"Nunito Sans", sans-serif', fontSize: "25px", textAlign: "center"}}>Porada</h3>
                    <form onSubmit={handleSubmit}>
                        <div class="user-box">
                            <input 
                                id="reghisid"
                                type="text" 
                                value="Wypłać pieniądze z ubezpieczenia" 
                                onChange={(e) => setRegHisId(e.target.value)}
                                required
                            />
                            
                        </div>
                        
                        <div className="client-button-box">
                            <button className="button-client">Wykonaj</button>
                        </div>

                        <br/><br/>
                    </form>
                </div>
            </Container>

        </Container>
        
    );
}

export default Agent;