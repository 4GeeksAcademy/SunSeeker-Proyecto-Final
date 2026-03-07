import React from "react";
import "./ModalHome.css";
export const ModalHome = ({ id }) => {
    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" >
                    <div className="modal-body text-center p-5">
                        <h2>
                            SUNSEEKER
                        </h2>
                        <p>
                            PARA JUGAR 🔸REGISTRARSE O INGRESAR 🔸
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};