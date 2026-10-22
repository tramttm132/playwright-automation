import { test, expect } from '@playwright/test';
import { getAdminLoginLink } from '../../../utils/auth/getAdminLoginLink';
import { MediaSourcePage } from '../../../pages/media-sources/media-source-list.page';
import { AddMediaSourceModal } from '../../../pages/media-sources/add-media-source-modal.page';
import { AddMediaSourcePage } from '../../../pages/media-sources/add-media-source-page.page';

let mediaSourcePage: MediaSourcePage;
let addMediaSourceModal: AddMediaSourceModal;

test.beforeEach(async ({ page }) => {

    mediaSourcePage = new MediaSourcePage(page);
    addMediaSourceModal = new AddMediaSourceModal(page);

    await page.goto(await getAdminLoginLink(process.env.PROFESSIONAL_INSTAGRAM_SHOP_ID));
    await mediaSourcePage.clickMediaSourceTab();
    await mediaSourcePage.clickAddMediaSourceButtonFromHeader();
});

test('Validate input with empty name field', async () => {
    await test.step('Attempt to create media source with empty name field', async () => {
        await addMediaSourceModal.fillInMediaSourceInformationAndCreate(
            '',
            'Instagram'
        );
        await addMediaSourceModal.nextButton.click();
    });
    await test.step('Verify error message is visible', async () => {
        await expect(addMediaSourceModal.errorMessage).toBeVisible();
    });
});

test('Validate input with name exceeding max length', async () => {
    const longName = 'a'.repeat(121);
    await test.step('Attempt to create media source with name exceeding max length', async () => {
        await addMediaSourceModal.fillInMediaSourceInformationAndCreate(
            longName,
            'Instagram'
        );

    });
    await test.step('Validate input with name exceeding max length', async () => {
        const value = await addMediaSourceModal.sourceNameInputField.inputValue();
        expect(value.length).toBeLessThanOrEqual(120);
        await expect(addMediaSourceModal.maxNameLength).toBeVisible();
    });
});