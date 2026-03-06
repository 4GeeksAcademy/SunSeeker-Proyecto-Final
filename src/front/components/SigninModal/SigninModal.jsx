import React, { useEffect, useState } from "react";
import "./SigninModal.css";
import { useNavigate } from "react-router-dom";
import { signin } from "../../Service/BackEndServices";

export const SigninModal = ({ show, onClose, onSwitch, onLoginSuccess }) => {
    const [user, setUser] = useState({
        michi_name: "",
        password: ""
    });

    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);

    const [status, setStatus] = useState({ type: "", msg: "" });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        if(status.msg){
            setStatus({ type: "", msg: "" });
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user.michi_name || !user.password) {
            setStatus({ type: "error", msg: "Todos los campos son obligatorios" });
            return;
        }
        const result = await signin(user, navigate)
        if (result && !result.error) {
            localStorage.setItem("michi_name", user.michi_name)
            setStatus({ type: "success", msg: "Ingresando" });
            setTimeout(() => {
                onLoginSuccess();
                onClose();
                navigate("/")
                setStatus({ type: "", msg: "" })
            }, 1500);
        } else {
            setStatus({ type: "error", msg: result?.error });
        }
    }
    useEffect(() => {
        if (!show) {
            setUser({
                michi_name: "",
                password: ""
            });
            setStatus({ type: "", msg: "" });
            setShowPass(false);
        }
    }, [show]);
    if (!show) return null;
    return (
        <div className="modal-overlay d-flex align-items-center justify-content-center p-3" onClick={onClose}>
            <div className="form-panel neon-pixel-border col-11 col-sm-10 col-md-8 col-lg-5 col-xl-4 p-4 position-relative" onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={onClose} className="btn-submit-small">X</button>
                <h2 className="text-center">INGRESAR</h2>
                <p className="form-title text-center">BIENVENIDO DE VUELTA, SUNSEEKER</p>
                {status.msg && (
                    <div className={`pixel-alert ${status.type} mb-3`}>
                        {status.msg}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="container-fluid p-0">
                    <div className="campos mb-3">
                        <label className="form-label">Usuario</label>
                        <div className="campos-wrap d-flex align-items-center">
                            <span className="campos-icon">🐱</span>
                            <input
                                type="text"
                                name="michi_name"
                                value={user.michi_name}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="michi_name"
                            />
                        </div>
                    </div>
                    <div className="campos mb-4">
                        <label className="form-label">Contraseña</label>
                        <div className="campos-wrap d-flex align-items-center position-relative">
                            <span className="campos-icon">🔑</span>
                            <input
                                type={showPass ? "text" : "password"}
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                className="contraseña-toggle position-absolute end-0 border-0 bg-transparent pe-3"
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? "🙈" : "👁"}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn-submit">
                        ENTRAR
                    </button>
                </form>

                <p className="card-footer-text">
                    ¿No tenés cuenta? <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onSwitch();
                        }}
                        className="text-decoration-none">Registrate</a>
                </p>
            </div>
        </div>
    );
};