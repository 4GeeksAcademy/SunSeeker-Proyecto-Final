import React from "react";
import "./ModalHome.css";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const ModalHome = ({ id }) => {
    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content modal-perzonalizado-pixel neon-pixel-border">
                    <div id="carouselExample" className="carousel slide" data-bs-ride="false">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active" aria-current="true"></button>
                            <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
                            <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
                        </div>

                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="modal-body text-center p-5">
                                    <h2 className="mb-3">BIENVENIDO</h2>
                                    <p className="form-title">EN UNA CIUDAD DONDE EL SOL TARDA EN LLEGAR, UN MICHI DECIDE EMPRENDER UNA MAGNIFICA AVENTURA. <br></br>
                                        CON TU AYUDA, ATRAVESARA EDIFICIOS, ENEMIGOS Y GANARA PREMIOS PARA LLEGAR AL AMANECER Y DISFRUTAR EL CALIDO RAYO DE LUZ.</p>
                                </div>
                            </div>

                            <div className="carousel-item">
                                <div className="modal-body text-center p-5">
                                    <h2 className="mb-3">ACCESORIOS</h2>
                                    <p className="form-title mt-3">
                                        ¿SIN FOTO?<br />
                                        ¡VISITA ACCESORIOS, EQUIPA A TU MICHI PARA JUGAR Y APARECE EN EL RANKING CON TU PROPIO ESTILO!
                                    </p>
                                    <div className="mt-4">
                                        🐈 🎩 👓 🐈‍⬛
                                    </div>
                                </div>
                            </div>

                            <div className="carousel-item">
                                <div className="modal-body text-center p-5">
                                    <h2 className="mb-3">
                                        SUNSEEKER
                                    </h2>
                                    <br />
                                    <p className="form-title">
                                        PARA JUGAR DEBE REGISTRARSE O INGRESAR
                                    </p>
                                    <br />
                                    <button
                                        type="button"
                                        className="btn-submit-small mt-3"
                                        data-bs-dismiss="modal"
                                    >
                                        ENTENDIDO
                                    </button>
                                </div>
                            </div>

                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};