const { checkForUrl } = require("../src/client/js/urlChecker");

describe('check For Url is Valid', () => {
    test('Text is not URL', () => {
        expect(checkForUrl("read")).toBeFalsy();  // Text without protocol
    });

    test('Emails is not URL', () => {
        expect(checkForUrl("mailto:tiendungnguyen.4476@gmail.com")).toBeFalsy();  // Email addresses
    });

    test('https://dantri.com.vn/ is good url', () => {
        expect(checkForUrl("https://dantri.com.vn/")).toBeTruthy();  // Valid URL
    });

});

describe("Testing url validation functionality for legitimate urls", function () {
    test("it should match the expected URL", function () {
      const urlRGEX =
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
      const urlTest = "http://google.com/"; // Accepted URL
      expect(urlRGEX.test(urlTest)).toBe(true); // Expecting a match
    });
  });