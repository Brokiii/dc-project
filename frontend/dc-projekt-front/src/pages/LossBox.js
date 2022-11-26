import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import useAuth from "../hooks/useAuth";
import '../css/login.css';

const LossBox = (props) => {
    const loss = props.loss;
    return (
        <div>
            <div>Numer losu: {loss.id}</div>
            <div>Decyzja: {loss.decisionComment}</div>
            <div>Powód: {loss.reason}</div>
            <div>{}</div>
            <div>{}</div>
            <div>{}</div>
        </div>
        );
}
    
export default LossBox;