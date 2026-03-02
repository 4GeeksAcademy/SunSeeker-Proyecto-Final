import React, { useEffect, useState } from "react";
import "./signupModal.css";
import { useNavigate } from "react-router-dom";
import { signup } from "../../Service/BackEndServices";

export const SignupModal = ({ show, onClose }) => {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [status, setStatus] = useState({ type: "", msg: "" });

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
    },[show]);

    if (!show) return null;

    const getStrength = () => {
        if (!formData.password) return 0;

        let s = 0;
        if (formData.password.length > 5) s++;
        if (formData.password.length > 9) s++;
        if (/[A-Z]/.test(formData.password)) s++;
        if (/[0-9]/.test(formData.password)) s++;
        return s;
    };
    const strength = getStrength();

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
                navigate("/demo")
                setStatus({ type: "", msg: "" })
            }, 1500);
        } else {
            setStatus({ type: "error", msg: result.error });
        }
    };


    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="form-panel neon-pixel-border" onClick={(e) => e.stopPropagation()}>
                <h2>SIGN UP</h2>
                <p className="form-title">UNETE A LA BUSQUEDA</p>
                {status.msg && (
                    <div className={`pixel-alert ${status.type}`}>
                        {status.msg}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="campos">
                        <label>Usuario</label>
                        <div className="campos-wrap">
                            <span className="campos-icon">🐱</span>
                            <input
                                type="text"
                                name="michi_name"
                                placeholder="michi_name"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="campos">
                        <label>Email</label>
                        <div className="campos-wrap">
                            <span className="campos-icon">📧</span>
                            <input
                                type="email"
                                name="email"
                                placeholder="gato@sunseeker.com"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="campos">
                        <label>Contraseña</label>
                        <div className="campos-wrap">
                            <span className="campos-icon">🔑</span>
                            <input
                                type={showPass ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="contraseña-toggle"
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? "🙈" : "👁"}
                            </button>
                        </div>
                        <div className="strength-wrap">
                            <div className="strength-bar">
                                <div className={`strength-seg ${strength >= 1 ? "filled-1" : ""}`}></div>
                                <div className={`strength-seg ${strength >= 2 ? "filled-2" : ""}`}></div>
                                <div className={`strength-seg ${strength >= 3 ? "filled-3" : ""}`}></div>
                                <div className={`strength-seg ${strength >= 4 ? "filled-4" : ""}`}></div>
                            </div>
                            <div className="strength-label">SEGURIDAD</div>
                        </div>
                    </div>
                    <div className="campos">
                        <label>Confirmar contraseña</label>
                        <div className="campos-wrap">
                            <span className="campos-icon">🔐</span>
                            <input
                                type={showConfirmPass ? "text" : "password"}
                                name="confirm_password"
                                placeholder="••••••••"
                                onChange={handleChange}
                                required
                            />
                            <button 
                            type="button" 
                            className="contraseña-toggle" 
                            onClick={() => setShowConfirmPass(!showConfirmPass)}>
                                {showConfirmPass ? "🙈" : "👁"}
                            </button>
                        </div>
                    </div>

                    <button 
                    type="submit" 
                    className="btn-submit"
                    >
                        CREAR CUENTA
                    </button>
                </form>
                <p className="card-footer-text">
                    ¿Ya tenés cuenta? <a onClick={onClose}>Iniciar sesión</a>
                </p>
            </div>
        </div>
    );
};