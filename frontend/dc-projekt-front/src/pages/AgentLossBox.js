import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import useAuth from "../hooks/useAuth";
import '../css/lossBox.css';
import Select from 'react-select'

const LossBox = (props) => {
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("RECEVIED");
    const loss = props.loss;
    const options = [
        { value: 'RECEIVED', label: 'Recevied'},
        { value: 'REVIEVED', label: 'Revieved'},
        { value: 'CLOSED', label: 'Closed'}
    ]
    const handleChange = async (option) => {
        console.log(option);
        setStatus(option.value);
    }

    const changeStatus = async (event) => {
        event.preventDefault();
        const jsonToSend = JSON.stringify({
            lossId: loss.id,
            status
        });
        console.log(jsonToSend);
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'JWT '+ localStorage.getItem("token")
            },
            body: jsonToSend
        };

        try {
            await fetch("http://localhost:8081/api/loss", requestOptions)
              .then((response) => response.json())
              .then(() => {})

            setError(false);
        }
        catch (err) {
            setError(true);
        }
    }

    return (
        <div className="lossBox">
            <table>
                <tr>
                    <th>Numer losu:</th>
                    <td>{loss.id}</td>
                </tr>
                <tr>
                    <th>Decyzja:</th>
                    <td>{loss.decisionComment}</td>
                </tr>
                <tr>
                    <th>Powód:</th>
                    <td>{loss.reason}</td>
                </tr>
                <tr>
                    <th>Status:</th>
                    <td>{loss.reportStage}</td>
                </tr>
            </table>
            <Select options={options} onChange={handleChange} />
            <button className="button-login" onClick={changeStatus}>Zmień status</button>
        </div>
        );
}
    
export default LossBox;