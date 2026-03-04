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
    return (
        <nav>
            <div className="nav-home d-flex justify-content-between align-items-center container-fluid">

                <Link to="/" className="logo text-decoration-none">
                    <div className="logo-text">
                        <span className="principal">SunSeeker</span>
                    </div>
                </Link>
                <div className="nav-button d-flex flex-column flex-md-row gap-2" id="logged-out">
                    <button href="#" className="btn btn-signup" onClick={() => setShowSignup(true)}>Registrarse</button>
                    <button href="#" className="btn btn-signup" onClick={() => setShowSignin(true)}> Ingresar  </button>
                </div>
            </div>
            <SignupModal show={showSignup} onClose={() => setShowSignup(false)} onSwitch={openSignin}/>
            <SigninModal show={showSignin} onClose={() => setShowSignin(false)} onSwitch={openSignup} />
        </nav>
    );
};

