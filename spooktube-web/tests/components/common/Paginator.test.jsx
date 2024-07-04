import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { afterEach, beforeEach, it, vi } from 'vitest';

import Paginator from "../../../src/components/common/Paginator.jsx";

describe("Paginator", () => {
    let currentPage;
    let setCurrentPage;
    let pages;

    beforeEach(() => {
        currentPage = 1;
        setCurrentPage = vi.fn();
        pages = 3;
    });

    afterEach(() => {
        currentPage = undefined;
        setCurrentPage = undefined;
        pages = undefined;
    });

    it("should display previous button as disabled if currentPage is 1", () => {
        //Act
        render(<Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} />);

        //Assert
        expect(screen.getByText("Previous")).toHaveClass("link-secondary");
    });

    it("should not display previous button as disabled if currentPage is > 1", () => {
        //Arrange
        currentPage = 2;

        //Act
        render(<Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} />);

        //Assert
        expect(screen.getByText("Previous")).toHaveClass("link-primary");
    });
});