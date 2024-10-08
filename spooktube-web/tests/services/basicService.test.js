import { expect, vi } from "vitest";

import axios from "axios";

import basicService from "../../src/services/basicService.js";

vi.mock("axios");

describe("basicService", () => {
    let method;
    let url;
    let data;
    let headers;
    let testAxiosReturn;
    
    import.meta.env.VITE_APP_BACKEND_URL = "backend/"
    
    beforeEach(() => {
        method = "get";
        url = "test/test";
        data = { test: "test" };
        headers = { authentication: "token" };
        testAxiosReturn = { data: "testData" };
    });
    
    afterEach(() => {
        method = undefined;
        url = undefined;
        data = undefined;
        headers = undefined;
        testAxiosReturn = undefined;
    })
    
    it("should return axios data in normal circumstances", async () => {
        //Arrange              
        axios.mockResolvedValueOnce(testAxiosReturn);
        
        //Act
        const actual = await basicService(method, url, data, headers);
        
        //Assert
        expect(actual).to.equal(testAxiosReturn.data);
        expect(axios).toBeCalledWith({ method: method, url: import.meta.env.VITE_APP_BACKEND_URL + url, headers: headers, data: data });
    });
    
    it("should return object with message if axios rejects", async () => {
        //Arrange
        axios.mockRejectedValueOnce({ response: {} });
        
        //Act
        const actual = await basicService(method, url, data, headers);
        
        //Assert
        expect(actual.message).toBeDefined();
    });
})