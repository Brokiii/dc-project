import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import useAuth from "../hooks/useAuth";
import '../css/lossBox.css';

const LossBox = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);
    const loss = props.loss;


    const uploadFile = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        const email = localStorage.getItem("email")

        const formData = new FormData();
        formData.append(
            "newFile",
            file,
            file.name
        );

        try {
            await fetch("http://localhost:8081/api/loss/addAttachment?lossId="+loss.id, formData)
              .then((response) => response.json())
              .then(() => {
                setFiles([...files,file])
              })

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
            <input type="file" onChange={(e) => setSelectedFile(e.target.value)}/>
            <button className="button-login" onClick={uploadFile}>Dodaj plik</button>
            <div>
                <h2>Pliki:</h2>
                {files && files.map((file)=>
                <div><span>{file.name}</span><br/></div>
                )}

            </div>
        </div>
        );
}
    
export default LossBox;