import { expect, vi } from "vitest";

import basicService from "../../src/services/basicService.js";
import getUserVideos from "../../src/services/getUserVideos.js";

vi.mock("../../src/services/basicService.js");

describe("getUserVideos", () => {        
    it("should call basic service", async () => {
        //Act
        await getUserVideos("", "");
        
        //Assert
        expect(basicService).toHaveBeenCalled();
    });
})