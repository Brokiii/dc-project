import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

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
    fontFamily:'"Nunito Sans", sans-serif',
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    fontFamily:'"Nunito Sans", sans-serif',
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: "20px",
    "&:hover": {
      color: "darkGrey",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar className={classes.root}>
        <Typography variant="h4" className={classes.logo}>
          DC Project
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Strona główna
            </Link>
            <Link to="/login" className={classes.link}>
              Logowanie
            </Link>
            <Link to="/signup" className={classes.link}>
              Rejestracja
            </Link>
            <Link to="/contact" className={classes.link}>
              Kontakt
            </Link>
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;