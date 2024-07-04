import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { afterEach, beforeEach, vi } from 'vitest';

import VideoGrid from "../../../src/components/common/VideoGrid.jsx";

vi.mock("../../../src/components/common/VideoCard.jsx", () => ({ default: () => <div data-testid="video-card"></div> }));

describe("VideoGrid", () => {
    let videos;
    let clickDeleteVideo;
    let user;
    let setBackgroundHeight;

    beforeEach(() => {
        videos = Array(20);
        clickDeleteVideo = vi.fn();
        user = false;
        setBackgroundHeight = vi.fn();
    });

    afterEach(() => {
        videos = undefined;
        clickDeleteVideo = undefined;
        user = undefined;
        setBackgroundHeight = undefined;
    });

    it("should display correct number of VideoCard components", async () => {
        //Act
        render(<VideoGrid videos={videos} clickDeleteVideo={clickDeleteVideo} user={user} setBackgroundHeight={setBackgroundHeight} />);

        //Assert
        const cards = await screen.findAllByTestId("video-card");
        expect(cards).toHaveLength(videos.length);
    });

    it("should display grid background if user false", async () => {
        //Act
        render(<VideoGrid videos={videos} clickDeleteVideo={clickDeleteVideo} user={user} setBackgroundHeight={setBackgroundHeight} />);

        //Assert
        expect(screen.getByRole("grid")).toHaveClass("bg-secondary-subtle");
    });

    it("should display grid background if user false", async () => {
        //Arrange
        user = true;

        //Act
        render(<VideoGrid videos={videos} clickDeleteVideo={clickDeleteVideo} user={user} setBackgroundHeight={setBackgroundHeight} />);

        //Assert
        expect(screen.getByRole("grid")).toHaveClass("bg-transparent");
    });
});