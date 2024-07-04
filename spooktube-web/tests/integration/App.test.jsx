import { screen } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import App from "../../src/App.jsx";

import * as testVideos from "../data/getAllVideos.js";
import WatchPage from "../../src/components/pages/Watch/WatchPage.jsx";
import loginWithToken from "../../src/services/loginWithToken.js";

vi.mock("../../src/services/loginWithToken.js", () => ({ default: () => { return { username: "user", icon: "0", role: "user" }; } }));
vi.mock("../../src/services/getAllVideos.js", () => ({ default: () => { return testVideos.response; } }));

describe("Integration", () => {
    describe("Homepage", () => {
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

    describe("WatchPage", () => {
        let user;

        beforeEach(() => {
            user = userEvent.setup();
        });

        afterEach(() => {
            user = undefined;
        });

        it("should set comment section height on window resize", async () => {
            global.cloudinary = { videoPlayer: () => { } };
            Element.prototype.scrollTo = () => { };
            //Act
            render(
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            );
            await user.click((await screen.findAllByRole("gridcell"))[0].firstChild.firstChild);
            global.dispatchEvent(new Event("resize"));

            //Assert
            const videoHeight = screen.getByRole("main").offsetHeight;
            expect(screen.getByRole("group").offsetHeight).toEqual(videoHeight);
        });
    });
});