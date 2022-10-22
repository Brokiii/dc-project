import React from "react";
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
  }));

const Home = () => {
const classes = useStyles();
  return (
    <Container fixed className={classes.root}>
      <Typography component="div">
        UBEZPIECZALNIA HARNOLDY
      </Typography>
      <Container fixed className={classes.section}>
        Kontakts
      </Container>
    </Container>
  );
}
  
export default Home;
