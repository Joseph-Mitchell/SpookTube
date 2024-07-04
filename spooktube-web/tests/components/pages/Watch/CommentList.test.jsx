import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { afterEach, beforeEach, it, vi } from 'vitest';

import CommentList from "../../../../src/components/pages/Watch/CommentList.jsx";

vi.mock("../../../../src/components/pages/Watch/CommentCard.jsx", () => ({ default: () => <div data-testid="comment-card"></div> }));
vi.mock("../../../../src/components/pages/Watch/CommentForm.jsx", () => ({ default: () => <div data-testid="comment-form"></div> }));

vi.mock("../../../../src/services/getVideoComments.js", () => ({ default: () => { return { comments: [{ timeCode: 0 }, { timeCode: 1 }, { timeCode: 2 }, { timeCode: 4 }, { timeCode: 5 },] }; } }));
vi.mock("../../../../src/services/postComment.js", () => ({ default: () => { return { comment: { timeCode: 3 } }; } }));

describe("CommentCard", () => {
    window.HTMLElement.prototype.scrollTo = () => { };

    let videoHeight;
    let currentVideoTime;
    let videoId;
    let loggedIn;

    beforeEach(() => {
        videoHeight = 200;
        currentVideoTime = 1.5;
        videoId = "test";
        loggedIn = false;
    });

    afterEach(() => {
        videoHeight = undefined;
        currentVideoTime = undefined;
        videoId = undefined;
        loggedIn = undefined;
    });

    it("should display correct number of comments", async () => {
        //Act
        render(<CommentList videoHeight={videoHeight} currentVideoTime={currentVideoTime} videoId={videoId} loggedIn={loggedIn} />);

        //Assert
        const comments = await screen.findAllByTestId("comment-card");
        expect(comments).toHaveLength(5);
    });
});