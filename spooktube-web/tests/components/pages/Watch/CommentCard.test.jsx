import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { afterEach, beforeEach, it, vi } from 'vitest';

import CommentCard from "../../../../src/components/pages/Watch/CommentCard.jsx";

describe("CommentCard", () => {
    let comment;
    let currentVideoTime;
    let clickEditComment;

    beforeEach(() => {
        comment = { _id: "1", userId: { username: "", icon: "placeholder" }, timeCode: 0 };
        currentVideoTime = 1.5;
        clickEditComment = vi.fn();
    });

    afterEach(() => {
        comment = undefined;
        currentVideoTime = undefined;
        clickEditComment = undefined;
    });

    it("should display comment if currentVideoTime > comment timeCode", () => {
        //Act
        render(<CommentCard comment={comment} currentVideoTime={currentVideoTime} clickEditComment={clickEditComment} />);

        //Assert
        expect(screen.getByRole("comment")).not.toHaveClass("d-none");
    });
});