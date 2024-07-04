import { screen } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, it, vi } from 'vitest';

import UploadPage from "../../../../src/components/pages/Upload/UploadPage.jsx";

vi.mock("../../../../src/services/uploadVideo.js", () => ({ default: () => { return { comments: [{ timeCode: 0 }, { timeCode: 1 }, { timeCode: 2 }, { timeCode: 4 }, { timeCode: 5 },] }; } }));
vi.spyOn(FileReader.prototype, "readAsDataURL");

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

    it("should display correctly with dragging file over", async () => {
        //Act
        render(<UploadPage loggedIn={loggedIn} loginFinished={loginFinished} navigate={navigate} />);
        await fireEvent.dragOver(screen.getByRole("figure"));

        //Assert
        expect(screen.getByRole("figure")).toHaveClass("bg-primary");
        expect(screen.getByRole("figure").firstChild).toHaveClass("bi-upload");
        expect(screen.getByRole("figure").firstChild).toHaveClass("text-primary");
        expect(screen.getByRole("img")).toHaveClass("text-primary");
        expect(screen.getByRole("note")).toHaveClass("text-primary");
    });

    it("should display correctly with dragging file away", async () => {
        //Act
        render(<UploadPage loggedIn={loggedIn} loginFinished={loginFinished} navigate={navigate} />);
        await fireEvent.dragOver(screen.getByRole("figure"));
        await fireEvent.dragLeave(screen.getByRole("figure"));

        //Assert
        expect(screen.getByRole("figure")).toHaveClass("bg-secondary");
        expect(screen.getByRole("figure").firstChild).toHaveClass("bi-upload");
        expect(screen.getByRole("figure").firstChild).toHaveClass("text-secondary");
        expect(screen.getByRole("img")).toHaveClass("text-secondary");
        expect(screen.getByRole("note")).toHaveClass("text-secondary");
    });

    it("should display correctly with dropping bad file", async () => {
        //Act
        render(<UploadPage loggedIn={loggedIn} loginFinished={loginFinished} navigate={navigate} />);
        await fireEvent.drop(screen.getByRole("figure"), {
            dataTransfer: {
                files: [new File(["blob"], "video.mp4", { type: "video/mp4" })]
            }
        });

        //Assert
        expect(screen.getByRole("figure")).toHaveClass("bg-danger");
        expect(screen.getByRole("figure").firstChild).toHaveClass("bi-exclamation-lg");
        expect(screen.getByRole("figure").firstChild).toHaveClass("text-danger");
        expect(screen.getByRole("img")).toHaveClass("text-danger");
        expect(screen.getByRole("note")).toHaveClass("text-danger");
    });

    it("should display correctly with loading file details", async () => {
        //Act
        render(<UploadPage loggedIn={loggedIn} loginFinished={loginFinished} navigate={navigate} />);
        await fireEvent.drop(screen.getByRole("figure"), {
            dataTransfer: {
                files: [new File(["blob"], "video.webm", { type: "video/webm" })]
            }
        });

        //Assert
        expect(screen.getByRole("figure")).toHaveClass("bg-success");
        expect(screen.getByRole("figure").firstChild).toHaveClass("bi-upload");
        expect(screen.getByRole("figure").firstChild).toHaveClass("text-success");
        expect(screen.getByRole("img")).toHaveClass("text-success");
        expect(screen.getByRole("note")).toHaveClass("text-success");
    });
});