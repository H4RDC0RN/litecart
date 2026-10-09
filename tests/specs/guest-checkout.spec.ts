import { test, expect } from '../fixtures/test';

test.describe('Guest checkout', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('should allow placing an order without authentication', async ({ homePage }) => {
        // ...
    });
});