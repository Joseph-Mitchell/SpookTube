import { expect, vi } from "vitest";

import basicService from "../../src/services/basicService.js";
import deleteVideo from "../../src/services/deleteVideo.js";

vi.mock("../../src/services/basicService.js");

describe("basicService", () => {        
    it("should call basic service", async () => {
        //Act
        await deleteVideo("", "");
        
        //Assert
        expect(basicService).toHaveBeenCalled();
    });
})