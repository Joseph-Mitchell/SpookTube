import { useEffect, useState } from "react";
import { Modal } from "bootstrap";

const LoginModal = ({ loginModal, setLoginModal }) => {

    const [loginIdentifier, setLoginIdentifier] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [signUpUsername, setSignUpUsername] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpConfirmEmail, setSignUpConfirmEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");

    useEffect(() => {
        setLoginModal(new Modal(document.getElementById("loginModal")));
    }, []);

    async function login() { }

    async function signUp() { }

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
                                        className="mb-4 py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                                        type="email"
                                        placeholder="username/email@example.com"
                                        value={loginIdentifier}
                                        onChange={(e) => { setLoginIdentifier(e.target.value); }}
                                    />
                                    <br />
                                    <label>Password</label><br />
                                    <input
                                        className="py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                                        type="password"
                                        placeholder="Password"
                                        value={loginPassword}
                                        onChange={(e) => { setLoginPassword(e.target.value); }}
                                    />
                                    <br /><br />
                                    <div className="d-flex | justify-content-evenly | mt-3 mb-4">
                                        <button className="btn btn-primary w-25 fs-6 text-light" type="button" onClick={login}>Log-In</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-6 border-start border-secondary-subtle">
                                <form className="modal-body text-center fs-5">
                                    <h1 className="mb-4">Sign-Up</h1>
                                    <label>Username</label><br />
                                    <input
                                        className="mb-4 py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                                        type="email"
                                        placeholder="username"
                                        value={signUpUsername}
                                        onChange={(e) => { setSignUpUsername(e.target.value); }}
                                    />
                                    <br />
                                    <label>E-mail</label><br />
                                    <input
                                        className="mb-4 py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                                        type="email"
                                        placeholder="email@example.com"
                                        value={signUpEmail}
                                        onChange={(e) => { setSignUpEmail(e.target.value); }}
                                    />
                                    <br />
                                    <label>Confirm Email</label><br />
                                    <input
                                        className="mb-4 py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                                        type="email"
                                        placeholder="email@example.com"
                                        value={signUpConfirmEmail}
                                        onChange={(e) => { setSignUpConfirmEmail(e.target.value); }}
                                    />
                                    <br />
                                    <label>Password</label><br />
                                    <input
                                        className="py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                                        type="password"
                                        placeholder="Password"
                                        value={signUpPassword}
                                        onChange={(e) => { setSignUpPassword(e.target.value); }}
                                    />
                                    <br /><br />
                                    <div className="d-flex | justify-content-evenly | mt-3 mb-4">
                                        <button className="btn btn-outline-primary w-25 fs-6" type="button" onClick={signUp}>Sign-Up</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginModal;