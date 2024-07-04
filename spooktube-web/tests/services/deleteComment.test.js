import { expect, vi } from "vitest";

import basicService from "../../src/services/basicService.js";
import deleteComment from "../../src/services/deleteComment.js";

vi.mock("../../src/services/basicService.js");

describe("basicService", () => {        
    it("should call basic service", async () => {
        //Act
        await deleteComment("", "");
        
        //Assert
        expect(basicService).toHaveBeenCalled();
    });
})