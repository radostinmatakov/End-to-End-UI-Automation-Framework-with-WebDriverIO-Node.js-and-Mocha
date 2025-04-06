const assert = require('assert');

/**
 * sub page containing specific selectors and methods for assertions
 */
class AssertionsIVR {
    // Getters for Assertions
    get ivrName() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[2]");
    }
    get ivrDesc() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[3]");
    }
    get invalidDest() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[4]");
    }
    get timeoutDest() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[5]");
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
    // Names
    async waitForCreatedIvrName() {
        await this.ivrName.waitForDisplayed();
    }
    async assertCreatedIvrName() {
        await this.waitForCreatedIvrName();
        const actualText = await this.ivrName.getText();
        assert.ok(actualText.includes(global.IVRName), `Expected "${global.IVRName}" to be in "${actualText}"`);
    }
    async waitForEditedIvrName() {
        await this.ivrName.waitForDisplayed();
    }
    async assertEditedIvrName() {
        await this.waitForEditedIvrName();
        const actualText = await this.ivrName.getText();
        assert.ok(actualText.includes(global.editIVRName), `Expected "${global.editIVRName}" to be in "${actualText}"`);
    }
    async waitForCopiedIvrName() {
        await this.ivrName.waitForDisplayed();
    }
    async assertCopiedIvrName() {
        await this.waitForCopiedIvrName();
        const actualText = await this.ivrName.getText();
        assert.ok(actualText.includes(global.copyIVRName), `Expected "${global.copyIVRName}" to be in "${actualText}"`);
    }

    // Descriptions
    async waitForCreatedIvrDesc() {
        await this.ivrDesc.waitForDisplayed();
    }
    async assertCreatedIvrDesc() {
        await this.waitForCreatedIvrDesc();
        const actualInvalid = await this.ivrDesc.getText();
        assert.strictEqual(actualInvalid, 'Automation Test', 'Expected description is not present');
    }
    async waitForEditedIvrDesc() {
        await this.ivrDesc.waitForDisplayed();
    }
    async assertEditedIvrDesc() {
        await this.waitForEditedIvrDesc();
        const actualInvalid = await this.ivrDesc.getText();
        assert.strictEqual(actualInvalid, 'Automation Test Edit', 'Expected description is not present');
    }

    // Invalid destionation and Timeout destination
    async waitForCreatedIvrAttributes() {
        await this.invalidDest.waitForDisplayed();
    }
    async assertCreatedIvrAttributes() {
        await this.waitForCreatedIvrAttributes();
        const actualInvalid = await this.invalidDest.getText();
        assert.strictEqual(actualInvalid, 'macro-hangupcall,hangup,1', 'Expected Invalid destionation is not present'); // rename it with real values after the fix
        const actualTimeout = await this.timeoutDest.getText();
        assert.strictEqual(actualTimeout, 'macro-hangupcall,hangup,1', 'Expected Timeout destination is not present'); // rename it with real values after the fix
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

module.exports = new AssertionsIVR();