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

    test('http://example.com is good url', () => {
        expect(checkForUrl("http://example.com")).toBeTruthy();  // Valid URL with http
    });

    test('URL with query parameters is valid', () => {
        expect(checkForUrl("https://www.example.com/search?q=test")).toBeTruthy();  // URL with query parameters
    });

    test('URL with fragment is valid', () => {
        expect(checkForUrl("https://www.example.com#section")).toBeTruthy();  // URL with fragment (hash)
    });


    test('Invalid URL with random characters', () => {
        expect(checkForUrl("htp://invalid-url")).toBeFalsy();  // Invalid protocol (htp instead of http)
    });

    test('Empty string is not URL', () => {
        expect(checkForUrl("")).toBeFalsy();  // Empty string is invalid
    });


    test('URL with multiple subdomains is valid', () => {
        expect(checkForUrl("https://subdomain.example.com")).toBeTruthy();  // URL with multiple subdomains
    });

    test('URL with query parameters and fragment is valid', () => {
        expect(checkForUrl("https://example.com/path?query=1#fragment")).toBeTruthy();  // URL with both query parameters and fragment
    });

    test('Invalid URL with special characters in domain', () => {
        expect(checkForUrl("https://example@domain.com")).toBeFalsy();  // Invalid URL with special characters like @ in domain
    });

    test('URL with trailing slash is valid', () => {
        expect(checkForUrl("https://www.example.com/")).toBeTruthy();  // URL with trailing slash
    });


});
