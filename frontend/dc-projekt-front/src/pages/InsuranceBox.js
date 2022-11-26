import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import useAuth from "../hooks/useAuth";
import '../css/login.css';
import LossBox from "./LossBox";

const InsuranceBox = (props) => {
    const insuranceID = props.insurance.insuranceId;
    const [error, setError] = useState(false);
    const [insurance, setInsurance] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [losses, setLosses] = useState([]);

    const downloadInsurance = async (event) => {
        event.preventDefault();

        const token = 'JWT ' + localStorage.getItem("token");
        const requestOptions = {
            method: 'GET',
            params: {'id': insuranceID},
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
             }
        };
        try {
            await fetch("http://localhost:8081/api/insurance/pdf?id="+insuranceID, requestOptions)
              .then((response) => response.blob())
                .then((blob) => {

                 //Build a URL from the file
                     const fileURL = URL.createObjectURL(blob);

                 //Open the URL on new Window
                     window.open(fileURL);
                })
            setError(false);
        }
        catch (err) {
            setError(true);
        }
    }

    const addAgent = async (event) => {
        event.preventDefault();
        const email = localStorage.getItem("email")
        const jsonToSend = JSON.stringify({
            email:email
        });

        const token = 'JWT ' + localStorage.getItem("token");
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
             },
            body: jsonToSend
        };
        try {
            await fetch("http://localhost:8081/api/insurance/"+insuranceID, requestOptions)
              .then((response) => response.json())

            setError(false);
        }
        catch (err) {
            setError(true);
        }
    }


    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem("token")
            },
        };
        try {
            fetch("http://localhost:8081/api/insurance/" + insuranceID + "/download", requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setInsurance(data);
                    setLosses(data.losses);

                })
                .then(() =>{
                    setIsLoaded(true);
                    setError(false);
                })
        }
        catch (err) {
            setIsLoaded(true);
            setError(true);
        }
    }, [insuranceID])
    return (

        <div>
            {!isLoaded && <span>Ładowanie...</span>}
            {isLoaded &&
            <div>
                <div>{insurance.goodType}</div>
                <div>{insurance.insuranceType}</div>
                <div>{insurance.clientName}</div>
                <div>{insurance.agentEmail}</div>

                {
                localStorage.getItem("type") === "client"
                 &&
                <Link to={"/loss/" + insurance.id}>
                    <button className="button-login">Zgłoś szkodę</button>
                </Link>
                }
                {
                localStorage.getItem("type") === "agent" 
                &&

                <button className="button-login" onClick={addAgent}>Przypisz</button>

                }

                <button onClick={downloadInsurance}>PDF</button>
                <div>Szkody:{insurance.losses && losses.map((loss) => (<LossBox loss={loss} />))}</div>
                <div>------</div>
            </div>
            }
        </div>
        
    );
}

export default InsuranceBox;