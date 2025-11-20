export default class Locators{


    constructor(page){

        this.page = page;

//SignIn Page locator
         this.signInLink = this.page.locator("//a[normalize-space()='Sign In']");
         this.enterEmail = this.page.locator("//input[@placeholder='Your email address']");
         this.enterPassword = this.page.locator("//input[@placeholder='Your password']");
         this.signInButton = this.page.locator("//span[normalize-space()='Sign In']");
//Home Page locator
         this.startNowButton = this.page.locator("//button[@class='btn-convay-host']");
         this.startButton = this.page.locator("//button[@id='startButton']");
//Metting Page locator
         this.inviteOthers = this.page.locator("//span[@class='css-1wulk6c-textWithIcon']");
         



       
    }
      



}