import { expect, vi } from "vitest";

import basicService from "../../src/services/basicService.js";
import getAllComments from "../../src/services/getAllComments.js";

vi.mock("../../src/services/basicService.js");

describe("getAllComments", () => {        
    it("should call basic service", async () => {
        //Act
        await getAllComments("", "");
        
        //Assert
        expect(basicService).toHaveBeenCalled();
    });
})