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

    it("should display next button as disabled if currentPage === pages", () => {
        //Arrange
        currentPage = pages;

        //Act
        render(<Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} />);

        //Assert
        expect(screen.getByText("Next")).toHaveClass("link-secondary");
    });

    it("should not display next button as disabled if currentPage < pages", () => {
        //Arrange
        currentPage = 2;

        //Act
        render(<Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} />);

        //Assert
        expect(screen.getByText("Next")).toHaveClass("link-primary");
    });

    it("should display correct amount of page buttons", () => {
        //Act
        render(<Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} />);

        //Assert
        expect(screen.queryAllByRole("switch")).toHaveLength(pages);
    });

    it("should only highlight correct button for currentPage", () => {
        //Arrange
        currentPage = 2;

        //Act
        render(<Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} />);

        //Assert
        const buttons = screen.queryAllByRole("switch");
        expect(buttons[0].firstChild).not.toHaveClass("bg-primary");
        expect(buttons[1].firstChild).toHaveClass("bg-primary");
        expect(buttons[2].firstChild).not.toHaveClass("bg-primary");
    });
});