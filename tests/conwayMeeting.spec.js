import { SignIn } from '../pages/signInPage';
import { test } from '@playwright/test';
import { Home } from '../pages/homePage';
import { Meeting } from '../pages/meetingPage';

test.describe.configure({ mode: "serial" });

test.describe("Convay Meeting Automation", () => {
  let context, page, signIn,home,meeting;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    signIn = new SignIn(page);
    home = new  Home(page);
    meeting = new Meeting(page);
    await signIn.openUrl();
    await signIn.signInPageLink();
    
  });

    test("Login Successfully", async()=>{
        // await inventory.hamburgerMenu();
        await signIn.enterUserEmail("tipili7552@gyknife.com");
        await signIn.enterPassword("Abcd1234+");
        await signIn.buttonSignIn();
        await home.buttonStartNow();
        
        // Wait for new tab/page to open when meeting starts
        const newPagePromise = context.waitForEvent('page', { timeout: 5000 });
        await home.clickButtonStart();
        
        // Get the new page (meeting page in new tab)
        const meetingPage = await newPagePromise;
        
        // Wait for new page to load
        await meetingPage.waitForLoadState('networkidle');
        await meetingPage.waitForTimeout(3000);
        
        // Create meeting object for the new page
        const meetingInNewTab = new Meeting(meetingPage);
        
        // Click invite button in the new tab
        await meetingInNewTab.buttonInviteOthers();
        await meetingPage.pause();

     });




        //  test.afterAll("Logout Successfully",async () => {
        //     await inventory.clickButtonLogout();
        //     // await page.pause();
//   });
 
});


