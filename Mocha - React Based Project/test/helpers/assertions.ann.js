const assert = require('assert');

/**
 * sub page containing specific selectors and methods for assertions
 */
class AssertionsAnn {
    // Getters for Assertions
    get annDesc() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[2]");
    }
    get annAudio() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[3]");
    }
    get annDest() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[4]");
    }
    get emptyTable() {
        return $("(//div[contains(@class, 'mantine-Text-root') and text()='No data available'])[2]");
    }
    get emptyTableTwo() {
        return $("(//div[contains(@class, 'mantine-Text-root') and text()='No data available'])[1]");
    }
    get emptyTableIcon() {
        return $("div[class='mantine-datatable-empty-state-icon']");
    }
    get notifyMessage() {
        return $('#swal2-title');
    }

    // Assertions methods to encapsule automation code to interact with the page
    // Message assertion 
    async waitForSuccessMessage() {
        await browser.waitUntil(
            async () => await this.notifyMessage.waitForDisplayed(),
            {
                timeout: 25000, // Maximum time to wait in milliseconds (25 seconds)
                interval: 500,  // Interval between condition checks in milliseconds (0.5 seconds)
                timeoutMsg: 'Success message did not appear within the expected time.' // Custom error message
            }
        );
    }
    async assertSuccessMessage(message) {
        await this.waitForSuccessMessage();
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
    }
    async waitForUpdateMessage() {
        await browser.waitUntil(
            async () => await this.notifyMessage.waitForDisplayed(),
            {
                timeout: 25000, // Maximum time to wait in milliseconds (25 seconds)
                interval: 500,  // Interval between condition checks in milliseconds (0.5 seconds)
                timeoutMsg: 'Success message did not appear within the expected time.' // Custom error message
            }
        );
    }
    async assertUpdateMessage(message) {
        await this.waitForUpdateMessage();
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
    }
    async waitForDeleteMessage() {
        await browser.waitUntil(
            async () => await this.notifyMessage.waitForDisplayed(),
            {
                timeout: 25000, // Maximum time to wait in milliseconds (25 seconds)
                interval: 500,  // Interval between condition checks in milliseconds (0.5 seconds)
                timeoutMsg: 'Success message did not appear within the expected time.' // Custom error message
            }
        );
    }
    async assertDeleteMessage(message) {
        await this.waitForDeleteMessage();
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
    }

    // Text assertion in table
    // Descriptions
    async waitForCreatedAnnDesc() {
        await this.annDesc.waitForDisplayed();
    }
    async assertCreatedAnnDesc() {
        await this.waitForCreatedAnnDesc();
        const actualText = await this.annDesc.getText();
        assert.ok(actualText.includes(global.annDesc), `Expected "${global.annDesc}" to be in "${actualText}"`);
    }
    async waitForEditedAnnDesc() {
        await this.annDesc.waitForDisplayed();
    }
    async assertEditedAnnDesc() {
        await this.waitForEditedAnnDesc();
        const actualText = await this.annDesc.getText();
        assert.ok(actualText.includes(global.editAnnDesc), `Expected "${global.editAnnDesc}" to be in "${actualText}"`);
    }

    // Recordings and Destinations
    async waitForCreatedAnnAttributes() {
        await this.annAudio.waitForDisplayed();
    }
    async assertCreatedAnnAttributes() {
        await this.waitForCreatedAnnAttributes();
        const actualAudio = await this.annAudio.getText();
        assert.strictEqual(actualAudio, 'default1', 'Expected audio is not present');
        const actualDest = await this.annDest.getText();
        assert.strictEqual(actualDest, 'Terminate Call', 'Expected destination is not present');
    }

    // Empty table attributes
    async waitForEmptyTable() {
        await browser.waitUntil(
            async () => {
                return await this.emptyTable.isDisplayed(); // Check if the empty table message is displayed
            },
            {
                timeout: 20000, // Adjust based on expected response time
                interval: 500,   // Poll every 500ms
                timeoutMsg: "Empty table message did not appear within 20s",
            }
        );
    }
    async assertEmptyTable(expectedMessage) {
        await this.waitForEmptyTable(); 
        const messageText = await this.emptyTable.getText();
        expect(messageText).toContain(expectedMessage);
    }

    async assertEmptyTableTwo(expectedMessage) {
        await this.waitForEmptyTable(); 
        const messageText = await this.emptyTableTwo.getText();
        expect(messageText).toContain(expectedMessage);
    }

    async assertEmptyTableIcon() {
        await this.waitForEmptyTable(); 
        const isDisplayed = await this.emptyTableIcon.isDisplayed();
        expect(isDisplayed).toBe(true);
    }
    // Text assertions of the Sideview
    // TO DO 
}

module.exports = new AssertionsAnn();