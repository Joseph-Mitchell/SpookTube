import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { afterEach, beforeEach, it, vi } from 'vitest';

import UploadPage from "../../../../src/components/pages/Upload/UploadPage.jsx";

vi.mock("../../../../src/services/uploadVideo.js", () => ({ default: () => { return { comments: [{ timeCode: 0 }, { timeCode: 1 }, { timeCode: 2 }, { timeCode: 4 }, { timeCode: 5 },] }; } }));

describe("UploadPage", () => {
    let loggedIn;
    let loginFinished;
    let navigate;

    beforeEach(() => {
        loggedIn = true;
        loginFinished = true;
        navigate = vi.fn();
    });

    afterEach(() => {
        loggedIn = undefined;
        loginFinished = undefined;
        navigate = undefined;
    });

    it("should display correctly with no interaction", () => {
        //Act
        render(<UploadPage loggedIn={loggedIn} loginFinished={loginFinished} navigate={navigate} />);

        //Assert
        expect(screen.getByRole("figure")).toHaveClass("bg-secondary");
        expect(screen.getByRole("figure").firstChild).toHaveClass("bi-upload");
        expect(screen.getByRole("figure").firstChild).toHaveClass("text-secondary");
        expect(screen.getByRole("img")).toHaveClass("text-secondary");
        expect(screen.getByRole("note")).toHaveClass("text-secondary");
    });
});