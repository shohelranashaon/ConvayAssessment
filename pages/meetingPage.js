import Locators from "../locators/locators";
export class Meeting{
    constructor(page){
        this.page = page;
        this.locator = new Locators(page);
    }
    
    async buttonInviteOthers(){
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(3000);
        await this.locator.inviteOthers.waitFor({ state: 'visible', timeout: 15000 });
        await this.locator.inviteOthers.scrollIntoViewIfNeeded();
        await this.locator.inviteOthers.click();
    }

}
