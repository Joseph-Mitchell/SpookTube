import { useEffect, useState } from "react";
import EmailModal from "./EmailModal.jsx";
import PasswordModal from "./PasswordModal.jsx";
import updateProfileDetails from "../../../services/updateProfileDetails.js";

const Profile = ({ loggedIn, loginFinished, icon, setIcon, username }) => {
    const [emailModal, setEmailModal] = useState({});
    const [passwordModal, setPasswordModal] = useState({});
    const [iconColour, setIconColour] = useState("#ff0000");
    const [iconText, setIconText] = useState("`^`");

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

    async function saveIcon() {
        if (displayIcon !== "default" && displayIcon !== icon) {
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
            <EmailModal setModal={setEmailModal} />
            <PasswordModal setModal={setPasswordModal} />
            <div className="d-flex flex-column align-items-center">
                <h1 className="mt-3 mb-4">Profile</h1>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <div className="row justify-content-center" >
                        <input
                            id="icon-form-emoticon"
                            className="border border-3 border-primary rounded-circle text-center fs-1 mb-2"
                            type="text"
                            style={{ backgroundColor: iconColour }}
                            value={iconText}
                            onChange={(e) => { setIconText(e.target.value); }}
                        />
                        <input className="mb-2" type="color" value={iconColour} onChange={(e) => { setIconColour(e.target.value); }} />
                        <input className="btn btn-primary text-white" type="submit" value="Update Icon" />
                    </div>

                </form>
                <h3 id="profile-username" className="mt-3">{displayUsername}<a className="btn btn-link" onClick={showUsernameForm}><i className="bi-pencil-square fs-4" /></a></h3>
                <form id="profile-username-form" className="d-none my-3" onSubmit={submitNewUsername}><input className="fs-4" type="text" value={displayUsername} onChange={(e) => { setDisplayUsername(e.target.value); }} /></form>
                <a className="btn btn-link fs-4" onClick={showEmailModal}>Change Email</a>
                <a className="btn btn-link fs-4" onClick={showPasswordModal}>Change Password</a>
            </div>
        </>
    );
};
export default Profile;
