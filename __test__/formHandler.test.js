const { handleSubmit } = require("../src/client/js/formHandler");

// Mock the 'formHandler' module
jest.mock('../src/client/js/formHandler', () => ({
    handleSubmit: jest.fn()  // Mock the 'handleSubmit' function
  }));
  
  describe('Test, the function "handleSubmit()" should exist', () => {
    test("It should return true", () => {
      const { handleSubmit } = require("../src/client/js/formHandler");
      expect(handleSubmit).toBeDefined();
    });
  });
  
  describe('Test, the function "handleSubmit()" should be a function', () => {
    test("It should be a function", () => {
      const { handleSubmit } = require("../src/client/js/formHandler");
      expect(typeof handleSubmit).toBe("function");
    });
  });