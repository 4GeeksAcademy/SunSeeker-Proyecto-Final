import { Link } from "react-router-dom";
import "./navbar.css";
import { useState } from "react";
import { SignupModal } from "../SignupModal/SignupModal";


export const Navbar = () => {
    const [showSignup, setShowSignup] = useState(false);
    return (
        <>
            <nav>
                <div className="nav-home">
                    <Link to = "/" className="logo">
                        <div className="logo-text">
                            <span className="principal">SunSeeker</span>
                        </div>
                    </Link>
                    <div className="nav-button" id="logged-out">
                        <a href="#" className="btn btn-signin">Sign In</a>
                        <a href="#" className="btn btn-signup" onClick={() => setShowSignup(true)}>Sign Up</a>
                    </div>
                </div>
                <SignupModal show={showSignup} onClose={() => setShowSignup(false)} />
            </nav>
        </>
    );
};


