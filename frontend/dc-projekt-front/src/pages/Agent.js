import React from "react";
import { Link } from "react-router-dom";
import Select from 'react-select'

import Checkbox from "../components/Checkbox";
import UploadButton from "../components/UploadButton";

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
        backgroundColor: "Green",
        position: "justify",
        paddingTop: '80px',
        height: 'auto', //or 1000px
    },
    section: {
        backgroundColor: "Orange",
        position: "justify",
        height: '150px',
        width: 'auto',
        margin: '50px',
    },
    button: {
        backgroundColor: "lightGrey",
        margin: "auto",
        height: '50px',
        width: 'auto',

    }
  }));

const Agent = () => {
const classes = useStyles();
  return (
    <Container fixed className={classes.root}>
      <Typography component="div">
        AGENT UBEZPIECZENIOWY
      </Typography>

      <Container fixed className={classes.section} style={{ width:"auto", height:"300px" }} >
        POLISY UBEZPIECZENIOWE

        <br /><br />

        <label class="label-insurance"> Nowe polisy</label>
        <Select options={polises} onChange={handleChange} />

         <br />

        <label htmlFor="customer"> KLIENT:
        <input
            id="customer"
            type="text"
            value="Jan Kowalski"
           // value={user}
            //onChange={(e) => setUser(e.target.value)}
            required
        />
        </label>



        <br/>

        <label htmlFor="item"> PRZEDMIOT:
        <input
            id="item"
            type="text"
            value="Lamborghini Huracan"
           // value={user}
            //onChange={(e) => setUser(e.target.value)}
            required
        />
        </label>

        <br/>

        <label htmlFor="numberOFRegistration"> RODZAJ POLISY:
        <input
            id="numberOFRegistration"
            type="text"
            value="Larger"
           // value={user}
            //onChange={(e) => setUser(e.target.value)}
            required
        />
        </label>

        <br />
        <br />
        <br />

        <Link style={{textDecoration: 'none'}} ><button className={classes.button}> Weryfikuj</button></Link>
 <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
<Link style={{textDecoration: 'none'}} ><button className={classes.button}> Akceptuj</button></Link>

      </Container>

    <Container fixed className={classes.section} style={{ width:"auto", height:"400px" }} >
      ZGŁOSZENIA SZKÓD


              <br /><br />

              <label class="label-insurance"> Nowe szkody</label>
              <Select options={destroyers} onChange={handleChange} />

               <br />
      <label htmlFor="customer"> KLIENT:
      <input
          id="customer"
          type="text"
          value="Jan Kowalski"
         // value={user}
          //onChange={(e) => setUser(e.target.value)}
          required
      />
      </label>

      <br/>

      <label htmlFor="item"> PRZEDMIOT:
      <input
          id="item"
          type="text"
          value="Lamborghini Huracan"
         // value={user}
          //onChange={(e) => setUser(e.target.value)}
          required
      />
      </label>

      <br/>

      <label htmlFor="numberOfRegistration"> RODZAJ POLISY:
      <input
          id="numberOfRegistration"
          type="text"
          value="Larger"
         // value={user}
          //onChange={(e) => setUser(e.target.value)}
          required
      />
      </label>

        <br/>
      <label htmlFor="numberOfRegistration"> OPIS SZKODY:
      <input
          id="numberOfRegistration"
          type="text"
          value="Pęknięty wał korbowy, przepalone świece"
         // value={user}
          //onChange={(e) => setUser(e.target.value)}
          required
      />
      </label>

      <br />
      <br />
      <br />

      <Link style={{textDecoration: 'none'}} ><button className={classes.button}> Weryfikuj</button></Link>
<span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
<Link style={{textDecoration: 'none'}} ><button className={classes.button}> Akceptuj</button></Link>

   </Container>

      <Container fixed className={classes.section}>
        WSKAZÓWKI SYSTEMU

                <label htmlFor="good2">
                <input
                    id="good2"
                    type="text"
                    style={{ width:"800px", height:"50px" }}
                    value="Wypłać pieniądze z ubezpieczenia"
                   // value={user}
                    //onChange={(e) => setUser(e.target.value)}
                    required
                />
                </label>
      <span> &nbsp;&nbsp;</span>
      <Link style={{textDecoration: 'none'}}><button className={classes.button}>Wyplac</button></Link>

      </Container>


    </Container>

  );
}

export default Agent;