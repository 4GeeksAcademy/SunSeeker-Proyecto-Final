import React, { useEffect } from "react"
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";
import PhaserGame from "../../components/PhaserGame.jsx";
import "./Home.css";
import { SigninModal } from "../../components/SigninModal/SigninModal.jsx";
import { ModalHome } from "./ModalHome.jsx";

export const Home = () => {
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
                    data-bs-toggle="modal"
                    data-bs-target="#homeModal"
                >
                    🐈‍⬛  JUGAR 🐈
                </button>
            </div>
            <ModalHome id="homeModal" />
            <div className=" d-flex justify-content-center align-item-center mt-3">
                {/* <PhaserGame /> */}
            </div>
        </>
    )

};
