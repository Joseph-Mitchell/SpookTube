import { useState, useRef, useEffect } from "react";
import Homepage from "./components/pages/Homepage/Homepage.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/ui/Navbar.jsx";
import WatchPage from "./components/pages/Watch/WatchPage.jsx";

function App() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [icon, setIcon] = useState("");

    return (
        <>
            <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} navigate={navigate} />
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
                        <WatchPage />
                    }
                />
            </Routes>
        </>
    );
}

export default App;
