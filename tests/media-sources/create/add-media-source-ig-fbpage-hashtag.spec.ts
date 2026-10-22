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

    await page.goto(await getAdminLoginLink(process.env.ADVANCED_IG_FACEBOOKPAGE_SHOP_ID));
    await mediaSourcePage.clickMediaSourceTab();
    await mediaSourcePage.clickAddMediaSourceButtonFromHeader();
});

test('Create new Facebook source with hashtag', async () => {
    const sourceName = `media-source-${Date.now()}`;
    const mediaSourceType = 'Instagram with Facebook page';
    const hashtag = 'honson';

    await expect(addMediaSourceModal.mediaSourceModal).toBeVisible();
    await test.step('Fill in media source information and create', async () => {
        await addMediaSourceModal.fillInMediaSourceInformationAndCreate(
            sourceName,
            mediaSourceType
        );
        await addMediaSourceModal.clickAndFillHashtag(hashtag);
        await addMediaSourceModal.nextButton.click();
    });
    await test.step('Verify media source details are correct on the add media source page and Save media source', async () => {
        await addMediaSourcePage.checkBannerDisconnectedVisible();
        await expect(addMediaSourcePage.addMediaSourcePageHeading).toBeVisible();
        await expect(addMediaSourcePage.mediaSourceNameInputField).toHaveValue(sourceName);
        await expect(addMediaSourcePage.mediaSourceTypeField).toHaveText(mediaSourceType);
        await expect(addMediaSourcePage.autoSyncDropdown).toHaveText('Daily');
        await expect(addMediaSourcePage.hashtagInputField).toHaveValue(hashtag);
        await addMediaSourcePage.clickSaveButton();
    });
    await test.step('Verify the source is created and visible in the list', async () => { 
        await expect(await mediaSourcePage.getRowByName(sourceName)).toBeVisible();
    });
    await test.step('Cleanup - delete the created source', async () => {
        await mediaSourcePage.deleteRow(sourceName);
    });
});