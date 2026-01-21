import { test } from '@playwright/test';
import { getAdminLoginLink } from '../../utils/adminAuth';
import { MediaSourcePage } from '../../pages/media-sources/source-list.page';

test('Login from admin and verify dashboard is visible', async ({ page }) => {
    const mediaSourcePage = new MediaSourcePage(page);

    await test.step('Login via admin link', async () => {
        await page.goto(await getAdminLoginLink());
    });

    await test.step('Open Media Source Page', async () => {
        await mediaSourcePage.clickMediaSourceButton();
    });

    await test.step('Verify page is visible', async () => {
        await mediaSourcePage.verifySourcePageVisible();
    });
});