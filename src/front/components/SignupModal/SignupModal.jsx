import React, { useEffect, useState } from "react";
import "./signupModal.css";
import { useNavigate } from "react-router-dom";
import { signup } from "../../Service/BackEndServices";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

export const SignupModal = ({ show, onClose, onSwitch }) => {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [status, setStatus] = useState({ type: "", msg: "" });
    const [showRequirements, setShowRequirements] = useState(false);

    const loginConGoogle = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
        onError: () => console.log("Login Failed"),
    });

    const [formData, setFormData] = useState({
        michi_name: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    useEffect(() => {
        if (!show) {
            setFormData({
                michi_name: "",
                email: "",
                password: "",
                confirm_password: ""
            });
            setStatus({ type: "", msg: "" });
            setShowPass(false);
            setShowConfirmPass(false);
        }
    }, [show]);

    if (!show) return null;

    const password = formData.password || "";
    const requirements = [
        { label: "Minimo 6 caracteres", met: password.length > 5 },
        { label: "Minimo 10 caracteres", met: password.length > 9 },
        { label: "Una mayuscula", met: /[A-Z]/.test(password) },
        { label: "Un numero", met: /[0-9]/.test(password) },
    ];
    const strength = requirements.filter(req => req.met).length;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (status.msg) setStatus({ type: "", msg: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.michi_name || !formData.email || !formData.password) {
            setStatus({ type: "error", msg: "Todos los campos son obligatorios" });
            return;
        }
        if (formData.password !== formData.confirm_password) {
            setStatus({ type: "error", msg: "Las contraseñas no coinciden" });
            return;
        }
        const result = await signup(formData);

        if (result) {
            setStatus({ type: "success", msg: "Cuenta creada con éxito =)" });
            setTimeout(() => {
                onClose();
                navigate("/")
                setStatus({ type: "", msg: "" })
            }, 1500);
        } else {
            setStatus({ type: "error", msg: result.error });
        }
    };


    return (
        <div className="modal-overlay d-flex align-items-center justify-content-center p-3" onClick={onClose}>
            <div className="form-panel neon-pixel-border col-11 col-sm-10 col-md-8 col-lg-5 col-xl-4" onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={onClose} className="btn-submit-small">X</button>
                <h2>REGISTRARSE</h2>
                <p className="form-title">UNETE A LA BUSQUEDA</p>
                {status.msg && (
                    <div className={`pixel-alert ${status.type} mb-3`}>
                        {status.msg}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="container-fluid p-0" autoComplete="off">
                    <div className="campos mb-3">
                        <label className="form-label">Usuario</label>
                        <div className="campos-wrap d-flex align-items-center">
                            <span className="campos-icon">🐱</span>
                            <input
                                className="form-control"
                                type="text"
                                name="michi_name"
                                placeholder="michi_name"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="campos mb-3">
                        <label className="form-label">Email</label>
                        <div className="campos-wrap d-flex align-items-center">
                            <span className="campos-icon">📧</span>
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                placeholder="michi@sunseeker.com"
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="campos mb-3">
                        <label className="form-label">Contraseña</label>
                        <div className="campos-wrap d-flex align-items-center position-relative">
                            <span className="campos-icon">🔑</span>
                            <input
                                className="form-control"
                                type={showPass ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                onChange={handleChange}
                                onFocus={() => setShowRequirements(true)}
                                onBlur={() => setShowRequirements(false)}
                            />
                            <button
                                type="button"
                                className="contraseña-toggle position-absolute end-0 border-0 bg-transparent pe-3"
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? "🙈" : "👁"}
                            </button>
                        </div>
                        <div className="strength-wrap mt-2">
                            <div className="strength-bar d-flex gap-1">
                                <div className={`strength-seg flex-grow-1 ${strength >= 1 ? "filled-1" : ""}`}></div>
                                <div className={`strength-seg flex-grow-1 ${strength >= 2 ? "filled-2" : ""}`}></div>
                                <div className={`strength-seg flex-grow-1 ${strength >= 3 ? "filled-3" : ""}`}></div>
                                <div className={`strength-seg flex-grow-1 ${strength >= 4 ? "filled-4" : ""}`}></div>
                            </div>
                            <div className="strength-label small mt-1 text-end">SEGURIDAD</div>
                        </div>
                        {showRequirements && (
                            <div className="password-requirements mb-3 animacion-fade-in">
                                {requirements.map((req, index) => (
                                    <div key={index} className={`req-item ${req.met ? 'on' : 'off'}`}
                                    >
                                        <span className="req-icon">
                                            {req.met ? (
                                                <i className="fa-solid fa-check"></i>
                                            ) : (
                                                <i className="fa-solid fa-x"></i>
                                            )}
                                        </span>
                                        {req.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="campos mb-4">
                        <label className="form-label">Confirmar contraseña</label>
                        <div className="campos-wrap d-flex align-items-center position-relative">
                            <span className="campos-icon">🔐</span>
                            <input
                                className="form-control"
                                type={showConfirmPass ? "text" : "password"}
                                name="confirm_password"
                                placeholder="••••••••"
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="contraseña-toggle position-absolute end-0 border-0 bg-transparent pe-3"
                                onClick={() => setShowConfirmPass(!showConfirmPass)}>
                                {showConfirmPass ? "🙈" : "👁"}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn-submit">
                        CREAR CUENTA
                    </button>
                    <button
                        type="button"
                        className="btn-google-pixel"
                        onClick={() => loginConGoogle()}
                    >
                        <i class="fa-brands fa-google"></i>
                        INICIAR SESION CON GOOGLE
                    </button>
                </form>
                <p className="card-footer-text text-center mt-3">
                    ¿Ya tenés cuenta? <a href="#" className="text-decoration-none" onClick={onSwitch}>Iniciar sesión</a>
                </p>
            </div>
        </div>
    );
};