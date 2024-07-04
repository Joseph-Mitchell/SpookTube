import { expect, vi } from "vitest";

import basicService from "../../src/services/basicService.js";
import postComment from "../../src/services/postComment.js";

vi.mock("../../src/services/basicService.js");

describe("postComment", () => {        
    it("should call basic service", async () => {
        //Act
        await postComment("", "");
        
        //Assert
        expect(basicService).toHaveBeenCalled();
    });
})