import React from "react";
import { useEffect,useState } from "react";
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
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
    }
    else {
      setIsLogged(false);
    }
  }, [])
  const classes = useStyles();
  return (
    <Container fixed className={classes.root}>
      <Typography style={{ fontFamily: '"Nunito Sans", sans-serif', fontSize: "40px", textAlign: "center" }}>
        UBEZPIECZALNIA HARNOLDY
      </Typography>
      <Container fixed className={classes.section}>
        <h1>O nas.</h1>
        Zajmiemy się ubezpieczeniem Twojego piwa tak jak należy.
      </Container>
      {isLogged ? <div>
        <Container fixed className={classes.section}>
          <h1>Skorzystaj z naszego ubezpieczenia.</h1>
          <Link to="/insurance"><button className="button-login">Skorzystaj z ubezpieczenia</button></Link>
        </Container>
       </div> :
        <></>
      }
    </Container>

  );
}

export default Home;
