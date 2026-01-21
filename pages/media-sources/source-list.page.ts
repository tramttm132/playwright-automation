import { Page, Locator, expect } from '@playwright/test';

export class MediaSourcePage {
    readonly page: Page;
    readonly mediaSourceButton: Locator;
    readonly mediaSourceHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        this.mediaSourceButton = page.locator(
            "//div[normalize-space(.)='Media Sources']"
        );

        this.mediaSourceHeading = page.getByRole('heading', {
            name: 'All media sources',
        });

    }

    async clickMediaSourceButton(){
        await expect(this.mediaSourceButton).toBeVisible();
        await this.mediaSourceButton.click();
    }

    async verifySourcePageVisible() {
        await expect(this.mediaSourceHeading).toBeVisible();
    }
}