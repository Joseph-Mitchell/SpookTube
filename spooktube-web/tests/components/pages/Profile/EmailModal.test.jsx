import { screen } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import EmailModal from "../../../../src/components/pages/Profile/EmailModal.jsx";

vi.mock("../../../../src/services/updateEmail.js", () => ({ default: () => { return {}; } }));

describe("UploadPage", () => {
    let setModal;

    beforeEach(() => {
        setModal = vi.fn();
    });

    afterEach(() => {
        setModal = undefined;
    });

    it("should show danger alert if submitted with empty fields", () => {
        //Act
        render(<EmailModal setModal={setModal} />);
        fireEvent.click(screen.getAllByRole("button")[0]);

        //Assert
        expect(screen.getByRole("alert")).toHaveClass("alert-danger");
    });
});