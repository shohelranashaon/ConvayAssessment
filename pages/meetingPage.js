import Locators from "../locators/locators";
export class Meeting{
    constructor(page){
        this.page = page;
        this.locator = new Locators(page);
    }
    //  async buttonInviteOthers(){
    //     await this.locator.inviteOthers.click();
    // }

    // async clickButtonStart(){
    //     await this.locator.startButton.click();
    // }

    async buttonInviteOthers(){
    await this.locator.inviteOthers.waitFor({ state: 'visible', timeout: 10000 });
    await this.locator.inviteOthers.click();
}

}
