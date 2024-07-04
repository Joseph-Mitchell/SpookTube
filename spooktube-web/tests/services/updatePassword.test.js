import { expect, vi } from "vitest";

import basicService from "../../src/services/basicService.js";
import updatePassword from "../../src/services/updatePassword.js";

vi.mock("../../src/services/basicService.js");

describe("updatePassword", () => {        
    it("should call basic service", async () => {
        //Act
        await updatePassword("", "");
        
        //Assert
        expect(basicService).toHaveBeenCalled();
    });
})