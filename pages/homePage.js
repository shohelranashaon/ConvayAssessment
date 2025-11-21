import Locators from "../locators/locators";

export class Home{

    constructor(page){

        this.page = page;
        this.locator = new Locators(page);
    }

     async buttonStartNow(){
        await this.locator.startNowButton.click();
    }

    async clickButtonStart(){
        await this.page.waitForTimeout(2000);
        await this.locator.startButton.click();
    }

}