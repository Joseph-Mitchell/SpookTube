import { expect, vi } from "vitest";

import basicService from "../../src/services/basicService.js";
import getAllVideos from "../../src/services/getAllVideos.js";

vi.mock("../../src/services/basicService.js");

describe("getAllVideos", () => {        
    it("should call basic service", async () => {
        //Act
        await getAllVideos("", "");
        
        //Assert
        expect(basicService).toHaveBeenCalled();
    });
})