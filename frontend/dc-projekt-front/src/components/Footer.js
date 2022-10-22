import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  makeStyles,
} from "@material-ui/core";


const useStyles = makeStyles(({
    root: {
      marginTop: "1rem",
      padding: "1rem",
      background: "grey",
      position: "fixed",
      bottom: 0,
      width: "100%",
      display: "flex",
      justifyContent: 'center',
    },
  }));

function Footer() {
  const classes = useStyles();

  return (
    <AppBar position="static">
    <CssBaseline />
    <Toolbar className={classes.root}>
        Ubezpieczalnia Harnoldy
    </Toolbar>
  </AppBar>
  );
};

export default Footer;