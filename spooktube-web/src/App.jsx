import { useEffect, useState } from "react";
import Homepage from "./components/pages/Homepage/Homepage.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/ui/Navbar.jsx";
import WatchPage from "./components/pages/Watch/WatchPage.jsx";
import loginWithToken from "./services/loginWithToken.js";
import UploadPage from "./components/pages/Upload/UploadPage.jsx";
import MyContentPage from "./components/pages/My Content/MyContentPage.jsx";
import Profile from "./components/pages/Profile/Profile.jsx";

function App() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginFinished, setLoginFinished] = useState(false);
    const [username, setUsername] = useState("");
    const [iconText, setIconText] = useState("");
    const [iconColour, setIconColour] = useState("#727272");
    const [role, setRole] = useState("user");
    const [fileReader, setFileReader] = useState(new FileReader());
    const [videosPerPage, setVideosPerPage] = useState(18);

    function logOut() {
        setLoggedIn(false);
        setUsername("");
        setIconText("");
        setIconColour("#727272");
        setRole("user");
        localStorage.removeItem("token");
        navigate("/");
    }

    function applyLogin(response) {
        localStorage.setItem("token", response.token);
        setLoggedIn(true);
        setUsername(response.username);
        setIconText(response.iconText);
        setIconColour(response.iconColour);
        setRole(response.role);
    }

    async function sendLoginWithToken(token) {
        const response = await loginWithToken(token);

        if (response.message) {
            localStorage.removeItem("token");
        }
        else {
            await setLoggedIn(true);
            await setUsername(response.username);
            await setIconText(response.iconText);
            await setIconColour(response.iconColour);
            await setRole(response.role);
        }
        setLoginFinished(true);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token !== null)
            sendLoginWithToken(token);
        else
            setLoginFinished(true);

    }, []);

    window.onscroll = setBackgroundHeight;

    function setBackgroundHeight() {
        document.getElementById("full-height").style.height = "max-content";

        const height = Math.max(document.getElementById("full-height").offsetHeight, window.innerHeight);

        document.getElementById("full-height").style.height = height + "px";
    }

    useEffect(() => {
        setBackgroundHeight();
    });

    return (
        <div id="full-height">
            <Navbar loggedIn={loggedIn} logOut={logOut} applyLogin={applyLogin} iconText={iconText} iconColour={iconColour} navigate={navigate} role={role} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Homepage setBackgroundHeight={setBackgroundHeight} videosPerPage={videosPerPage} setVideosPerPage={setVideosPerPage} />
                    }
                />
                <Route
                    path="/watch"
                    element={
                        <WatchPage loggedIn={loggedIn} />
                    }
                />
                <Route
                    path="/upload"
                    element={
                        <UploadPage loggedIn={loggedIn} loginFinished={loginFinished} navigate={navigate} fileReader={fileReader} />
                    }
                />
                <Route
                    path="/my-content"
                    element={
                        <MyContentPage loggedIn={loggedIn} loginFinished={loginFinished} navigate={navigate} role={role} setBackgroundHeight={setBackgroundHeight} />
                    }
                />
                <Route
                    path="/moderation"
                    element={
                        <MyContentPage loggedIn={loggedIn} loginFinished={loginFinished} navigate={navigate} role={role} setBackgroundHeight={setBackgroundHeight} />
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <Profile loggedIn={loggedIn} loginFinished={loginFinished} iconText={iconText} setIconText={setIconText} iconColour={iconColour} setIconColour={setIconColour} username={username} />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
