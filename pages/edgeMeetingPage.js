import Locators from "../locators/locators";
import { WebRTC } from "../Utilities/webRTC.js";

export class EdgeMeetingPage {
    constructor(page, browser) {
        this.page = page;
        this.edgeBrowser = null;
        this.edgeContext = null;
        this.edgePage = null;
        this.meetingLink = null;
        this.locator = null;
    }

    async storeMeetingLink() {
        this.meetingLink = await this.page.evaluate(async () => {
            return await navigator.clipboard.readText();
        });
        return this.meetingLink;
    }
    
    async openEdge() {
        this.edgeBrowser = await WebRTC.launchEdge();
        this.edgeContext = await this.edgeBrowser.newContext({
            permissions: WebRTC.getPermissions().concat(['clipboard-read', 'clipboard-write'])
        });
        this.edgePage = await this.edgeContext.newPage();
        this.locator = new Locators(this.edgePage); 
        return this.edgePage;
    }
    
    async joinMeeting(participantName = "Mic Test User", headless = false) {
        if (!this.edgePage) {
            await this.openEdge(headless);
        }
        const link = this.meetingLink || await this.storeMeetingLink();
        await this.edgePage.goto(link);
        await this.edgePage.waitForLoadState('networkidle');
        await this.locator.enterName.fill(participantName);
        await this.locator.continueButton.click();
        await this.edgePage.waitForTimeout(3000);
    }

    async waitForMeetingToLoad() {
        await this.edgePage.waitForLoadState('networkidle');
        await this.edgePage.waitForTimeout(2000);
    }

    async getMicStatus() {
        await this.waitForMeetingToLoad();
        if (await this.locator.micUnmuteButton.count() > 0) return 'muted';
        if (await this.locator.micMuteButton.count() > 0) return 'unmuted';
        const micButton = this.locator.micButton.first();
        if (await micButton.count() > 0) {
            const ariaLabel = await micButton.getAttribute('aria-label');
            if (ariaLabel?.toLowerCase().includes('connecting')) {
                await this.edgePage.waitForTimeout(3000);
                return await this.getMicStatus();
            }
        }
        
        return 'unknown';
    }

    async toggleMic() {
        await this.waitForMeetingToLoad();
        if (await this.locator.micButton.count() > 0) {
            await this.locator.micButton.first().click();
            await this.edgePage.waitForTimeout(2000);
        }
    }
    async testMic() {
        await this.edgePage.waitForTimeout(3000);
        
        const before = await this.getMicStatus();
        if (before === 'unknown') {
            return { passed: false, message: 'Mic button not found' };
        }
        await this.toggleMic();
        const after = await this.getMicStatus();
        await this.toggleMic();
        
        const worked = before !== after;
        return {
            passed: worked,
            message: worked ? `Mic works: ${before} → ${after}` : `Mic failed: stayed ${before}`,
            before,
            after
        };
    }

    async checkPermissions() {
        const permission = await this.edgePage.evaluate(() => 
            navigator.permissions.query({ name: 'microphone' }).then(r => r.state)
        );
        
        return {
            passed: permission === 'granted',
            message: `Mic permission: ${permission}`
        };
    }
    async close() {
        if (this.edgeContext) await this.edgeContext.close();
        if (this.edgeBrowser) await this.edgeBrowser.close();
    }
}
