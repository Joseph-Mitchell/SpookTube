import { expect, vi } from "vitest";

import basicService from "../../src/services/basicService.js";
import updateEmail from "../../src/services/updateEmail.js";

vi.mock("../../src/services/basicService.js");

describe("updateEmail", () => {        
    it("should call basic service", async () => {
        //Act
        await updateEmail("", "");
        
        //Assert
        expect(basicService).toHaveBeenCalled();
    });
})