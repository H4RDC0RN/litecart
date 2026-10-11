import { test } from "@/fixtures/test";

test.describe('Invalid login', () => {
    test.use({ storageState: { cookies: [], origins: [] } });
    test('should show an error for incorrect password', async ({ loginPage }) => {
        await loginPage.login.submit(process.env.USER_EMAIL!, 'wrong-password', false);
        await loginPage.notices.expectWrongCredentialsError();
        await loginPage.notices.expectErrorReddish();
    });
});