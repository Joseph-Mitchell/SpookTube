import { Modal } from 'bootstrap';
import { useEffect, useState } from 'react';
import updatePassword from '../../../services/updatePassword.js';

const PasswordModal = ({ setModal }) => {
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [alert, setAlert] = useState("");
    const [alertColour, setAlertColour] = useState("danger");
    const [alertDisplay, setAlertDisplay] = useState("d-none");

    useEffect(() => {
        setModal(new Modal(document.getElementById("password-modal")));
    }, []);

    function wakeAlert(message, colour) {
        setAlert(message);
        setAlertColour(colour);
        setAlertDisplay("");
    }

    function preValidate(e) {
        e.preventDefault();

        if (email === "" || email === " ") {
            return wakeAlert("Please enter your e-mail address", "danger");
        }
        if (oldPassword === "" || oldPassword === " ") {
            return wakeAlert("Please enter your password", "danger");
        }
        if (newPassword === "" || newPassword === " ") {
            return wakeAlert("Please enter a new password", "danger");
        }

        sendNewEmail();
    }

    async function sendNewEmail() {
        const response = await updatePassword(email, oldPassword, newPassword);

        if (response.message) {
            return wakeAlert(response.message, "danger");
        }

        await setEmail("");
        await setOldPassword("");
        await setNewPassword("");

        wakeAlert("Password changed successfully", "success");
    }

    return (
        <div id="password-modal" className="modal" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal">
                <div className="modal-content">
                    <div className='modal-header d-flex justify-content-center'>
                        <h1 className="text-center" >Edit Password</h1>
                    </div>
                    <form className="modal-body text-center" onSubmit={preValidate}>
                        <label>E-mail</label><br />
                        <input
                            id="profile-password-email"
                            className="mb-4 py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                            type="text"
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); }}
                        />
                        <br />
                        <label>Current Password</label><br />
                        <input
                            id="profile-old-password"
                            className="mb-4 py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                            type="password"
                            placeholder="password"
                            value={oldPassword}
                            onChange={(e) => { setOldPassword(e.target.value); }}
                        />
                        <br />
                        <label>New Password</label><br />
                        <input
                            id="profile-new-password"
                            className="mb-4 py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                            type="password"
                            placeholder="password"
                            value={newPassword}
                            onChange={(e) => { setNewPassword(e.target.value); }}
                        />
                        <br /><br />
                        <div className="d-flex | justify-content-evenly | mb-4">
                            <button role="button" className="btn btn-primary w-25 fs-6 text-light" type="submit">Confirm</button>
                        </div>
                    </form>
                    <div className={"alert alert-" + alertColour + " alert-dismissible fade show position-fixed w-50 start-50 top-50 translate-middle " + alertDisplay} role="alert" id="new-password-alert">
                        {alert}
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => { setAlertDisplay("d-none"); }}></button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PasswordModal;