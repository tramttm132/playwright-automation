import { expect, test } from '@playwright/test';
//import dotenv from 'dotenv';
import { getAdminLoginLink } from '../../utils/auth/getAdminLoginLink';
import { MediaSourcePage } from '../../pages/media-sources/media-source-list.page';
import { AddMediaSourceModal } from '../../pages/media-sources/add-media-source-modal.page';
import { AddMediaSourcePage } from '../../pages/media-sources/add-media-source-page.page';
test.describe('Media Source List Page', () => {
    let mediaSourcePage: MediaSourcePage;
    let addMediaSourceModal: AddMediaSourceModal;
    let addMediaSourcePage: AddMediaSourcePage;
    
    test.beforeEach(async ({ page }) => {

        mediaSourcePage = new MediaSourcePage(page);
        addMediaSourceModal = new AddMediaSourceModal(page);
        addMediaSourcePage = new AddMediaSourcePage(page);

        await page.goto(await getAdminLoginLink(process.env.PROFESSIONAL_INSTAGRAM_SHOP_ID));
        await mediaSourcePage.clickMediaSourceTab();
    });
    
    test('Verify empty state is visible', async ({ page }) => {
        await expect(mediaSourcePage.mediaSourceHeading).toBeVisible();

        await test.step('Verify empty state is visible', async () => {
            await mediaSourcePage.ensureSourceIsDeleted();
            await expect(mediaSourcePage.emptyStateHeading).toBeVisible();
            await expect(mediaSourcePage.emptyStateDescription).toBeVisible();
            await expect(mediaSourcePage.addSourceButtonFromEmptyState).toBeVisible();
        });

        await test.step('Click on create media source button from empty state', async () => {
            await mediaSourcePage.clickAddMediaSourceButtonFromEmptyState();
        });

        await test.step('Verify create media source modal is visible', async () => {
            await expect(addMediaSourceModal.mediaSourceModal).toBeVisible();
        });
    });

    test('Verify create media source modal is visible after clicking add media source button from header', async ({ page }) => {

        await test.step('Click on create media source button from header', async () => {
            await mediaSourcePage.clickAddMediaSourceButtonFromHeader();
        });

        await test.step('Verify create media source modal is visible', async () => {
            await expect(addMediaSourceModal.mediaSourceModal).toBeVisible();
        });
    });
});