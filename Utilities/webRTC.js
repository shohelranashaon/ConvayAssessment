

class WebRTC {

  // Permissions required for Convay meeting
  static getPermissions() {
    return ['camera', 'microphone'];
  }

  // Chrome arguments needed for WebRTC automation
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
}

export { WebRTC };
