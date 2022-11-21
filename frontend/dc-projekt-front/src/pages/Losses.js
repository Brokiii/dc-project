import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
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
        fontSize: "20px",
    },
}));

const Losses = () => {
    const [error, setError] = useState(false);
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        requestOptions.headers['Authorization'] = "JWT " + localStorage.getItem("token");
        try {
            fetch("http://localhost:8081/api/insurance?email="+localStorage.getItem("email"), requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);

            })
            setError(false);
        }
        catch (err) {
            setError(true);
        }
      }, [])
    
    const classes = useStyles();
    return (
        <Container fixed className={classes.root}>
            
        </Container>
    );

}

export default Losses;