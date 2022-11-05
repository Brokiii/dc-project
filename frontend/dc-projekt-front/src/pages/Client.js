import { useState } from 'react';
import { Link } from "react-router-dom";
import '../css/client.css';
import UploadButton from "../components/UploadButton";

import {
    Container,
    Typography,
    makeStyles,
  } from "@material-ui/core";

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

const Client = () => {

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
             <h3>KLIENT</h3>
            </Typography>
            
            <Container fixed className={classes.section} style={{ height:"600px", width:"1100px" }} >
                <h2>Ubezpieczenie 3 dóbr</h2>

                <div className="client-box">
                    <h3 style={{fontFamily:'"Nunito Sans", sans-serif', fontSize: "25px", textAlign: "center"}}>Przedmiot 1</h3>
                    <form onSubmit={handleSubmit}>
                        <div class="user-box">
                            <input 
                                id="fortune1name"
                                type="text" 
                                value={fortune1} 
                                onChange={(e) => setFortune1(e.target.value)}
                                required
                            />
                            <label htmlFor="username"> Nazwa:</label>
                        </div>

                        <UploadButton className="clien-button-box"/>

                        
                        <div className="client-button-box">
                            <button className="button-client">Ubezpiecz przedmiot</button>
                        </div>


                        <br/><br/>
                    </form>
                </div>

                <div className="client-box" style={{ position:"center", backgroundColor:"rgb(36,180,73)" }}>
                    <h3 style={{fontFamily:'"Nunito Sans", sans-serif', fontSize: "25px", textAlign: "center"}}>Przedmiot 2</h3>
                    <form onSubmit={handleSubmit}>
                        <div class="user-box">
                            <input 
                                id="fortune2name"
                                type="text" 
                                value={fortune2} 
                                onChange={(e) => setFortune2(e.target.value)}
                                required
                            />
                            <label htmlFor="username"> Nazwa:</label>
                        </div>

                        <UploadButton className="clien-button-box"/>

                        
                        <div className="client-button-box">
                            <button className="button-client">Ubezpiecz przedmiot</button>
                        </div>

                        <br/><br/>
                    </form>
                </div>

                
                <div className="client-box" style={{ position:"center", backgroundColor:"rgb(36,73,200)" }}>
                    <h3 style={{fontFamily:'"Nunito Sans", sans-serif', fontSize: "25px", textAlign: "center"}}>Przedmiot 3</h3>
                    <form onSubmit={handleSubmit}>
                        <div class="user-box">
                            <input 
                                id="fortune3name"
                                type="text" 
                                value={fortune3} 
                                onChange={(e) => setFortune3(e.target.value)}
                                required
                            />
                            <label htmlFor="username"> Nazwa:</label>
                        </div>

                        <UploadButton className="clien-button-box"/>

                        
                        <div className="client-button-box">
                            <button className="button-client">Ubezpiecz przedmiot</button>
                        </div>

                        <br/><br/>
                    </form>
                </div>
            </Container>

            <Container fixed className={classes.section}>
                <h2>Polisa ubezpieczeniowa</h2>
                <Link to="/insurance"><button className="button-login">Skorzystaj z ubezpieczenia</button></Link>
            </Container>

            <Container fixed className={classes.section}>
                <h2>Zgłoszenie szkody</h2>
                <Link to="/insurance"><button className="button-login">Zgłoś szkodę</button></Link>
            </Container>

            <Container fixed className={classes.section} style={{ height:"450px" }}>
                <h2>Rejestr historii zgłoszeń</h2>

                <div className="client-box" style={{ width:"800px", height:"300px", position:"center", backgroundColor:"rgb(36,73,200)" }}>
                    <h3 style={{fontFamily:'"Nunito Sans", sans-serif', fontSize: "25px", textAlign: "center"}}>Wpisz numer zgłoszenia i zobacz historię</h3>
                    <form onSubmit={handleSubmit}>
                        <div class="user-box">
                            <input 
                                id="reghisid"
                                type="text" 
                                value={reghisid} 
                                onChange={(e) => setRegHisId(e.target.value)}
                                required
                            />
                            <label htmlFor="username"> Numer zgłoszenia:</label>
                        </div>
                        
                        <div className="client-button-box">
                            <button className="button-client">Szukaj</button>
                        </div>

                        <br/><br/>
                    </form>
                </div>
            </Container>

        </Container>
        
    );
}

export default Client;