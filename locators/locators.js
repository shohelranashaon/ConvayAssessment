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
//Meeting Page locator
         this.inviteOthers = this.page.locator("//span[@class='css-1wulk6c-textWithIcon']");
         this.copyLinkButton = this.page.locator("//div[@class='meeting-link-url-copy']//div[@class='jitsi-icon jitsi-icon-default ']//*[name()='svg']");
         this.enterName =this.page.locator("//input[@placeholder='Enter your name']");
         this.continueButton = this.page.locator("//button[@id='startButton']");

//Mic Control locators (improved)
         this.micButton = this.page.locator("div[aria-label*='microphone'], button[aria-label*='microphone']");
         this.micUnmuteButton = this.page.locator("[aria-label*='Unmute microphone'], [aria-label*='unmute']");
         this.micMuteButton = this.page.locator("[aria-label*='Mute microphone'], [aria-label*='mute']:not([aria-label*='unmute'])");
    }
      



}
