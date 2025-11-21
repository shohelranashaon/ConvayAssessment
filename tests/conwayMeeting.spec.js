import { SignIn } from '../pages/signInPage';
import { test } from '@playwright/test';
import { Home } from '../pages/homePage';
import { Meeting } from '../pages/meetingPage';
import { EdgeMeetingPage } from '../pages/edgeMeetingPage';

test.describe.configure({ mode: "serial" });

test.describe("Convay Meeting Automation", () => {
  let context, page, signIn, home, meeting, edgeMeeting;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    signIn = new SignIn(page);
    home = new  Home(page);
    meeting = new Meeting(page);
    edgeMeeting = new EdgeMeetingPage(page, browser);
    await signIn.openUrl();
    await signIn.signInPageLink();
    
  });

    test("Login Successfully and Copy Meeting Invite Link", async()=>{
        await signIn.enterUserEmail("tipili7552@gyknife.com");
        await signIn.enterPassword("Abcd1234+");
        await signIn.buttonSignIn();
        await home.buttonStartNow();
        const newPagePromise = context.waitForEvent('page', { timeout: 5000 });
        await home.clickButtonStart();
        const meetingPage = await newPagePromise;
        await meetingPage.waitForLoadState('networkidle');
        const meetingInNewTab = new Meeting(meetingPage);
        await meetingInNewTab.buttonInviteOthers();
        await meetingInNewTab.buttonCopyLink();
        await meetingPage.waitForTimeout(1000);
        await edgeMeeting.storeMeetingLink();
        // await meetingPage.pause();

     });

    test("Open Meeting Link in Microsoft Edge using POM", async () => {

        await edgeMeeting.openEdge();
        await edgeMeeting.pasteInSearchField();
        await edgeMeeting.pressEnterToNavigate();
        await page.pause();
    });

        //  test.afterAll("Logout Successfully",async () => {
        //     await inventory.clickButtonLogout();
        //     // await page.pause();
//   });
 
});


