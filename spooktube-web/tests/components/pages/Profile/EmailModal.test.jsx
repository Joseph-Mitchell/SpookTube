import { screen } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import userEvent from "@testing-library/user-event";

import EmailModal from "../../../../src/components/pages/Profile/EmailModal.jsx";

vi.mock("../../../../src/services/updateEmail.js", () => ({ default: () => { return {}; } }));

describe("EmailModal", () => {
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

    it("should show danger alert if submitted with empty fields", () => {
        //Act
        render(<EmailModal setModal={setModal} />);
        fireEvent.click(screen.getAllByRole("button")[0]);

        //Assert
        expect(screen.getByRole("alert")).toHaveClass("alert-danger");
    });

    it("should show success alert if submitted with filled fields", async () => {
        //Act
        render(<EmailModal setModal={setModal} />);
        const inputs = screen.getAllByPlaceholderText("email@example.com");
        await user.type(inputs[0], "email@example.com");
        await user.type(inputs[1], "email@example.com");
        await user.type(inputs[2], "email@example.com");
        await user.click(screen.getAllByRole("button")[0]);

        //Assert
        expect(screen.getByRole("alert")).toHaveClass("alert-success");
    });
});