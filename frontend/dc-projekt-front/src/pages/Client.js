import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select'
import '../css/client.css';
import UploadButton from "../components/UploadButton";
import useAuth from "../hooks/useAuth";

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

    const [reghisid, setRegHisId] = useState('');

    const classes = useStyles();

    const [fortune1, setFortune1] = useState('');
    const [fortune2, setFortune2] = useState('');
    const [fortune3, setFortune3] = useState('');

    const [loss1, setLoss1] = useState('');
    const [loss2, setLoss2] = useState('');
    const [loss3, setLoss3] = useState('');

    const [attach1, setAttach1] = useState('');
    const [attach2, setAttach2] = useState('');
    const [attach3, setAttach3] = useState('');

    const [price, setPrice] = useState(0);
    const [price1, setPrice1] = useState(0);
    const [price2, setPrice2] = useState(0);
    const [price3, setPrice3] = useState(0);

    const [insuranceType, setInsuranceType] = useState(null);
    const [insuranceType1, setInsuranceType1] = useState(null);
    const [insuranceType2, setInsuranceType2] = useState(null);
    const [insuranceType3, setInsuranceType3] = useState(null);

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

    const handleChange1 = async (option) => {
        console.log(option);
        setPrice1(option.price1);
        setInsuranceType1(option.value);
    }

    const handleChange2 = async (option) => {
        console.log(option);
        setPrice2(option.price2);
        setInsuranceType2(option.value);
    }

    const handleChange3 = async (option) => {
        console.log(option);
        setPrice3(option.price3);
        setInsuranceType3(option.value);
    }

    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault();
    }

    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

  const getInsurances = async (event) => {
        event.preventDefault();

        const token = 'JWT ' + localStorage.getItem("token");
        const requestOptions = {
            method: 'GET',
            params: {'email': 'siema@wp.pl'},
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
             }
        };
        try {
            await fetch("http://localhost:8081/api/insurance/all?email=siema@wp.pl", requestOptions)
            .then(response => response.json())
            .then(data => {

                console.log(data);

                alert(JSON.stringify(data));
                //const token = data?.jwt;
                //const email = data?.email;
                //const type = data?.accountType;
                //localStorage.setItem('token', token);
                //localStorage.setItem('email', email);
                //localStorage.setItem('type', type);
                //console.log(data);
                //setAuth({ token: token, email: email, type:type})
            })
            //navigate("/home");
            //window.location.reload();
            setError(false);
        }
        catch (err) {
            setError(true);
        }
    }

    const downloadInsurance = async (event) => {
        event.preventDefault();

        const token = 'JWT ' + localStorage.getItem("token");
        const requestOptions = {
            method: 'GET',
            params: {'id': 24},
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
             }
        };
        try {
            await fetch("http://localhost:8081/api/insurance/pdf?id=24", requestOptions)
              .then((response) => response.blob())
                .then((blob) => {

                 //Build a URL from the file
                     const fileURL = URL.createObjectURL(blob);

                 //Open the URL on new Window
                     window.open(fileURL);
                })
            setError(false);
        }
        catch (err) {
            setError(true);
        }
    }

    const createInsurance = async (event) => {
        event.preventDefault();
        const token = 'JWT ' + localStorage.getItem("token");
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
             },
             body: JSON.stringify({
                 'goodType': fortune1,
                 'insuranceType': insuranceType1,
                 'email': localStorage.getItem("email")
             })
        };
        try {
            await fetch("http://localhost:8081/api/insurance", requestOptions)
            .then(response => response.json())
            .then(data => {
                const insuranceId = data?.insuranceId;
                console.log(data);
            })
            console.log('New Insurance generated');
            setError(false);
        }
        catch (err) {
            setError(true);
        }
    }


    const deleteInsurance = async (event) => {
        event.preventDefault();

        const token = 'JWT ' + localStorage.getItem("token");
        const requestOptions = {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
             }
        };
        try {
            const request = "http://localhost:8081/api/insurance" + "/44";
            await fetch(request, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            console.log('Insurance deleted');
            setError(false);
        }
        catch (err) {
            setError(true);
        }
    }

    const createLoss = async (event) => {
        console.log(loss1);
        event.preventDefault();
        const token = 'JWT ' + localStorage.getItem("token");
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
             },
             body: JSON.stringify({
                 'reason': loss1,
                 'insuranceId': 24
             })
        };
        try {
            await fetch("http://localhost:8081/api/loss", requestOptions)
            .then(response => response.json())
            .then(data => {
                const insuranceId = data?.insuranceId;
                console.log(data);
            })
            console.log('New Loss generated');
            setError(false);
        }
        catch (err) {
            setError(true);
        }
    }


    const addAttachment = async (event) => {
        event.preventDefault();
        console.log(file1);
    }




    return (
        <Container fixed className={classes.root}>
            <Typography style={{fontFamily:'"Nunito Sans", sans-serif', fontSize: "40px", textAlign: "center"}}>
             <h3>KLIENT</h3>
            </Typography>

            <Typography style={{fontFamily:'"Nunito Sans", sans-serif', fontSize: "40px", textAlign: "left"}}>
             <h4>Twoje 3 dobra</h4>
            </Typography>


            <div className="client-box" style={{ height:"700px", width:"1100px" }}>
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

                    <Select options={options} onChange={handleChange} />
                     <label class="label-price">Cena:{price} zł</label>



                    <button className="button-client" onClick={createInsurance}>Stwórz ubezpieczenie</button>

                    <button className="button-client" onClick={getInsurances}>Pokaż wszystkie ubezpieczenia w komunikacie</button>

                    <button className="button-client" onClick={downloadInsurance}> Pobierz polisę ubezpieczeniową</button>

                    <button className="button-client" onClick={deleteInsurance}>Zrezygnuj z ubezpieczenia</button>



                    <br/><br/>
                    <br/><br/>
                    <div class="user-box">
                        <input
                            id="loss1"
                            type="text"
                            value={loss1}
                            onChange={(e) => setLoss1(e.target.value)}
                            required
                        />
                        <label htmlFor="username"> Opis szkody:</label>
                    </div>


                    <button className="button-login" onClick={createLoss}> Zgłoś szkodę</button>

                     <UploadButton className="client-button-box" id="file1" value={file1}
                     onChange={(e) => setFile1(e.target.value)} required/>

                  <button className="button-client" onClick={addAttachment}>Wyslij załącznik</button>

                    <br/><br/>
                </form>
            </div>

            <br/><br/>

            <div className="client-box" style={{ height:"650px", width:"1100px", backgroundColor:"rgb(36,73,200)"  }}>
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

                    <Select options={options} onChange={handleChange2} />
                     <label class="label-price">Cena:{price2} zł</label>

                    <UploadButton className="clien-button-box"/>

                    <Link to="/insurance"><button className="button-client">Stwórz ubezpieczenie</button></Link>

                    <button className="button-client">Zaktualizuj ubezpieczenie</button>

                    <button className="button-client">Zrezygnuj z ubezpieczenia</button>

                    <Link to="/insurance"><button className="button-login">Zgłoś szkodę</button></Link>

                    <button className="button-client" onClick={downloadInsurance}> Pobierz polisę ubezpieczeniową</button>

                    <br/><br/>
                </form>
            </div>

            <br/><br/>

            <div className="client-box" style={{ height:"650px", width:"1100px", backgroundColor:"rgb(36,180,73)"  }}>
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

                    <Select options={options} onChange={handleChange3} />
                     <label class="label-price">Cena:{price3} zł</label>

                    <UploadButton className="clien-button-box"/>

                    <Link to="/insurance"><button className="button-client">Stwórz ubezpieczenie</button></Link>

                    <button className="button-client">Zaktualizuj ubezpieczenie</button>

                    <button className="button-client">Zrezygnuj z ubezpieczenia</button>

                    <Link to="/insurance"><button className="button-login">Zgłoś szkodę</button></Link>

                    <button className="button-client" onClick={downloadInsurance}> Pobierz polisę ubezpieczeniową</button>

                    <br/><br/>
                </form>
            </div>




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
                        
                        <div className="client-button-box" download="">
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