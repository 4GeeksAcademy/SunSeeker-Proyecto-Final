import React from "react";
import "./ModalHome.css";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
export const ModalHome = ({ id }) => {
  
    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content modal-perzonalizado-pixel neon-pixel-border">
                    <div className="modal-body text-center p-5">
                        <h2 className="mb-3">
                            SUNSEEKER
                        </h2>
                        <br></br>
                        <p className="form-title">
                            PARA JUGAR DEBE REGISTRARSE O INGRESAR
                        </p>
                        <br></br>
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
        </div>
    );
};