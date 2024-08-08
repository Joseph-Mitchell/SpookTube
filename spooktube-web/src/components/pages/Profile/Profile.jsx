import { useEffect, useState } from "react";
import EmailModal from "./EmailModal.jsx";
import PasswordModal from "./PasswordModal.jsx";
import updateProfileDetails from "../../../services/updateProfileDetails.js";

const Profile = ({ loggedIn, loginFinished, iconText, setIconText, iconColour, setIconColour, username }) => {
    const [emailModal, setEmailModal] = useState({});
    const [passwordModal, setPasswordModal] = useState({});

    const [displayUsername, setDisplayUsername] = useState("");
    const [pageIconColour, setPageIconColour] = useState("#727272");
    const [pageIconText, setPageIconText] = useState("");

    useEffect(() => {
        setDisplayUsername(username);
    }, [username]);

    useEffect(() => {
        setPageIconText(iconText);
    }, [iconText]);

    useEffect(() => {
        setPageIconColour(iconColour);
    }, [iconColour]);

    useEffect(() => {
        if (!loggedIn && loginFinished) {
            navigate("/");
        }
    }, [loginFinished]);

    useEffect(() => {
        document.getElementById("update-profile-button").removeAttribute("disabled");
    }, [displayUsername, pageIconColour, pageIconText]);

    function showUsernameForm() {
        document.getElementById("profile-username").classList.add("d-none");
        document.getElementById("profile-username-form").classList.remove("d-none");
    }

    function hideUsernameForm() {
        document.getElementById("profile-username").classList.remove("d-none");
        document.getElementById("profile-username-form").classList.add("d-none");
    }

    async function submitProfileUpdate(e) {
        e.preventDefault();

        document.getElementById("update-profile-button").setAttribute("disabled", true);

        await updateProfileDetails(localStorage.getItem("token"), displayUsername, pageIconText, pageIconColour);

        setIconText(pageIconText);
        setIconColour(pageIconColour);
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
                <form className="w-100 d-flex flex-column align-items-center mb-4" onSubmit={submitProfileUpdate}>
                    <div className="position-relative">
                        <input
                            id="icon-form-emoticon"
                            className="border border-3 border-primary rounded-circle text-center mb-3"
                            type="text"
                            style={{ backgroundColor: pageIconColour }}
                            value={pageIconText}
                            onChange={(e) => { setPageIconText(e.target.value); }}
                        />
                        <input
                            id="icon-form-colour"
                            className="mb-2 form-control form-control-color position-absolute"
                            type="color"
                            value={pageIconColour}
                            onChange={(e) => { setPageIconColour(e.target.value); }}
                        />
                    </div>
                    <input className="fs-4 mb-3" type="text" value={displayUsername} onChange={(e) => { setDisplayUsername(e.target.value); }} />
                    <input id="update-profile-button" className="btn btn-primary text-white" type="submit" value="Update Profile" />
                </form>
                <a className="btn btn-link fs-4" onClick={showEmailModal}>Change Email</a>
                <a className="btn btn-link fs-4" onClick={showPasswordModal}>Change Password</a>
            </div>
        </>
    );
};
export default Profile;
