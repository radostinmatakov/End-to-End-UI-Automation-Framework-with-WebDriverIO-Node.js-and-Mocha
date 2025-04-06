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
    async assertErrorMessage(expectedMessage) {
        await this.waitForSuccessMessage();
         // Get the actual notification message text
        const actualMessage = await this.notifyMessage.getText();
        // Normalize whitespace for comparison (replace \n and extra spaces)
        const normalizedMessage = actualMessage.replace(/\s+/g, ' ').trim();
        // Normalize the expected message in the same way
        const normalizedExpectedMessage = expectedMessage.replace(/\s+/g, ' ').trim();
        // Assert that the actual message matches the expected message
        expect(normalizedMessage).toContain(normalizedExpectedMessage);
    }

}

module.exports = new AssertionsUsersN();