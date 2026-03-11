import React, { useEffect } from "react"
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";
import PhaserGame from "../../components/PhaserGame.jsx";
import "./Home.css";
import { ModalHome } from "./ModalHome.jsx";
import { useNavigate } from "react-router-dom";
import { jamendocall } from "./service/BackEndServices.js"

export const Home = () => {
    const {store , dispatch} = useGlobalReducer();
    const navigate = useNavigate();
    const isLoggedIn = !!store.user;

    const handlePlayClick = (e) => {
        if (isLoggedIn) {
            e.preventDefault();
            navigate("/game")
        }
    };

    useEffect(()=>{
		jamendocall()
	},[])

    return (
        <>
            <div className="pixel-lampara-fija left">
                <div className="lampara-soporte"></div>
                <div className="lampara-case">
                    <div className="lamparita"></div>
                    <div className="iluminacion"></div>
                </div>
            </div>

            <div className="pixel-lampara-fija right">
                <div className="lampara-soporte"></div>
                <div className="lampara-case">
                    <div className="lamparita"></div>
                    <div className="iluminacion"></div>
                </div>
            </div>
            <div className="main-content">
                <button
                    className="btn-submit-play"
                    data-bs-toggle={!isLoggedIn ? "modal" : ""}
                    data-bs-target={!isLoggedIn ? "#homeModal" : ""}     
                    onClick={handlePlayClick}           
                    >
                    🐈‍⬛  JUGAR 🐈
                </button>
            </div>
            <ModalHome id="homeModal" />
        </>
    )

};
