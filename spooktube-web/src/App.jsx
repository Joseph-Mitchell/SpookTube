import { useEffect, useState } from "react";
import Homepage from "./components/pages/Homepage/Homepage.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/ui/Navbar.jsx";
import WatchPage from "./components/pages/Watch/WatchPage.jsx";
import loginWithToken from "./services/loginWithToken.js";

function App() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [icon, setIcon] = useState("default");

    async function sendLoginWithToken(token) {
        const response = await loginWithToken(token);
        if (response.message) {
            localStorage.removeItem("token");
        }
        else {
            setLoggedIn(true);
            setUsername(response.username);
            setIcon(response.icon);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== null)
            sendLoginWithToken(token);
    }, []);

    return (
        <>
            <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUsername={setUsername} icon={icon} setIcon={setIcon} navigate={navigate} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Homepage />
                    }
                />
                <Route
                    path="/watch"
                    element={
                        <WatchPage loggedIn={loggedIn} />
                    }
                />
            </Routes>
        </>
    );
}

export default App;
