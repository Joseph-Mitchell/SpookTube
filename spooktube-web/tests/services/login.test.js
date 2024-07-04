import { expect, vi } from "vitest";

import basicService from "../../src/services/basicService.js";
import login from "../../src/services/login.js";

vi.mock("../../src/services/basicService.js");

describe("login", () => {        
    it("should call basic service", async () => {
        //Act
        await login("", "");
        
        //Assert
        expect(basicService).toHaveBeenCalled();
    });
})