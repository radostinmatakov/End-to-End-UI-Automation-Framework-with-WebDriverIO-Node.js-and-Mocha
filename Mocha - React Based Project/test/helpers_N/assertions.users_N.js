const assert = require('assert');

/**
 * sub page containing specific selectors and methods for assertions
 */
class AssertionsUsersN {
    // Getters for Assertions
    get notifyMessage() {
        return $('#swal2-title');
    }
    
    // Assertions methods to encapsule automation code to interact with the page
    // Message assertion 
    async waitForErrorMessage() {
        await this.notifyMessage.waitForDisplayed();
    }
    async assertErrorMessage(message) {
        await this.waitForErrorMessage();
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
    }
}

module.exports = new AssertionsUsersN();