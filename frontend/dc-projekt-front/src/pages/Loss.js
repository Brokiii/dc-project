import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
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
        paddingLeft: '50px'
    },
}));

const Loss = () => {
    const {id} =useParams();
    const navigate = useNavigate();
    const [reason, setReason] = useState("");
    const [error, setError] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.preventDefault();
        const jsonToSend = JSON.stringify({
            reason,
            insuranceId:id
        });
        console.log(jsonToSend);
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem("token") 
            },
            body: jsonToSend
        };
        try {
            await fetch("http://localhost:8081/api/loss", requestOptions)
            .then(response => response.json())
            navigate("/home");
            setError(false);
        }
        catch (err) {
            setError(true);
        }
    }
    const classes = useStyles();
    return (
        <Container fixed className={classes.root}>
            <h2>ZGŁOSZENIE SZKODY</h2>
            <div className={classes.section}>
            <form onSubmit={handleSubmit}>
            <label htmlFor="login"> Reason:</label>
                <div class="user-box">
                    <textarea 
                    rows={6} 
                    cols={50}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    >
                    </textarea>
                </div>
                <button className="button-insurance">Zgłoś szkodę</button>
            </form>
            {error ? <span>BŁĄD</span>:<></>}
            </div>
        </Container>
    );

}

export default Loss;