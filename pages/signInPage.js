import Locators from "../locators/locators";

export class SignIn{

    constructor(page){
        this.page = page;
        this.locator = new Locators(page);
    }

    async openUrl() {
         await this.page.goto('https://convay.com/');
    }

    async signInPageLink(){
        await this.locator.signInLink.click();
    }

    async enterUserEmail(email){
        await this.locator.enterEmail.fill(email);
    }

    async enterPassword(password){
        await this.locator.enterPassword.fill(password);
    }

    async buttonSignIn(){
        await this.locator.signInButton.click();
    }

}