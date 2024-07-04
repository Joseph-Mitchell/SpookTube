import { expect, vi } from "vitest";

import basicService from "../../src/services/basicService.js";
import loginWithToken from "../../src/services/loginWithToken.js";

vi.mock("../../src/services/basicService.js");

describe("loginWithToken", () => {        
    it("should call basic service", async () => {
        //Act
        await loginWithToken("", "");
        
        //Assert
        expect(basicService).toHaveBeenCalled();
    });
})