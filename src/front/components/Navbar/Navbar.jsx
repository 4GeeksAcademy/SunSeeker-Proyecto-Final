import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useEffect, useState } from "react";
import { SignupModal } from "../SignupModal/SignupModal";
import { SigninModal } from "../SigninModal/SigninModal";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { imagenAccesorios } from "../../../imagenAccesorios";
import { CommunicatorMusic } from "../../Game/CommunicatorMusic";


export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [showSignup, setShowSignup] = useState(false);
    const [showSignin, setShowSignin] = useState(false);

    const COLORES_VALIDOS = ["Naranja", "Blanco", "Negro"];
    const ACCESORIOS_VALIDOS = ["Gafas", "Sombrero"];

    const michiColor = COLORES_VALIDOS.includes(store.michiColor) ? store.michiColor : "Naranja";
    const michiAccesorio = ACCESORIOS_VALIDOS.includes(store.michiAccesorio) ? store.michiAccesorio : "ninguno";
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

    useEffect(() => {
        const handleCambiarMichi = ({ color, accesorio }) => {
            dispatch({ type: "set_michi_color", payload: color });
            dispatch({ type: "set_michi_accesorio", payload: accesorio });
        };

        CommunicatorMusic.on("cambiar_michi", handleCambiarMichi);
        return () => {
            CommunicatorMusic.off("cambiar_michi", handleCambiarMichi);
        };
    }, [dispatch]);
    
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
            <SignupModal show={showSignup} onClose={() => setShowSignup(false)} onSwitch={openSignin} />
            <SigninModal
                show={showSignin}
                onClose={() => setShowSignin(false)}
                onSwitch={openSignup}
                onLoginSuccess={handleLoginSuccess}
            />
        </nav>
    );
};

