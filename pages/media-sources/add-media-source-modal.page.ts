import { Locator, Page } from "@playwright/test";
export class AddMediaSourceModal {
    readonly page: Page;
    readonly mediaSourceModal: Locator;
    // readonly closeModalButton: Locator;
    readonly medialSourceModalHeading: Locator;
    readonly sourceNameInputLabel: Locator;
    readonly sourceNameInputField: Locator;
    readonly sourceNameCounter: Locator;
    readonly mediaSourceTypeLabel: Locator;
    readonly mediaSourceTypeDropdownLabel: Locator;
    readonly mediaSourceTypeDropdown: Locator;
    readonly profileTypeTab: Locator;
    readonly disconnectedProfileRadio: Locator;
    readonly customProfileTab: Locator;
    readonly customProfileNameInputField: Locator;
    readonly hashtagTypeTab: Locator;
    readonly hashtagInputField: Locator;
    readonly accountLabel: Locator;
    readonly addNewAccountButton: Locator;
    readonly nextButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;
    readonly maxNameLength: Locator;
    readonly accountConnectedTooltipIcon: Locator;
    readonly accountConnectedTooltipContent: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.mediaSourceModal = page.locator(
            "//div[@role='dialog' and @aria-modal='true']"
        );
        this.medialSourceModalHeading = page.getByRole('heading', {
            level: 2,
            name: 'Add new media source',
        });
        this.sourceNameInputLabel = page.getByLabel('Name you media source');
        //this.sourceNameInputField = page.getByPlaceholder('Please enter...')
        this.sourceNameInputField = page.getByRole('textbox', { name: 'Name you media source' });
        this.sourceNameCounter = page.getByText('0/120')
        this.mediaSourceTypeLabel = page.getByRole('heading', {
            level: 6,
            name: 'Media source',
        });
        this.mediaSourceTypeDropdownLabel = page.getByText('Select media source type');
        this.mediaSourceTypeDropdown = page.getByRole('button', { name: 'Instagram' });
        
        this.profileTypeTab = page.getByRole('button', { name: 'Profile' });
        this.disconnectedProfileRadio = page.locator('.item-select-profile--business-deactive');;
        this.customProfileTab = page.getByRole('button', { name: 'Custom profile' });
        this.customProfileNameInputField = page.getByRole('textbox', { name: 'Please enter profile name' });
        this.hashtagTypeTab = page.getByRole('button', { name: 'Hashtag' });
        this.hashtagInputField = page.getByPlaceholder('Please enter hashtag');

        this.accountLabel = page.getByRole('heading', {
            level: 6,
            name: 'Account',
        });
        this.addNewAccountButton = page.getByRole('button', {
            name: 'Add new account',
        });
        this.nextButton = page.getByLabel('Add new media source').getByRole('button', { name: 'Next' });
        
        this.cancelButton = page.getByText('CancelNext');

        this.errorMessage = page.getByText('Please enter a valid name');

        this.maxNameLength = page.getByText('120/120');

        this.accountConnectedTooltipIcon = page.locator('[data-polaris-tooltip-activator="true"]');

        this.accountConnectedTooltipContent = page.getByRole('tooltip', { name: 'This account has already been' });
    }

    async fillInMediaSourceInformationAndCreate(sourceName: string, mediaSourceType: string) {
        await this.sourceNameInputField.fill(sourceName);
        await console.log(`Filled in source name: ${sourceName}`);
        await this.mediaSourceTypeDropdown.click();
        await this.page.locator('[role="listbox"]').getByText(mediaSourceType, { exact: true }).click();
        // await this.page.getByText(mediaSourceType, { exact: true }).click();
        // await this.nextButton.click();
    }

    async clickAndFillCustomProfileName(profileName: string) {
        await this.customProfileTab.click();
        await this.customProfileNameInputField.fill(profileName);
    }

    async clickAndFillHashtag(hashtag: string) {
        await this.hashtagTypeTab.click();
        await this.hashtagInputField.fill(hashtag);
    }

    async clickNextButton() {
        await this.nextButton.click();
    }

    async closeModal() {
        await this.cancelButton.click();
    }
}
