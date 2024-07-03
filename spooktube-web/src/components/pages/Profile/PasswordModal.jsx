import { Modal } from 'bootstrap';
import { useEffect, useState } from 'react';

const PasswordModal = ({ setModal, submit }) => {
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        setModal(new Modal(document.getElementById("password-modal")));
    }, []);

    return (
        <div id="password-modal" className="modal" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal">
                <div className="modal-content">
                    <div className='modal-header d-flex justify-content-center'>
                        <h1 className="text-center" >Edit Password</h1>
                    </div>
                    <form className="modal-body text-center">
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
                            type="email"
                            placeholder="password"
                            value={oldPassword}
                            onChange={(e) => { setOldPassword(e.target.value); }}
                        />
                        <br />
                        <label>New Password</label><br />
                        <input
                            id="profile-new-password"
                            className="mb-4 py-1 px-2 w-75 | border border-1 rounded border-dark-subtle"
                            type="email"
                            placeholder="password"
                            value={newPassword}
                            onChange={(e) => { setNewPassword(e.target.value); }}
                        />
                        <br /><br />
                        <div className="d-flex | justify-content-evenly | mb-4">
                            <button className="btn btn-primary w-25 fs-6 text-light" type="button" onClick={() => { submit(email, oldPassword, newPassword); }}>Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default PasswordModal;