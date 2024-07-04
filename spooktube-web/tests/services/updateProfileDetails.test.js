import { expect, vi } from "vitest";

import basicService from "../../src/services/basicService.js";
import updateProfileDetails from "../../src/services/updateProfileDetails.js";

vi.mock("../../src/services/basicService.js");

describe("updateProfileDetails", () => {        
    it("should call basic service", async () => {
        //Act
        await updateProfileDetails("", "");
        
        //Assert
        expect(basicService).toHaveBeenCalled();
    });
})