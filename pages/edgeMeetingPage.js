import Locators from "../locators/locators";

export class EdgeMeetingPage {
    constructor(page, browser) {
        this.page = page;
        this.browser = browser;
        this.edgeContext = null;
        this.edgePage = null;
        this.meetingLink = null;
        this.locator = null; // Will be initialized when edgePage is created
    }

    // Store meeting link for later use
    async storeMeetingLink() {
        this.meetingLink = await this.page.evaluate(async () => {
            return await navigator.clipboard.readText();
        });
        return this.meetingLink;
    }
    
    async openEdge() {
        this.edgeContext = await this.browser.newContext();
        this.edgePage = await this.edgeContext.newPage();
        this.locator = new Locators(this.edgePage); // Initialize locator for edgePage
        return this.edgePage;
    }
    async pasteInSearchField(directLink = null) {
        let linkToUse = directLink || this.meetingLink;
        
        if (!linkToUse) {
            linkToUse = await this.storeMeetingLink();
        }
        await this.edgePage.goto(linkToUse);
        return linkToUse;
    }
    async pressEnterToNavigate() {
        await this.edgePage.waitForLoadState('networkidle');
        await this.edgePage.waitForTimeout(2000);
    }
    async enterClientName(name) {
        await this.edgePage.fill('input[placeholder*="name"]', name);
    }

    async clickContinueButton() {
        await this.edgePage.click('button:has-text("Continue"), button:has-text("Join"), button:has-text("Start")');
    }

    async clickContinueButton() {
        await this.locator.continueButton.click();
    }
    async closeEdge() {
        await this.edgeContext.close();
    }
}
