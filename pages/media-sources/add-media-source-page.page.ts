import { Locator, Page } from "@playwright/test";
export class AddMediaSourcePage {
    readonly page: Page;
    readonly addMediaSourcePageHeading: Locator;
    readonly mediaSourceNameInputFieldLabel: Locator;
    readonly mediaSourceNameInputField: Locator;
    readonly mediaSourceTypeDropdownLabel: Locator;
    readonly mediaSourceTypeField: Locator;
    readonly autoSyncToggle: Locator;
    readonly autoSyncDropdown: Locator;
    readonly discardButton: Locator;
    readonly saveButton: Locator;

    readonly bannerDisconnected: Locator;

    readonly profileTypeTab: Locator;
    readonly customProfileRadio: Locator;
    readonly customProfileNameInputField: Locator;
    readonly hashtagTypeTab: Locator;
    readonly hashtagInputField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addMediaSourcePageHeading = page.getByRole('heading', {
            level: 1,
            name: 'Add new media source',
        });
        this.mediaSourceNameInputFieldLabel = page.getByLabel('Name this source');
        this.mediaSourceNameInputField = page.getByPlaceholder('Please enter...')
        this.mediaSourceTypeDropdownLabel = page.getByText('Media source type');
        this.mediaSourceTypeField = page.getByRole('button', { name: /Instagram|TikTok/ });
        
        this.autoSyncToggle = page.locator('.switch').first();
        this.autoSyncDropdown = page.getByRole('button', {
            name: 'Daily',
        });
        this.discardButton = page.getByRole('button', {
            name: 'Discard',
        });
        this.saveButton = page.getByRole('button', {
            name: 'Save',
        });
        this.bannerDisconnected = page.getByRole('heading', { name: 'Account disconnected' });
        this.profileTypeTab = page.getByRole('button', { name: 'Profile' });
        this.customProfileRadio = page.getByRole('radio', { name: 'Other Instagram Professional Profile' });
        this.customProfileNameInputField = page.getByPlaceholder('Instagram Profile');
        this.hashtagTypeTab = page.getByRole('button', { name: 'Hashtag' });
        this.hashtagInputField = page.getByPlaceholder('Please enter hashtag');

    }

    async checkBannerDisconnectedVisible() {
        const bannerVisible = await this.bannerDisconnected.isVisible();
        if (bannerVisible) {
            throw new Error('Stop test - Account disconnected');
        }
    }

    async clickSaveButton() {
        await this.saveButton.click();
    }
}