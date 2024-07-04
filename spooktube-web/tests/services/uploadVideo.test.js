import { expect, vi } from "vitest";

import basicService from "../../src/services/basicService.js";
import uploadVideo from "../../src/services/uploadVideo.js";

vi.mock("../../src/services/basicService.js");

describe("uploadVideo", () => {        
    it("should call basic service", async () => {
        //Act
        await uploadVideo("", "");
        
        //Assert
        expect(basicService).toHaveBeenCalled();
    });
})