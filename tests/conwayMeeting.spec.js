import { SignIn } from '../pages/signInPage';
import { test } from '@playwright/test';
import { Home } from '../pages/homePage';

test.describe.configure({ mode: "serial" });

test.describe("Convay Meeting Automation", () => {
  let context, page, signIn,home;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    signIn = new SignIn(page);
    home = new  Home(page);
    await signIn.openUrl();
    await signIn.signInPageLink();
    
  });

    test("Login Successfully", async()=>{
        // await inventory.hamburgerMenu();
        await signIn.enterUserEmail("tipili7552@gyknife.com");
        await signIn.enterPassword("Abcd1234+");
        await signIn.buttonSignIn();
        await home.buttonStartNow();
        await home.clickButtonStart();
       // await home.buttonInviteOthers();
        await page.pause();
        await page.pause();
     });






        //  test.afterAll("Logout Successfully",async () => {
        //     await inventory.clickButtonLogout();
        //     // await page.pause();
//   });
 
});


