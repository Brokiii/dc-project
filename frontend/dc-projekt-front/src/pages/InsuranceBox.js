import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import useAuth from "../hooks/useAuth";
import '../css/insuranceBox.css';
import LossBox from "./LossBox";

const InsuranceBox = (props) => {
    const insuranceID = props.insurance.insuranceId;
    const [error, setError] = useState(false);
    const [insurance, setInsurance] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [losses, setLosses] = useState([]);
    const [filteredLosses, setFiletredLosses] = useState(losses);
    const [searchText,setSearchText] = useState("");

    useEffect(()=>{
        const result = losses.filter(loss => (loss.id === parseInt(searchText)))
        setFiletredLosses(result);  
        if(searchText === "")
        {
            setFiletredLosses(losses);  
        }
        console.log(filteredLosses);      
    },[searchText])

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

    const deleteInsurance = async (event) => {
        event.preventDefault();
        const email = localStorage.getItem("email")

        const token = 'JWT ' + localStorage.getItem("token");
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
             },
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
                    setFiletredLosses(data.losses);

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

        <div className="Box">
            {!isLoaded && <span>Ładowanie...</span>}
            {isLoaded &&
            <div>
                <div className="heading">
                    <div className="table">
                    <table>
                        <tr>
                            <th>Dobro</th>
                            <th>Rodzaj ubezpieczenia</th>
                            <th>Imie Klienta</th>
                            <th>Email Agenta</th>
                        </tr>
                        <tr>
                            <td><div>{insurance.goodType}</div></td>
                            <td><div>{insurance.insuranceType}</div></td>
                            <td><div>{insurance.clientName}</div></td>
                            <td><div>{insurance.agentEmail}</div></td>
                        </tr>
                    </table>
                    </div>

                    <div className="buttons">
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
                    {losses.length === 0 && <button className="button-login" onClick={deleteInsurance}>Odowłaj polise</button>}
                    <button className="button-login" onClick={downloadInsurance}>PDF</button>
                    </div>

                </div>
                <div className="losses">
                <div>
                    <input
                    className="searchInput"
                    type="text"
                    placeholder="Szukaj szkód po ID"
                    onChange={(e) => setSearchText(e.target.value)}
                    onBlur={(e) => setSearchText(e.target.value)}
                    />
                </div>
                    Szkody:{filteredLosses && filteredLosses.map((loss) => (<LossBox loss={loss} />))}</div>
            </div>
            }
        </div>
        
    );
}

export default InsuranceBox;