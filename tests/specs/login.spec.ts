import { test, expect } from '../fixtures/test';

test.describe('Login', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('should display an error message when logging in with invalid credentials', async ({ homePage }) => {
        // ...
    });
});