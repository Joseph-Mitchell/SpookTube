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
    const [icon, setIcon] = useState("default");
    const [role, setRole] = useState("user");
    const [fileReader, setFileReader] = useState(new FileReader());

    async function sendLoginWithToken(token) {
        const response = await loginWithToken(token);
        if (response.message) {
            localStorage.removeItem("token");
        }
        else {
            await setLoggedIn(true);
            await setUsername(response.username);
            await setIcon(response.icon);
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
            <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUsername={setUsername} icon={icon} setIcon={setIcon} navigate={navigate} role={role} setRole={setRole} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Homepage setBackgroundHeight={setBackgroundHeight} />
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
                        <Profile loggedIn={loggedIn} loginFinished={loginFinished} icon={icon} setIcon={setIcon} username={username} />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
