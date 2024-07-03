import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { afterEach, beforeEach, vi } from 'vitest';

import VideoCard from "../../../src/components/common/VideoCard.jsx";

vi.mock("react-router-dom");

describe("VideoCard", () => {
    let video;
    let clickDeleteVideo;

    beforeEach(() => {
        video = { videoId: "test" };
        clickDeleteVideo = vi.fn();
    });

    afterEach(() => {
        video = undefined;
        clickDeleteVideo = undefined;
    });

    it("should display thumbnail with expected src if video not undefined", () => {
        //Act
        render(<VideoCard video={video} clickDeleteVideo={clickDeleteVideo} />);

        //Assert
        expect(screen.getByAltText("Video Thumbnail")).toHaveAttribute("src", `https://res.cloudinary.com/drtoipa5f/video/upload/w_250/${video.videoId}.jpg`);
    });

    it("should display thumbnail with expected src if video undefined", () => {
        //Arrange
        video = undefined;

        //Act
        render(<VideoCard video={video} clickDeleteVideo={clickDeleteVideo} />);

        //Assert
        expect(screen.getByAltText("Video Thumbnail")).toHaveAttribute("src", "thumb-placeholder.png");
    });

    it("should display delete button if clickDeleteVideo is defined", () => {
        //Act
        render(<VideoCard video={video} clickDeleteVideo={clickDeleteVideo} />);

        //Assert
        expect(screen.getByRole("button")).not.toHaveClass("d-none");
    });
});