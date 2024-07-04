import { screen } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import UploadPage from "../../../../src/components/pages/Upload/UploadPage.jsx";
import MyContentPage from "../../../../src/components/pages/My Content/MyContentPage.jsx";

vi.mock("../../../../src/services/uploadVideo.js", () => ({ default: () => { return { comments: [{ timeCode: 0 }, { timeCode: 1 }, { timeCode: 2 }, { timeCode: 4 }, { timeCode: 5 },] }; } }));

describe("UploadPage", () => {
    let loggedIn;
    let loginFinished;
    let navigate;
    let role;
    let setBackgroundHeight;

    beforeEach(() => {
        loggedIn = true;
        loginFinished = true;
        navigate = vi.fn();
        role = "user";
        setBackgroundHeight = vi.fn();
    });

    afterEach(() => {
        loggedIn = undefined;
        loginFinished = undefined;
        navigate = undefined;
        role = undefined;
        setBackgroundHeight = undefined;
    });

    it("should display comments after clicking comments tab", async () => {
        //Act
        render(<MyContentPage loggedIn={loggedIn} loginFinished={loginFinished} navigate={navigate} role={role} setBackgroundHeight={setBackgroundHeight} />);
        await fireEvent.click(screen.getAllByRole("switch")[1]);

        //Assert
        expect(screen.getAllByRole("grid")[0]).toHaveClass("d-none");
        expect(screen.getAllByRole("grid")[1]).not.toHaveClass("d-none");
    });
});