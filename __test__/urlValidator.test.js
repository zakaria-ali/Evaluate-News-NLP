import { validateURL } from '../src/client/js/urlValidator';

describe('validateURL', () => {
    test('should return true for a valid http URL', () => {
        const url = 'http://example.com';
        expect(validateURL(url)).toBe(true);
    });

    test('should return true for a valid https URL', () => {
        const url = 'https://example.com';
        expect(validateURL(url)).toBe(true);
    });

    test('should return true for a valid ftp URL', () => {
        const url = 'ftp://example.com';
        expect(validateURL(url)).toBe(true);
    });

    test('should return false for an invalid URL without protocol', () => {
        const url = 'example.com';
        expect(validateURL(url)).toBe(false);
    });

    test('should return false for an invalid URL with spaces', () => {
        const url = 'http://example .com';
        expect(validateURL(url)).toBe(false);
    });

    test('should return false for a string that is not a URL', () => {
        const url = 'this is not a url';
        expect(validateURL(url)).toBe(false);
    });
});
