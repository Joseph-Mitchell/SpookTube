import { Modal } from 'bootstrap';
import { useEffect, useState } from 'react';
import updateEmail from '../../../services/updateEmail.js';

const EmailModal = ({ setModal }) => {
    const [oldEmail, setOldEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");

    const [alert, setAlert] = useState("");
    const [alertColour, setAlertColour] = useState("danger");
    const [alertDisplay, setAlertDisplay] = useState("d-none");

    useEffect(() => {
        setModal(new Modal(document.getElementById("email-modal")));
    }, []);

    function wakeAlert(message, colour) {
        setAlert(message);
        setAlertColour(colour);
        setAlertDisplay("");
    }

    function preValidate(e) {
        e.preventDefault();

        if (oldEmail === "" || oldEmail === " ") {
            return wakeAlert("Please enter your current e-mail address", "danger");
        }
        if (newEmail === "" || newEmail === " ") {
            return wakeAlert("Please enter a new e-mail address", "danger");
        }
        if (confirmEmail === "" || confirmEmail === " ") {
            return wakeAlert("Please confirm your new e-mail address", "danger");
        }

        if (confirmEmail !== newEmail) {
            return wakeAlert("New e-mails did not match, please check and try again", "danger");
        }

        sendNewEmail();
    }

    async function sendNewEmail() {
        const response = await updateEmail(localStorage.getItem("token"), oldEmail, newEmail);

        if (response.message) {
            return wakeAlert(response.message, "danger");
        }

        await setOldEmail("");
        await setNewEmail("");
        await setConfirmEmail("");

        wakeAlert("Email changed successfully", "success");
    }

    return (
        <div id="email-modal" className="modal" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal">
                <div className="modal-content">
                    <div className='modal-header d-flex justify-content-center'>
                        <h1 className="text-center" >Edit Email</h1>
                    </div>
                    <form className="modal-body text-center" onSubmit={preValidate}>
                        <label>Current E-mail</label><br />
                        <input
                            id="profile-original-email"
                            className="mb-4 py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                            type="email"
                            placeholder="email@example.com"
                            value={oldEmail}
                            onChange={(e) => { setOldEmail(e.target.value); }}
                        />
                        <br />
                        <label>New E-mail</label><br />
                        <input
                            id="profile-new-email"
                            className="mb-4 py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                            type="email"
                            placeholder="email@example.com"
                            value={newEmail}
                            onChange={(e) => { setNewEmail(e.target.value); }}
                        />
                        <br />
                        <label>Confirm E-mail</label><br />
                        <input
                            id="profile-confirm-email"
                            className="mb-4 py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                            type="email"
                            placeholder="email@example.com"
                            value={confirmEmail}
                            onChange={(e) => { setConfirmEmail(e.target.value); }}
                        />
                        <br /><br />
                        <div className="d-flex | justify-content-evenly | mb-4">
                            <button type="button" className="btn btn-primary w-25 fs-6 text-light" type="submit">Confirm</button>
                        </div>
                    </form>
                    <div className={"alert alert-" + alertColour + " alert-dismissible fade show position-fixed w-50 start-50 top-50 translate-middle " + alertDisplay} role="alert" id="new-email-alert">
                        {alert}
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => { setAlertDisplay("d-none"); }}></button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EmailModal;