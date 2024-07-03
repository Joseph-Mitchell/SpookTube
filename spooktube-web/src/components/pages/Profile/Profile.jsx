import { useEffect } from "react";

const Profile = ({ loggedIn, loginFinished, icon, username }) => {

    useEffect(() => {
        if (!loggedIn && loginFinished) {
            navigate("/");
        }
    }, [loginFinished]);

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="mt-3 mb-4">Profile</h1>
            <img id="profile-icon" className="border border-5 border-primary rounded-circle" src={`icon-${icon}.png`} />
            <h3 className="mt-3">{username}</h3>
            <a className="btn btn-link fs-4">Change Email</a>
            <a className="btn btn-link fs-4">Change Password</a>
        </div>
    );
};
export default Profile;
