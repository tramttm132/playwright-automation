import { test, expect } from '@playwright/test';
import { getAdminLoginLink } from '../../../utils/auth/getAdminLoginLink';
import { MediaSourcePage } from '../../../pages/media-sources/media-source-list.page';
import { AddMediaSourceModal } from '../../../pages/media-sources/add-media-source-modal.page';
import { AddMediaSourcePage } from '../../../pages/media-sources/add-media-source-page.page';

let mediaSourcePage: MediaSourcePage;
let addMediaSourceModal: AddMediaSourceModal;
let addMediaSourcePage: AddMediaSourcePage;


test.beforeEach(async ({ page }) => {

    mediaSourcePage = new MediaSourcePage(page);
    addMediaSourceModal = new AddMediaSourceModal(page);
    addMediaSourcePage = new AddMediaSourcePage(page);

    await page.goto(await getAdminLoginLink(process.env.PROFESSIONAL_INSTAGRAM_SHOP_ID));
    await mediaSourcePage.clickMediaSourceTab();
    await mediaSourcePage.clickAddMediaSourceButtonFromHeader();
});

test('Verify account connected tooltip is visible', async () => {
    const sourceName = `media-source-${Date.now()}`;
    const mediaSourceType = 'Instagram';

    await test.step('Fill in media source information and create', async () => {
        await addMediaSourceModal.fillInMediaSourceInformationAndCreate(
            sourceName,
            mediaSourceType
        );
        await addMediaSourceModal.nextButton.click();
    });
    await test.step('Verify media source details are correct on the add media source page and Save media source', async () => {
        await expect(addMediaSourcePage.mediaSourceNameInputField).toHaveValue(sourceName);
        await addMediaSourcePage.clickSaveButton();
    });

    await test.step('Verify the account connected and tooltip', async () => {
        await mediaSourcePage.clickAddMediaSourceButtonFromHeader();
        await expect(addMediaSourceModal.accountConnectedTooltipIcon).toBeVisible();
        await addMediaSourceModal.accountConnectedTooltipIcon.hover();
        const tooltipContent = addMediaSourceModal.accountConnectedTooltipContent;
        await expect(tooltipContent).toBeVisible();
        await expect(tooltipContent).toHaveText('This account has already been connected to an existing media source');
    });
    await test.step('Cleanup - delete the created source', async () => {
        await addMediaSourceModal.cancelButton.click();
        await mediaSourcePage.deleteRow(sourceName);
    });
});