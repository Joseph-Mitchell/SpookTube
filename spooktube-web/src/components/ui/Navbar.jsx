import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ loggedIn, setLoggedIn }) => {
    const navigate = useNavigate();

    const [logoColor, setLogoColor] = useState("bg-dark");

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
                    <div className="collapse collapse-horizontal ms-auto mb-2 mb-lg-0" id="navCollapse">
                        <ul className="navbar-nav fs-5" style={{ width: "170px" }}>
                            <li className="nav-item">
                                <a className="btn nav-link">Log-In / Sign-Up</a>
                            </li>
                        </ul>
                    </div>
                    <button className="btn btn-link" data-bs-toggle="collapse" data-bs-target="#navCollapse" aria-expanded="false" aria-controls="navCollapse">
                        <img className="border border-4 border-primary rounded-5" src="icon-placeholder.png" />
                    </button>
                </div>
            </nav>
        </>
    );
};
export default Navbar;