import { expect, vi } from "vitest";

import basicService from "../../src/services/basicService.js";
import getVideoComments from "../../src/services/getVideoComments.js";

vi.mock("../../src/services/basicService.js");

describe("getVideoComments", () => {        
    it("should call basic service", async () => {
        //Act
        await getVideoComments("", "");
        
        //Assert
        expect(basicService).toHaveBeenCalled();
    });
})