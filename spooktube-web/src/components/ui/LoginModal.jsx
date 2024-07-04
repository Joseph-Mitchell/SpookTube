import { useEffect, useState } from "react";
import { Modal } from "bootstrap";
import register from "../../services/register.js";
import { useNavigate } from "react-router-dom";
import login from "../../services/login.js";

const LoginModal = ({ loginModal, setLoginModal, setLoggedIn, setUsername, setIcon, setRole }) => {
    const navigate = useNavigate();

    const [loginIdentifier, setLoginIdentifier] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [signUpUsername, setSignUpUsername] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpConfirmEmail, setSignUpConfirmEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");

    const [alert, setAlert] = useState("");
    const [alertColour, setAlertColour] = useState("danger");

    useEffect(() => {
        setLoginModal(new Modal(document.getElementById("loginModal")));
    }, []);

    function clearAlert() {
        document.getElementById("responseAlert").classList.add("d-none");
        setAlertColour("danger");
        setAlert("");
    }

    function clearForm() {
        setLoginIdentifier("");
        setLoginPassword("");
        setSignUpUsername("");
        setSignUpEmail("");
        setSignUpConfirmEmail("");
        setSignUpPassword("");
    }

    function applyLogin(response) {
        clearForm();

        localStorage.setItem("token", response.token);
        setLoggedIn(true);
        setUsername(response.username);
        setIcon(response.icon);
        setRole(response.role);
        loginModal.hide();
        navigate("/");
    }

    function showAlert(message) {
        document.getElementById("responseAlert").classList.remove("d-none");
        setAlertColour("danger");
        setAlert(message);
    }

    async function sendLogin() {
        clearAlert();

        if (loginIdentifier === "") {
            showAlert("Please enter your username/email");
            return;
        }

        if (loginPassword === "") {
            showAlert("Please enter your password");
            return;
        }

        const response = await login(loginIdentifier, loginPassword);

        if (response.message) {
            showAlert(response.message);
        } else {
            applyLogin(response);
        }
    }

    async function sendRegister() {
        clearAlert();

        if (signUpUsername === "") {
            showAlert("Please enter a username");
            return;
        }

        if (signUpEmail === "") {
            showAlert("Please enter an email");
            return;
        }

        if (signUpPassword === "") {
            showAlert("Please enter a password");
            return;
        }

        if (signUpEmail !== signUpConfirmEmail) {
            showAlert("Emails do not match");
            return;
        }

        const response = await register(signUpEmail, signUpUsername, signUpPassword);

        if (response.message) {
            showAlert(response.message);
        } else {
            applyLogin(response);
        }
    }

    return (
        <div className="modal modal-xl fade" id="loginModal">
            <div className="modal-dialog modal-dialog-centered" id="login-modal">
                <div className="modal-content bg-secondary-subtle">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-6">
                                <h1 className="mb-4 mt-3 text-center">Log-In</h1>
                                <form className="modal-body text-center fs-5 h-100">
                                    <label>E-mail/Username</label><br />
                                    <input
                                        id="loginIdentifier"
                                        className="mb-4 py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                                        type="email"
                                        placeholder="email@example.com/username"
                                        value={loginIdentifier}
                                        onChange={(e) => { setLoginIdentifier(e.target.value); }}
                                    />
                                    <br />
                                    <label>Password</label><br />
                                    <input
                                        id="loginPassword"
                                        className="py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                                        type="password"
                                        placeholder="Password"
                                        value={loginPassword}
                                        onChange={(e) => { setLoginPassword(e.target.value); }}
                                    />
                                    <br /><br />
                                    <div className="d-flex | justify-content-evenly | mt-3 mb-4">
                                        <button role="button" className="btn btn-primary w-25 fs-6 text-light" type="button" onClick={sendLogin}>Log-In</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-6 border-start border-secondary-subtle">
                                <form className="modal-body text-center fs-5">
                                    <h1 className="mb-4">Sign-Up</h1>
                                    <label>Username</label><br />
                                    <input
                                        id="signUpUsername"
                                        className="mb-4 py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                                        type="text"
                                        placeholder="username"
                                        value={signUpUsername}
                                        onChange={(e) => { setSignUpUsername(e.target.value); }}
                                    />
                                    <br />
                                    <label>E-mail</label><br />
                                    <input
                                        id="signUpEmail"
                                        className="mb-4 py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                                        type="email"
                                        placeholder="email@example.com"
                                        value={signUpEmail}
                                        onChange={(e) => { setSignUpEmail(e.target.value); }}
                                    />
                                    <br />
                                    <label>Confirm Email</label><br />
                                    <input
                                        id="signUpEmailConfirm"
                                        className="mb-4 py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                                        type="email"
                                        placeholder="email@example.com"
                                        value={signUpConfirmEmail}
                                        onChange={(e) => { setSignUpConfirmEmail(e.target.value); }}
                                    />
                                    <br />
                                    <label>Password</label><br />
                                    <input
                                        id="signUpPassword"
                                        className="py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                                        type="password"
                                        placeholder="Password"
                                        value={signUpPassword}
                                        onChange={(e) => { setSignUpPassword(e.target.value); }}
                                    />
                                    <br /><br />
                                    <div className="d-flex | justify-content-evenly | mt-3 mb-4">
                                        <button role="button" className="btn btn-outline-primary w-25 fs-6" type="button" onClick={sendRegister}>Sign-Up</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className={"alert alert-" + alertColour + " alert-dismissible fade show position-fixed w-50 start-50 top-50 translate-middle d-none"} role="alert" id="responseAlert">
                        {alert}
                        <button type="button" className="btn-close" aria-label="Close" onClick={(e) => { e.target.parentElement.classList.add("d-none"); }}></button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginModal;