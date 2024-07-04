import { screen } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import userEvent from "@testing-library/user-event";

import LoginModal from "../../../src/components/ui/LoginModal.jsx";

vi.mock("../../../src/services/login.js", () => ({ default: () => { return {}; } }));
vi.mock("../../../src/services/register.js", () => ({ default: () => { return {}; } }));
vi.mock("react-router-dom", () => ({ useNavigate: () => { return vi.fn(); } }));

describe("LoginModal", () => {
    let user;
    let loginModal;
    let setLoginModal;
    let setLoggedIn;
    let setUsername;
    let setIcon;
    let setRole;

    beforeEach(() => {
        user = userEvent.setup();
        loginModal = { show: vi.fn(), hide: vi.fn() };
        setLoginModal = vi.fn();
        setLoggedIn = vi.fn();
        setUsername = vi.fn();
        setIcon = vi.fn();
        setRole = vi.fn();
    });

    afterEach(() => {
        user = undefined;
        loginModal = undefined;
        setLoginModal = undefined;
        setLoggedIn = undefined;
        setUsername = undefined;
        setIcon = undefined;
        setRole = undefined;
    });

    it("should show alert on submit login with empty fields", async () => {
        //Act
        render(<LoginModal loginModal={loginModal} setLoginModal={setLoginModal} setLoggedIn={setLoggedIn} setUsername={setUsername} setIcon={setIcon} setRole={setRole} />);
        await user.click(screen.getAllByRole("button")[0]);

        //Assert
        expect(screen.getByRole("alert")).not.toHaveClass("d-none");
    });

    it("should not show alert on submit login with filled fields", async () => {
        //Act
        render(<LoginModal loginModal={loginModal} setLoginModal={setLoginModal} setLoggedIn={setLoggedIn} setUsername={setUsername} setIcon={setIcon} setRole={setRole} />);
        await user.type(screen.getByPlaceholderText("email@example.com/username"), "username");
        await user.type(screen.getAllByPlaceholderText("Password")[0], "password");
        await user.click(screen.getAllByRole("button")[0]);

        //Assert
        expect(screen.getByRole("alert")).toHaveClass("d-none");
    });

    it("should show alert on submit register with empty fields", async () => {
        //Act
        render(<LoginModal loginModal={loginModal} setLoginModal={setLoginModal} setLoggedIn={setLoggedIn} setUsername={setUsername} setIcon={setIcon} setRole={setRole} />);
        await user.click(screen.getAllByRole("button")[1]);

        //Assert
        expect(screen.getByRole("alert")).not.toHaveClass("d-none");
    });

    it("should not show alert on submit login with filled fields", async () => {
        //Act
        render(<LoginModal loginModal={loginModal} setLoginModal={setLoginModal} setLoggedIn={setLoggedIn} setUsername={setUsername} setIcon={setIcon} setRole={setRole} />);
        await user.type(screen.getByPlaceholderText("username"), "username");
        await user.type(screen.getAllByPlaceholderText("email@example.com")[0], "email@example.com");
        await user.type(screen.getAllByPlaceholderText("email@example.com")[1], "email@example.com");
        await user.type(screen.getAllByPlaceholderText("Password")[1], "password");
        await user.click(screen.getAllByRole("button")[1]);

        //Assert
        expect(screen.getByRole("alert")).toHaveClass("d-none");
    });
});