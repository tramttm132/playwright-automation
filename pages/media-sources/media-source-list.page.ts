import { Page, Locator, expect } from '@playwright/test';

export class MediaSourcePage {
    readonly page: Page;
    readonly mediaSourceTab: Locator;
    readonly mediaSourceHeading: Locator;
    readonly addSourceButtonFromHeader: Locator;
    readonly emptyStateHeading: Locator;
    readonly emptyStateDescription: Locator;
    readonly addSourceButtonFromEmptyState: Locator;
    readonly upgradeTag: Locator;
    readonly upgradeTooltip: Locator;

    constructor(page: Page) {
        this.page = page;

        this.mediaSourceTab = page.locator(
            "//div[normalize-space(.)='Media Sources']"
        );

        this.mediaSourceHeading = page.getByRole('heading', {
            name: 'All media sources',
        });

        this.addSourceButtonFromHeader = page.getByRole('button', { name: /Add new source \(\d+\/\d+\)/ });

        this.emptyStateHeading = page.getByRole('heading', {
            name: 'There are no items to show',
        });

        this.emptyStateDescription = page.getByText('Create your first media source to get media from your social accounts.');

        this.addSourceButtonFromEmptyState = page.getByRole('button', { name: 'Add new source', exact: true });

        this.upgradeTag = page.getByText('Upgrade plan');

        this.upgradeTooltip = page.getByText('Upgrade to Standard or higher plans to add more sources');
    }

    async clickMediaSourceTab(){
        await this.mediaSourceTab.click();
    }

    async clickAddMediaSourceButtonFromHeader() {
        await this.addSourceButtonFromHeader.click();
    }

    async clickAddMediaSourceButtonFromEmptyState() {
        await this.addSourceButtonFromEmptyState.click();
    }

    async getRowByName(sourceName: string) {
        return this.page.getByText(sourceName, { exact: true });
    }
    async openRowAction(name: string) {
        const row = this.page.locator(`//tr[.//span[normalize-space()='${name}']]`);
        await row.locator("button").click();
    }

    async deleteRow(name: string) {
        await this.openRowAction(name);
        await this.page.getByRole('menuitem', { name: 'Delete' }).click();
        await this.page.getByRole('button', { name: 'Delete' }).click();
        await this.page.waitForTimeout(1000);
    }

    async ensureSourceIsDeleted() {
        let isEmptyStateVisible = await this.emptyStateHeading
            .isVisible({timeout: 3000})
            .catch(() => false);
        if (!isEmptyStateVisible) {
            await this.page.reload();
            
            isEmptyStateVisible = await this.emptyStateHeading
            .isVisible({timeout: 3000})
            .catch(() => false);
        }
    }
}