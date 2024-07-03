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
        expect(screen.queryByText("Log-Out")).toBeNull();
    });

    it("should display logout button if loggedIn true", () => {
        //Arrange
        loggedIn = true;

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
        expect(screen.queryByText("Log-In/Sign-Up")).toBeNull();
        expect(screen.getByText("Log-Out")).toBeInTheDocument();
    });

    it("should display expected buttons if role user", () => {
        //Arrange
        loggedIn = true;
        role = "user";

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
        expect(screen.queryByText("Moderation")).toBeNull();
        expect(screen.getByText("My Content")).toBeInTheDocument();
        expect(screen.getByText("Upload")).toBeInTheDocument();
        expect(screen.getByText("Profile")).toBeInTheDocument();
    });

    it("should display expected buttons if role user", () => {
        //Arrange
        loggedIn = true;
        role = "user";

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
        expect(screen.queryByText("Moderation")).toBeNull();
        expect(screen.getByText("My Content")).toBeInTheDocument();
        expect(screen.getByText("Upload")).toBeInTheDocument();
        expect(screen.getByText("Profile")).toBeInTheDocument();
    });

    it("should display expected buttons if role moderator", () => {
        //Arrange
        loggedIn = true;
        role = "moderator";

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
        expect(screen.getByText("Moderation")).toBeInTheDocument();
        expect(screen.queryByText("My Content")).toBeNull();
        expect(screen.queryByText("Upload")).toBeNull();
        expect(screen.queryByText("Profile")).toBeNull();
    });
});