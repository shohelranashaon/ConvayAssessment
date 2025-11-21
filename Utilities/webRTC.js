export { WebRTC };

class WebRTC {
  static getPermissions() {
    return ['camera', 'microphone'];
  }
  static getChromeArgs() {
    return [
      '--use-fake-device-for-media-stream',
      '--use-fake-ui-for-media-stream',
      '--allow-file-access-from-files',
      '--no-sandbox',
      '--use-file-for-fake-audio=./data/fake-audio.wav', // fake audio support
    ];
  }

  // Create context with WebRTC enabled
  static async createContext(browser) {
    return await browser.newContext({
      permissions: WebRTC.getPermissions(),
      args: WebRTC.getChromeArgs(),
    });
  }

  // Launch Microsoft Edge with WebRTC support
  static async launchEdge(headless = false) {
    const { chromium } = require('@playwright/test');
    return await chromium.launch({
      channel: 'msedge',
      headless: headless,
      args: WebRTC.getChromeArgs()
    });
  }
}


