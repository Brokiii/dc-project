import React from "react";
import useAuth from "../hooks/useAuth";
import { useEffect,useState } from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link , useNavigate} from "react-router-dom";

const useStyles = makeStyles(({
  root: {
    background: "grey",
    position: "fixed",
    width: "100%",
    height: "50px",
  },
  navlinks: {
    marginLeft: "10px",
    display: "flex",
  },
  logo: {
    fontFamily: '"Nunito Sans", sans-serif',
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    fontFamily: '"Nunito Sans", sans-serif',
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: "20px",
    "&:hover": {
      color: "darkGrey",
      borderBottom: "1px solid white",
    },
  },
  button: {
    fontFamily: '"Nunito Sans", sans-serif',
    textDecoration: "none",
    marginLeft: "20px",
  }
}));


function Navbar() {
  const navigate = useNavigate();
  const classes = useStyles();
  const { auth, setAuth } = useAuth();
  const [isLogged, setIsLogged] = useState(false);


  useEffect(() => {
    if(localStorage.getItem("token"))
    {
      setIsLogged(true);
    }
    else
    {
      setIsLogged(false);
    }
}, [])

  console.log(auth?.token);
  function logout() {
    localStorage.clear();
    setAuth('');
    window.location.reload();
    navigate('/login');
  }

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar className={classes.root}>
        <Typography variant="h4" className={classes.logo}>
          {isLogged ?
          localStorage.getItem("email")
          :
          <div>DC Projekt</div>
        }
        </Typography>
        <div className={classes.navlinks}>
          <Link to="/" className={classes.link}>
            Strona główna
          </Link>
          {!isLogged ?
          <Link to="/signup" className={classes.link}>
            Rejestracja
          </Link>: <></>}
          <Link to="/contact" className={classes.link}>
            Kontakt
          </Link>
          {(localStorage.getItem("token") === null) ? 
          <Link to="/login" className={classes.link}>
            Logowanie
          </Link> : 
          <button className={classes.button} onClick={logout}>Wyloguj</button>}
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;