/**
 * @jest-environment jsdom
 */

import { handleSubmit } from '../src/client/js/formHandler';
import { validateURL } from '../src/client/js/urlValidator';

jest.mock('../src/client/js/urlValidator');

describe('handleSubmit', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <form id="urlForm">
                <input type="text" id="name" value="">
                <input type="submit" value="Submit">
            </form>
            <div id="results"></div>
        `;

        // Mock fetch to avoid real network requests
        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve({
                score_tag: 'P',
                agreement: 'AGREEMENT',
                subjectivity: 'SUBJECTIVE',
                confidence: '100',
                irony: 'NONIRONIC'
            })
        });

        // Ensure handleSubmit is registered
        const form = document.getElementById('urlForm');
        
        if (form) {
            form.addEventListener('submit', handleSubmit);
        } else {
            console.error('Form element not found');
        }
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('alerts if the URL is empty', () => {
        global.alert = jest.fn();
        document.getElementById('name').value = '';
        const event = new Event('submit');
        event.preventDefault = jest.fn();
        document.getElementById('urlForm').dispatchEvent(event);

        expect(global.alert).toHaveBeenCalledWith('Please enter a URL');
    });

    test('alerts if the URL is invalid', () => {
        global.alert = jest.fn();
        validateURL.mockReturnValue(false);

        document.getElementById('name').value = 'invalidURL';
        const event = new Event('submit');
        event.preventDefault = jest.fn();
        document.getElementById('urlForm').dispatchEvent(event);

        expect(global.alert).toHaveBeenCalledWith('Please enter a valid URL.');
    });

    test('sends a valid URL and updates the UI', async () => {
        validateURL.mockReturnValue(true);

        document.getElementById('name').value = 'http://validurl.com';
        const event = new Event('submit');
        event.preventDefault = jest.fn();
        await document.getElementById('urlForm').dispatchEvent(event);

        expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: 'http://validurl.com' }),
        });

        expect(document.getElementById('results').innerHTML).toBe(`
            <p>Sentiment: P</p>
            <p>Agreement: AGREEMENT</p>
            <p>Subjectivity: SUBJECTIVE</p>
            <p>Confidence: 100</p>
            <p>Irony: NONIRONIC</p>
        `);
    });

    test('handles fetch error', async () => {
        validateURL.mockReturnValue(true);
        global.alert = jest.fn();
        fetch.mockRejectedValue('Fetch error');

        const event = new Event('submit');
        event.preventDefault = jest.fn();
        await document.getElementById('urlForm').dispatchEvent(event);

        expect(console.error).toHaveBeenCalledWith('Error:', 'Fetch error');
        expect(global.alert).toHaveBeenCalledWith('There was an error processing your request.');
    });
});
