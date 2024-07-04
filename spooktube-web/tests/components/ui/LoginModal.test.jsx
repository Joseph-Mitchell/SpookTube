import { screen } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import LoginModal from "../../../src/components/ui/LoginModal.jsx";

vi.mock("../../../src/services/login.js", () => ({ default: () => { return {}; } }));
vi.mock("../../../src/services/register.js", () => ({ default: () => { return {}; } }));
vi.mock("react-router-dom", () => ({ useNavigate: () => { return vi.fn(); } }));

describe("LoginModal", () => {
    let loginModal;
    let setLoginModal;
    let setLoggedIn;
    let setUsername;
    let setIcon;
    let setRole;

    beforeEach(() => {
        loginModal = { show: vi.fn(), hide: vi.fn() };
        setLoginModal = vi.fn();
        setLoggedIn = vi.fn();
        setUsername = vi.fn();
        setIcon = vi.fn();
        setRole = vi.fn();
    });

    afterEach(() => {
        loginModal = undefined;
        setLoginModal = undefined;
        setLoggedIn = undefined;
        setUsername = undefined;
        setIcon = undefined;
        setRole = undefined;
    });

    it("should show alert on submit login with empty fields", () => {
        //Act
        render(<LoginModal loginModal={loginModal} setLoginModal={setLoginModal} setLoggedIn={setLoggedIn} setUsername={setUsername} setIcon={setIcon} setRole={setRole} />);
        fireEvent.click(screen.getAllByRole("button")[0]);

        //Assert
        expect(screen.getByRole("alert")).not.toHaveClass("d-none");
    });

    it("should not show alert on submit login with filled fields", () => {
        //Act
        render(<LoginModal loginModal={loginModal} setLoginModal={setLoginModal} setLoggedIn={setLoggedIn} setUsername={setUsername} setIcon={setIcon} setRole={setRole} />);
        fireEvent.change(screen.getByPlaceholderText("email@example.com/username"), { target: { value: "username" } });
        fireEvent.change(screen.getAllByPlaceholderText("Password")[0], { target: { value: "password" } });
        fireEvent.click(screen.getAllByRole("button")[0]);

        //Assert
        expect(screen.getByRole("alert")).toHaveClass("d-none");
    });

    it("should show alert on submit register with empty fields", () => {
        //Act
        render(<LoginModal loginModal={loginModal} setLoginModal={setLoginModal} setLoggedIn={setLoggedIn} setUsername={setUsername} setIcon={setIcon} setRole={setRole} />);
        fireEvent.click(screen.getAllByRole("button")[1]);

        //Assert
        expect(screen.getByRole("alert")).not.toHaveClass("d-none");
    });

    it("should not show alert on submit login with filled fields", () => {
        //Act
        render(<LoginModal loginModal={loginModal} setLoginModal={setLoginModal} setLoggedIn={setLoggedIn} setUsername={setUsername} setIcon={setIcon} setRole={setRole} />);
        fireEvent.change(screen.getByPlaceholderText("username"), { target: { value: "username" } });
        fireEvent.change(screen.getAllByPlaceholderText("email@example.com")[0], { target: { value: "email" } });
        fireEvent.change(screen.getAllByPlaceholderText("email@example.com")[1], { target: { value: "email" } });
        fireEvent.change(screen.getAllByPlaceholderText("Password")[1], { target: { value: "password" } });
        fireEvent.click(screen.getAllByRole("button")[1]);

        //Assert
        expect(screen.getByRole("alert")).toHaveClass("d-none");
    });
});