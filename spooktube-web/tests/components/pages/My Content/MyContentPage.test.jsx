import { screen } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import MyContentPage from "../../../../src/components/pages/My Content/MyContentPage.jsx";

vi.mock("../../../../src/components/common/VideoGrid.jsx", () => ({ default: () => { "VideoGrid"; } }));
vi.mock("../../../../src/components/pages/My Content/CommentGrid.jsx", () => ({ default: () => { "CommentGrid"; } }));

describe("MyContentPage", () => {
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

    it("should display videos after clicking videos tab", async () => {
        //Act
        render(<MyContentPage loggedIn={loggedIn} loginFinished={loginFinished} navigate={navigate} role={role} setBackgroundHeight={setBackgroundHeight} />);
        await fireEvent.click(screen.getAllByRole("switch")[1]);
        await fireEvent.click(screen.getAllByRole("switch")[0]);

        //Assert
        expect(screen.getAllByRole("grid")[0]).not.toHaveClass("d-none");
        expect(screen.getAllByRole("grid")[1]).toHaveClass("d-none");
    });
});