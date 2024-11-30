const { checkForUrl } = require("../client/js/urlChecker");

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
