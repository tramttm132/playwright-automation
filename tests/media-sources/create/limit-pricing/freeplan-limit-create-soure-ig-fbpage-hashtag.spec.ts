import { test, expect } from '@playwright/test';
import { getAdminLoginLink } from '../../../../utils/auth/getAdminLoginLink';
import { MediaSourcePage } from '../../../../pages/media-sources/media-source-list.page';
import { AddMediaSourceModal } from '../../../../pages/media-sources/add-media-source-modal.page';
import { AddMediaSourcePage } from '../../../../pages/media-sources/add-media-source-page.page';

let mediaSourcePage: MediaSourcePage;
let addMediaSourceModal: AddMediaSourceModal;
let addMediaSourcePage: AddMediaSourcePage;


test.beforeEach(async ({ page }) => {

    mediaSourcePage = new MediaSourcePage(page);
    addMediaSourceModal = new AddMediaSourceModal(page);
    addMediaSourcePage = new AddMediaSourcePage(page);

    await page.goto(await getAdminLoginLink(process.env.FREE_INSTAGRAM_SHOP_ID));
    await mediaSourcePage.clickMediaSourceTab();
    await mediaSourcePage.clickAddMediaSourceButtonFromHeader();
});

test('Limit pricing - Create only 1 source', async () => {
    const sourceName = `media-source-${Date.now()}`;
    const mediaSourceType = 'Instagram with Facebook page';
    const hashtag = 'vietnamtravel';

    await expect(addMediaSourceModal.mediaSourceModal).toBeVisible();
    await test.step('Fill in media source information and create', async () => {
        await addMediaSourceModal.fillInMediaSourceInformationAndCreate(
            sourceName,
            mediaSourceType
        );
        await addMediaSourceModal.clickAndFillHashtag(hashtag);
        await addMediaSourceModal.nextButton.click();
    });
    await test.step('Verify user cannot create more than 1 source', async () => {
        await expect(mediaSourcePage.addSourceButtonFromHeader).toBeDisabled();
        const upgradeTag = mediaSourcePage.upgradeTag;
        await expect(upgradeTag).toBeVisible();
        await upgradeTag.hover();
        const upgradeTooltip = mediaSourcePage.upgradeTooltip;
        await expect(upgradeTooltip).toBeVisible();
        await expect(upgradeTooltip).toHaveText('Upgrade to Standard or higher plans to add more sources');
        //verify clicking on upgrade tag will navigate user to pricing page
        await upgradeTag.click();
        await expect(mediaSourcePage.page).toHaveURL(/.*\/pricing/);
    });
    await test.step('Cleanup - delete the created source', async () => {
        await mediaSourcePage.clickMediaSourceTab();
        await mediaSourcePage.deleteRow(sourceName);
    });
});
