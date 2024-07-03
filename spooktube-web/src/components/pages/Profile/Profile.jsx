import { useEffect, useState } from "react";
import IconModal from "./IconModal.jsx";
import EmailModal from "./EmailModal.jsx";
import PasswordModal from "./PasswordModal.jsx";
import updateProfileDetails from "../../../services/updateProfileDetails.js";

const Profile = ({ loggedIn, loginFinished, icon, setIcon, username }) => {
    const [iconModal, setIconModal] = useState({});
    const [emailModal, setEmailModal] = useState({});
    const [passwordModal, setPasswordModal] = useState({});

    const [displayUsername, setDisplayUsername] = useState("");
    const [displayIcon, setDisplayIcon] = useState("default");

    useEffect(() => {
        setDisplayUsername(username);
    }, [username]);

    useEffect(() => {
        setDisplayIcon(icon);
    }, [icon]);

    useEffect(() => {
        if (!loggedIn && loginFinished) {
            navigate("/");
        }
    }, [loginFinished]);

    useEffect(() => {
        saveIcon();
    }, [displayIcon]);

    function showUsernameForm() {
        document.getElementById("profile-username").classList.add("d-none");
        document.getElementById("profile-username-form").classList.remove("d-none");
    }

    async function submitNewUsername(e) {
        e.preventDefault();

        const response = await updateProfileDetails(localStorage.getItem("token"), displayUsername, displayIcon);

        document.getElementById("profile-username").classList.remove("d-none");
        document.getElementById("profile-username-form").classList.add("d-none");
    }

    function showIconModal() {
        iconModal.show();
    }

    async function saveIcon() {
        if (displayIcon !== "default" && displayIcon !== icon) {
            iconModal.hide();
            const response = await updateProfileDetails(localStorage.getItem("token"), displayUsername, displayIcon);
            setIcon(displayIcon);
        }
    }

    function chooseIcon(icon) {
        setDisplayIcon(icon);
    }

    function showEmailModal() {
        emailModal.show();
    }

    function showPasswordModal() {
        passwordModal.show();
    }

    return (
        <>
            <IconModal setModal={setIconModal} chooseIcon={chooseIcon} />
            <EmailModal setModal={setEmailModal} />
            <PasswordModal setModal={setPasswordModal} />
            <div className="d-flex flex-column align-items-center">
                <h1 className="mt-3 mb-4">Profile</h1>
                <div className="position-relative">
                    <img id="profile-icon" className="border border-5 border-primary rounded-circle" src={`icon-${displayIcon}.png`} />
                    <a className="btn btn-link position-absolute top-0 end-0" onClick={showIconModal}><i className="bi-pencil-square fs-4" /></a>
                </div>
                <h3 id="profile-username" className="mt-3">{displayUsername}<a className="btn btn-link" onClick={showUsernameForm}><i className="bi-pencil-square fs-4" /></a></h3>
                <form id="profile-username-form" className="d-none my-3" onSubmit={submitNewUsername}><input className="fs-4" type="text" value={displayUsername} onChange={(e) => { setDisplayUsername(e.target.value); }} /></form>
                <a className="btn btn-link fs-4" onClick={showEmailModal}>Change Email</a>
                <a className="btn btn-link fs-4" onClick={showPasswordModal}>Change Password</a>
            </div>
        </>
    );
};
export default Profile;
