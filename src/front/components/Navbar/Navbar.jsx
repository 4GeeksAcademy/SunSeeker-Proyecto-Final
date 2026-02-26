import { Link } from "react-router-dom";
import "./index.css";
export const Navbar = () => {

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
                        <a href="#" className="btn btn-signup">Sign Up</a>
                    </div>
                </div>
            </nav>
        </>
    );
};


