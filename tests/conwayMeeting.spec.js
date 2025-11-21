import { SignIn } from '../pages/signInPage';
import { test, expect } from '@playwright/test';
import { Home } from '../pages/homePage';
import { Meeting } from '../pages/meetingPage';
import { EdgeMeetingPage } from '../pages/edgeMeetingPage';

test.describe.configure({ mode: "serial" });

test.describe("Convay Meeting Automation - Chrome Host & Edge Participant", () => {
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

    test("Host: Login Successfully and Copy Meeting Invite Link", async()=>{
        await signIn.enterUserEmail("tipili7552@gyknife.com");
        await signIn.enterPassword("Abcd1234+");
        await signIn.buttonSignIn();
        await home.buttonStartNow();
        const newPagePromise = context.waitForEvent('page', { timeout: 10000 });
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

    test("Join Meeting as Participant", async () => {
        await edgeMeeting.joinMeeting("Mic Test User");
    });

    test("Verify Mic Functionality", async () => {
        const permission = await edgeMeeting.checkPermissions();
        console.log(permission.message);
        expect(permission.passed).toBe(true);
        const micTest = await edgeMeeting.testMic();
        console.log(micTest.message);
        expect(micTest.passed).toBe(true);
        console.log('MIC TEST PASSED');
        // await page.pause();
    });

    

  test.afterAll(async () => {
    if (edgeMeeting) {
      await edgeMeeting.close();
    }
    if (context) {
      await context.close();
    }
  });
 
});


