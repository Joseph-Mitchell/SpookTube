import { expect, vi } from "vitest";

import basicService from "../../src/services/basicService.js";
import editComment from "../../src/services/editComment.js";

vi.mock("../../src/services/basicService.js");

describe("editComment", () => {        
    it("should call basic service", async () => {
        //Act
        await editComment("", "");
        
        //Assert
        expect(basicService).toHaveBeenCalled();
    });
})