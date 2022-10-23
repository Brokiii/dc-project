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

const useStyles = makeStyles(({
    root: {
        backgroundColor: "Orange",
        position: "justify",
        paddingTop: '80px',
        height: 'auto', //or 1000px
    },
    section: {
        backgroundColor: "lightGreen",
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

const Client = () => {
const classes = useStyles();
  return (
    <Container fixed className={classes.root}>
      <Typography component="div">
        KLIENT
      </Typography>

      <Container fixed className={classes.section} style={{ width:"auto", height:"250px" }} >
        UBEZPIECZENIE 3 DÓBR

        <br /><br />
        <label htmlFor="good1"> DOBRO 1:
        <input
            id="good1"
            type="text"
           // value={user}
            //onChange={(e) => setUser(e.target.value)}
            required
        />
        </label>

        <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <UploadButton label="blablabla"/>
        <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <Link style={{textDecoration: 'none'}} to="/insurance"><button className={classes.button} style={{ width:"200px", height:"20px" }} >Skorzystaj z ubezpieczenia</button></Link>
        <br />

        <label htmlFor="good2"> DOBRO 2:
        <input
            id="good2"
            type="text"
           // value={user}
            //onChange={(e) => setUser(e.target.value)}
            required
        />
        </label>

        <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <UploadButton label="blablabla"/>
        <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <Link style={{textDecoration: 'none'}} to="/insurance"><button className={classes.button} style={{ width:"200px", height:"20px" }} >Skorzystaj z ubezpieczenia</button></Link>
        <br />

        <label htmlFor="good3"> DOBRO 3:
        <input
            id="good3"
            type="text"
           // value={user}
            //onChange={(e) => setUser(e.target.value)}
            required
        />
        </label>

        <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <UploadButton label="blablabla"/>
        <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <Link style={{textDecoration: 'none'}} to="/insurance"><button className={classes.button} style={{ width:"200px", height:"20px" }} >Skorzystaj z ubezpieczenia</button></Link>
        <br />


          <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

              <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

              <Checkbox label="Czy pragnie Pan/i otrzymywać powiadomienia o etapach sprawy e-mailem ?" />
              <br />
        <Link style={{textDecoration: 'none'}} to="/insurance"><button className={classes.button}> Ubezpiecz majątek </button></Link>


      </Container>

      <Container fixed className={classes.section} style={{ width:"auto", height:"200px" }}>
      POLISA UBEZPIECZENIOWA
      <br />
      <br />

        <label class="label-insurance"> Typ ubezpieczenia:</label>
        <Select options={options} onChange={handleChange} />
        <br />
        <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <Link style={{textDecoration: 'none'}} ><button className={classes.button}>Otrzymaj polisę w formie PDF e-mailem</button></Link>
        <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <Link style={{textDecoration: 'none'}} ><button className={classes.button}>Pobierz polisę ze strony</button></Link>



      </Container>

      <Container fixed className={classes.section}>
        ZGŁOSZENIE SZKODY

                <label htmlFor="good2"> 
                <input
                    id="good2"
                    type="text"
                    style={{ width:"800px", height:"50px" }}
                   // value={user}
                    //onChange={(e) => setUser(e.target.value)}
                    required
                />
                </label>
      <span> &nbsp;&nbsp;</span>
      <Link style={{textDecoration: 'none'}}><button className={classes.button}>Zglos</button></Link>

      </Container>

      <Container fixed className={classes.section}>
        WPISZ NUMER ZGŁOSZENIA I ZOBACZ HISTORIĘ:

        <label htmlFor="numberOfRegitration">
        <input
            id="numberOfRegitration"
            type="text"
           // value={user}
            //onChange={(e) => setUser(e.target.value)}
            required
        />
        </label>
      <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</span>
        <Link style={{position: "Center"}}><button className={classes.button}> Szukaj </button></Link>
      </Container>

    </Container>

  );
}

export default Client;