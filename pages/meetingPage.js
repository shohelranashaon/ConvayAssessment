import Locators from "../locators/locators";

export class Meeting{
    constructor(page){
        this.page = page;
        this.locator = new Locators(page);
    }

    async buttonInviteOthers(){
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(3000);
        await this.locator.inviteOthers.click();
    }

    async buttonCopyLink(){
        await this.locator.copyLinkButton.click();
    }

}
