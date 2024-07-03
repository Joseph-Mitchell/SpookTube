import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { afterEach, beforeEach, vi } from 'vitest';

import LoginModal from "../../../src/components/ui/LoginModal.jsx";
import Navbar from "../../../src/components/ui/Navbar.jsx";

vi.mock("../../../src/components/ui/LoginModal.jsx");

describe("Navbar", () => {
    let loggedIn;
    let setLoggedIn;
    let setUsername;
    let icon;
    let setIcon;
    let navigate;
    let role;
    let setRole;

    beforeEach(() => {
        loggedIn = false;
        setLoggedIn = vi.fn();
        setUsername = vi.fn();
        icon = "0";
        setIcon = vi.fn();
        navigate = vi.fn();
        role = "user";
        setRole = vi.fn();
    });

    afterEach(() => {
        loggedIn = undefined;
        setLoggedIn = undefined;
        setUsername = undefined;
        icon = undefined;
        setIcon = undefined;
        navigate = undefined;
        role = undefined;
        setRole = undefined;
    });

    it("should display icon image with correct src for passed icon", () => {
        //Arrange
        icon = "test";

        //Act
        render(
            <Navbar
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setUsername={setUsername}
                icon={icon}
                setIcon={setIcon}
                navigate={navigate}
                role={role}
                setRole={setRole}
            />
        );

        //Assert
        expect(screen.getByAltText("User Icon")).toHaveAttribute("src", "icon-" + icon + ".png");
    });

    it("should display login/signup button if loggedIn false", () => {
        //Arrange
        loggedIn = false;

        //Act
        render(
            <Navbar
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setUsername={setUsername}
                icon={icon}
                setIcon={setIcon}
                navigate={navigate}
                role={role}
                setRole={setRole}
            />
        );

        //Assert
        expect(screen.getByText("Log-In/Sign-Up")).toBeInTheDocument();
    });
});