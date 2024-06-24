import { useState } from "react";
import Homepage from "./components/pages/Homepage/Homepage.jsx";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <>
            <Homepage />
        </>
    );
}

export default App;
