import React from "react";
import { Link } from "react-router-dom";
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
        fontSize: "20px",
    },
  }));

const Home = () => {
const classes = useStyles();
  return (
    <Container fixed className={classes.root}>
      <Typography style={{fontFamily:'"Nunito Sans", sans-serif', fontSize: "40px", textAlign: "center"}}>
        UBEZPIECZALNIA HARNOLDY
      </Typography>
      <Container fixed className={classes.section}>
      <h1>Masz pytania?</h1>
        Skontaktuj się z nami pod adresem harnoldy@piwo.com
      </Container>
    </Container>
    
  );
}
  
export default Home;
