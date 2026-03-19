import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useEffect, useState } from "react";
import { SignupModal } from "../SignupModal/SignupModal";
import { SigninModal } from "../SigninModal/SigninModal";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { imagenAccesorios } from "../../../imagenAccesorios";


export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [showSignup, setShowSignup] = useState(false);
    const [showSignin, setShowSignin] = useState(false);
    const michiColor = store.michiColor || "Naranja";
    const michiAccesorio = store.michiAccesorio || "ninguno";
    const fotoNavbar = imagenAccesorios[michiColor][michiAccesorio];
    const openSignup = () => {
        setShowSignin(false);
        setShowSignup(true);
    }

    const openSignin = () => {
        setShowSignup(false);
        setShowSignin(true);
    }

    const isLoggedIn = !!store.user;
    const michiName = store.user;
    const handleLoginSuccess = () => {
        setShowSignin(false);
        navigate("/")
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("michi_name");
        dispatch({
            type: "logout_user"
        });
        navigate("/")
    }
    useEffect(() => {
        const handleStorageChange = () => {
            const token = localStorage.getItem("token")
            if (!token && store.user) {
                dispatch({ type: "logout_user" });
                navigate("/")
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return() =>{
            window.removeEventListener("storage", handleStorageChange)
        };
    }, [store.user, dispatch, navigate])
    return (
        <nav>
            <div className="nav-home d-flex justify-content-between align-items-center container-fluid">

                <Link to="/" className="logo text-decoration-none">
                    <div className="logo-text">
                        <span className="principal">SunSeeker</span>
                    </div>
                </Link>
                {isLoggedIn ? (
                    <div className="michi-auth-container d-flex align-items-center gap-3">
                        <span className="michi-name-display">{michiName}</span>
                        <div className="michi-dropdown-container">
                            <div className="perfil-box">
                                <img src={fotoNavbar} alt="michi" className="perfil-img" />
                                <span className="flecha-pixel">▼</span>
                            </div>
                            <ul className="michi-dropdown-menu">
                                <li><Link to="/accesorios">Accesorios</Link></li>
                                <li><Link to="/ranking">Ranking</Link></li>
                                <li className="michi-name-display"><Link to="/game"><i className="fa-solid fa-cat"></i> JUGAR</Link></li>
                                <li onClick={handleLogout} className="logout-btn">Logout</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="nav-button d-flex flex-column flex-md-row gap-2" id="logged-out">
                        <button href="#" className="btn btn-signup" onClick={() => setShowSignup(true)}>Registrarse</button>
                        <button href="#" className="btn btn-signup" onClick={() => setShowSignin(true)}> Ingresar  </button>

                    </div>
                )}
            </div>
            <SignupModal show={showSignup} onClose={() => setShowSignup(false)} onSwitch={openSignin} onLoginSuccess={handleLoginSuccess} />
            <SigninModal
                show={showSignin}
                onClose={() => setShowSignin(false)}
                onSwitch={openSignup}
                onLoginSuccess={handleLoginSuccess}
            />
        </nav>
    );
};

