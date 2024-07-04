import { expect, vi } from "vitest";

import basicService from "../../src/services/basicService.js";
import getUserComments from "../../src/services/getUserComments.js";

vi.mock("../../src/services/basicService.js");

describe("getUserComments", () => {        
    it("should call basic service", async () => {
        //Act
        await getUserComments("", "");
        
        //Assert
        expect(basicService).toHaveBeenCalled();
    });
})