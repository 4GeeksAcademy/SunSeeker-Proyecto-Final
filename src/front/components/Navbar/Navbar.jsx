import { Link } from "react-router-dom";
import "./navbar.css";
import { useState } from "react";
import { SignupModal } from "../SignupModal/SignupModal";
import { SigninModal } from "../SigninModal/SigninModal";


export const Navbar = () => {
    const [showSignup, setShowSignup] = useState(false);
    const [showSignin, setShowSignin] = useState(false);

    const openSignup = () => {
        setShowSignin(false);
        setShowSignup(true);
    }

    const openSignin = () => {
        setShowSignup(false);
        setShowSignin(true);
    }

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"))
    const michiName = localStorage.getItem("michi_name");
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setShowSignin(false);
    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("michi_name");
        setIsLoggedIn(false);
    }
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
                                <span className="flecha-pixel">▼</span>
                            </div>
                            <ul className="michi-dropdown-menu">
                                <li><Link to="/demo">Accesorios</Link></li>
                                <li><Link to="/ranking">Ranking</Link></li>
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

