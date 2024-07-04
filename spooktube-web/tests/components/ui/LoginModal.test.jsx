import { screen } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import LoginModal from "../../../src/components/ui/LoginModal.jsx";

vi.mock("../../../src/services/login.js", () => ({ default: () => { "login"; } }));
vi.mock("../../../src/services/register.js", () => ({ default: () => { "register"; } }));
vi.mock("react-router-dom", () => ({ useNavigate: () => { vi.fn(); } }));

describe("MyContentPage", () => {
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
});