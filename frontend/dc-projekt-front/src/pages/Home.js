import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
  
const useStyles = makeStyles(({
    root: {
        backgroundColor: "lightGrey",
        position: "justify",
        paddingTop: '80px',
        height: 'auto', //or 1000px
    },
    section: {
        backgroundColor: "lightBlue",
        position: "justify",
        height: '300px',
        width: 'auto',
        margin: '50px',
    },
    button: {
        backgroundColor: "lightGrey",
        justifyContent: "center",
        alignItems: "center",
        display: "block",
        margin: "auto",
        height: '50px',
        width: 'auto',
        
    },
    typography: {
      textAlign: "center",
    },
  }));

const Home = () => {
const classes = useStyles();
  return (
    <Container fixed className={classes.root}>
      <Typography className={classes.typography}>
        UBEZPIECZALNIA HARNOLDY
      </Typography>
      <Container fixed className={classes.section}>
        O nas.
      </Container>
      <Container fixed className={classes.section}>
      Skorzystaj z naszego ubezpieczenia.
        <Link style={{textDecoration: 'none'}} to="/insurance"><button className={classes.button}>Skorzystaj z ubezpieczenia</button></Link>
      </Container>
      <Container fixed className={classes.section}>
      Zgłoś szkodę.
      <Link style={{textDecoration: 'none'}} to="/insurance"><button className={classes.button}>Zgłoś szkodę</button></Link>
      </Container>
    </Container>
    
  );
}
  
export default Home;
