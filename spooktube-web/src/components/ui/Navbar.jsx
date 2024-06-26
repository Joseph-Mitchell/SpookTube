import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal.jsx";

const Navbar = ({ loggedIn, setLoggedIn }) => {
    const navigate = useNavigate();

    const [logoColor, setLogoColor] = useState("bg-dark");
    const [loginModal, setLoginModal] = useState({});

    function highlightLogo() {
        setLogoColor("bg-primary");
    }

    function unHighlightLogo() {
        setLogoColor("bg-dark");
    }

    return (
        <>
            <nav className="navbar vw-100 bg-body-secondary z-3">
                <div className="container-fluid">
                    <a className="btn btn-link navbar-brand fs-2" onClick={() => navigate("/")} onMouseOver={highlightLogo} onMouseOut={unHighlightLogo}>SPÖÖK <span className={`${logoColor} rounded-2 text-light px-3 pb-1`}>TUBE</span></a>
                    <ul className="navbar-nav fs-5" style={{ width: "170px" }}>
                        {
                            !loggedIn && (
                                <li className="nav-item">
                                    <a className="btn nav-link" onClick={() => { loginModal.show(); }}>Log-In / Sign-Up</a>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </nav>
            <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} setLoggedIn={setLoggedIn} />
        </>
    );
};
export default Navbar;