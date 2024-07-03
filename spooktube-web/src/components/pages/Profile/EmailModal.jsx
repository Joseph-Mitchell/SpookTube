import { Modal } from 'bootstrap';
import { useEffect, useState } from 'react';

const EmailModal = ({ setModal, submit }) => {
    const [oldEmail, setOldEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");

    useEffect(() => {
        setModal(new Modal(document.getElementById("email-modal")));
    }, []);

    return (
        <div id="email-modal" className="modal" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal">
                <div className="modal-content">
                    <div className='modal-header d-flex justify-content-center'>
                        <h1 className="text-center" >Edit Email</h1>
                    </div>
                    <form className="modal-body text-center">
                        <label>Current E-mail</label><br />
                        <input
                            id="profile-original-email"
                            className="mb-4 py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                            type="text"
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
                            <button className="btn btn-primary w-25 fs-6 text-light" type="button" onClick={() => { submit(oldEmail, newEmail, confirmEmail); }}>Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default EmailModal;