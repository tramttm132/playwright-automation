import { Page, Locator, expect } from '@playwright/test';

export class AdminDashboardPage {
    readonly page: Page;
    readonly dashboardHeading: Locator;
    readonly setupGuideHeading: Locator;
    readonly setupGuideDescription: Locator;

    constructor(page: Page) {
        this.page = page;

        this.dashboardHeading = page.getByRole('heading', {
        name: 'Dashboard',
        });

        this.setupGuideHeading = page.getByRole('heading', {
        level: 2,
        name: 'Setup Guide',
        });

        this.setupGuideDescription = page.locator(
        "//p[normalize-space()='Use this step-by-step guide to launch your store smoothly.']"
        );
    }

    async verifyDashboardVisible() {
        await expect(this.dashboardHeading).toBeVisible();
    }

    async verifySetupGuideVisible() {
        await expect(this.setupGuideHeading).toBeVisible();
        await expect(this.setupGuideDescription).toBeVisible();
    }
}