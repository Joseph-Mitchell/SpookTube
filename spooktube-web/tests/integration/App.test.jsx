import { screen } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import App from "../../src/App.jsx";
import * as testVideos from "../data/getAllVideos.js";

vi.mock("../../src/services/getAllVideos.js", () => ({ default: () => { return testVideos.response; } }));

describe("Homepage", () => {
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

    it("should correctly display videoGrid and paginator", async () => {
        //Act
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );

        //Assert
        const videos = await screen.findAllByRole("gridcell");
        expect(videos).toHaveLength(18);
        expect(screen.getAllByRole("switch")).toHaveLength(2);
    });
});