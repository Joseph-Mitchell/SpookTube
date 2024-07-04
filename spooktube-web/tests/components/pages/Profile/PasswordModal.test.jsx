import { screen } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import userEvent from "@testing-library/user-event";

import PasswordModal from "../../../../src/components/pages/Profile/PasswordModal.jsx";

vi.mock("../../../../src/services/updatePassword.js", () => ({ default: () => { return {}; } }));

describe("PasswordModal", () => {
    let user;
    let setModal;

    beforeEach(() => {
        setModal = vi.fn();
        user = userEvent.setup();
    });

    afterEach(() => {
        setModal = undefined;
        user = undefined;
    });

    it("should show danger alert if submitted with empty fields", async () => {
        //Act
        render(<PasswordModal setModal={setModal} />);
        await user.click(screen.getAllByRole("button")[0]);

        //Assert
        expect(screen.getByRole("alert")).toHaveClass("alert-danger");
    });

    it("should show success alert if submitted with filled fields", async () => {
        //Act
        render(<PasswordModal setModal={setModal} />);
        const inputs = screen.getAllByPlaceholderText("password");
        await user.type(screen.getByPlaceholderText("email@example.com"), "email@example.com");
        await user.type(inputs[0], "password");
        await user.type(inputs[1], "password");
        await user.click(screen.getAllByRole("button")[0]);

        //Assert
        expect(screen.getByRole("alert")).toHaveClass("alert-success");
    });
});