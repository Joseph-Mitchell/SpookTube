import { screen } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import * as testComments from "../../../data/getUserComments.data.js";

import CommentGrid from "../../../../src/components/pages/My Content/CommentGrid.jsx";

vi.mock("../../../../src/services/getUserComments.js", () => ({ default: () => { return testComments.response; } }));
vi.mock("../../../../src/services/getAllComments.js", () => ({ default: () => { return {}; } }));
vi.mock("../../../../src/components/pages/Watch/CommentCard.jsx", () => ({ default: () => { return (<div data-testid="comment-card"></div>); } }));

describe("CommentGrid", () => {
    let currentPage;
    let setPages;
    let clickEditComment;
    let role;
    let loginFinished;
    let currentTab;
    let setBackgroundHeight;

    beforeEach(() => {
        currentPage = 1;
        setPages = vi.fn();
        clickEditComment = vi.fn();
        role = "user";
        loginFinished = true;
        currentTab = "videos";
        setBackgroundHeight = vi.fn();
    });

    afterEach(() => {
        currentPage = undefined;
        setPages = undefined;
        clickEditComment = undefined;
        role = undefined;
        loginFinished = undefined;
        currentTab = undefined;
        setBackgroundHeight = undefined;
    });

    it("should have the correct amount of comments", async () => {
        //Act
        render(<CommentGrid currentPage={currentPage} setPages={setPages} clickEditComment={clickEditComment} role={role} loginFinished={loginFinished} currentTab={currentTab} setBackgroundHeight={setBackgroundHeight} />);

        //Assert
        expect((await screen.findAllByTestId("comment-card"))).toHaveLength(10);
    });
});