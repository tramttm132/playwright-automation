import { test } from '@playwright/test';
import { getAdminLoginLink } from '../../utils/auth/getAdminLoginLink';
import { AdminDashboardPage } from '../../pages/dashboard/dashboard.page';

test('Login from admin and verify dashboard is visible', async ({ page }) => {
    const dashboardPage = new AdminDashboardPage(page);

    await test.step('Login via admin link', async () => {
        await page.goto(await getAdminLoginLink(process.env.PROFESSIONAL_INSTAGRAM_SHOP_ID));
    });

    await test.step('Verify dashboard is visible', async () => {
        await dashboardPage.verifyDashboardVisible();
    });

    await test.step('Verify setup guide section is visible', async () => {
        await dashboardPage.verifySetupGuideVisible();
    });
});