const assert = require('assert');

/**
 * sub page containing specific selectors and methods for assertions
 */
class AssertionsTc {
    // Getters for Assertions
    get tcName() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[2]");
    }
    get destifTrue() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[3]");
    }
    get destifFalse() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[4]");
    }
    get emptyTable() {
        return $("(//div[@class='mantine-focus-auto m_b6d8b162 mantine-Text-root'])[1]");
    }
    get emptyTableTwo() {
        return $("(//div[@class='mantine-focus-auto m_b6d8b162 mantine-Text-root'])[2]");
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
    async waitForCreatedTcName() {
        await this.tcName.waitForDisplayed();
    }
    async assertCreatedTcName() {
        await this.waitForCreatedTcName();
        const actualText = await this.tcName.getText();
        assert.ok(actualText.includes(global.TcName), `Expected "${global.TcName}" to be in "${actualText}"`);
    }
    async waitForEditedTcName() {
        await this.tcName.waitForDisplayed();
    }
    async assertEditedTcName() {
        await this.waitForEditedTcName();
        const actualText = await this.tcName.getText();
        assert.ok(actualText.includes(global.editTcname), `Expected "${global.editTcname}" to be in "${actualText}"`);
    }

    // Destinations
    async waitForCreatedTcAttributes() {
        await this.destifTrue.waitForDisplayed();
    }
    async assertCreatedTcAttributes() {
        await this.waitForCreatedTcAttributes();
        const actualIfTrue = await this.destifTrue.getText();
        assert.strictEqual(actualIfTrue, 'macro-hangupcall,hangup,1', 'Expected destination if true is not present');
        const actualIfFalse = await this.destifFalse.getText();
        assert.strictEqual(actualIfFalse, 'macro-hangupcall,hangup,1', 'Expected destination if false is not present');
    }

    // Empty table attributes
    async waitForEmptyTable() {
        await browser.waitUntil(
            async () => {
                return await this.emptyTableTwo.isDisplayed(); // Check if the empty table message is displayed
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

module.exports = new AssertionsTc();