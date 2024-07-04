import { expect, vi } from "vitest";

import basicService from "../../src/services/basicService.js";
import register from "../../src/services/register.js";

vi.mock("../../src/services/basicService.js");

describe("register", () => {        
    it("should call basic service", async () => {
        //Act
        await register("", "");
        
        //Assert
        expect(basicService).toHaveBeenCalled();
    });
})