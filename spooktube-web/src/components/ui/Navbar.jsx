import { useState } from "react";
import LoginModal from "./LoginModal.jsx";

const Navbar = ({ loggedIn, logOut, applyLogin, iconText, iconColour, navigate, role }) => {

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
            <nav className="navbar w-100 bg-body-secondary z-3">
                <div className="container-fluid">
                    <a className="btn btn-link navbar-brand fs-2"
                        onClick={() => navigate("/")}
                        onMouseOver={highlightLogo}
                        onMouseOut={unHighlightLogo}
                    >
                        SPÖÖK <span className={`${logoColor} rounded-2 text-light px-3 pb-1`}>TUBE</span>
                    </a>
                    <div className="collapse collapse-horizontal ms-auto mb-lg-0 " id="navCollapse">
                        <ul className="navbar-nav fs-6 list-group list-group-horizontal d-flex justify-content-end" style={{ width: "420px" }}>
                            {
                                !loggedIn && (
                                    <>
                                        <li className="nav-item list-group-item bg-transparent border-0">
                                            <a className="btn nav-link" onClick={() => { loginModal.show(); }}>Log-In/Sign-Up</a>
                                        </li>
                                    </>
                                )
                            }
                            {
                                loggedIn && role === "moderator" && (
                                    <>
                                        <li className="nav-item list-group-item bg-transparent border-0">
                                            <a className="btn nav-link" onClick={() => { navigate("/moderation"); }}>Moderation</a>
                                        </li>
                                    </>
                                )
                            }
                            {
                                loggedIn && role !== "moderator" && (
                                    <>
                                        <li className="nav-item list-group-item bg-transparent border-0">
                                            <a className="btn nav-link" onClick={() => { navigate("/my-content"); }}>My Content</a>
                                        </li>
                                        <li className="nav-item list-group-item bg-transparent border-0">
                                            <a className="btn nav-link" onClick={() => { navigate("/upload"); }}>Upload</a>
                                        </li>
                                        <li className="nav-item list-group-item bg-transparent border-0">
                                            <a className="btn nav-link" onClick={() => { navigate("/profile"); }}>Profile</a>
                                        </li>
                                    </>
                                )
                            }
                            {
                                loggedIn && (
                                    <>
                                        <li className="nav-item list-group-item bg-transparent border-0">
                                            <a className="btn nav-link" onClick={logOut}>Log-Out</a>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                    <button className="btn btn-link link-underline link-underline-opacity-0" data-bs-toggle="collapse" data-bs-target="#navCollapse" aria-expanded="false" aria-controls="navCollapse">
                        <p className="user-icon border border-4 border-primary rounded-circle mb-0 py-2 text-black text-center user-select-none overflow-hidden" style={{ backgroundColor: iconColour }}>
                            {iconText}
                        </p>
                    </button>
                </div>
            </nav>
            <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} applyLogin={applyLogin} />
        </>
    );
};
export default Navbar;