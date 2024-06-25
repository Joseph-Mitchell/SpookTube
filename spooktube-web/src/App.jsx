import { useState } from "react";
import Homepage from "./components/pages/Homepage/Homepage.jsx";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/Navbar.jsx";
import WatchPage from "./components/pages/Watch/WatchPage.jsx";



function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <>
            <Navbar />
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
