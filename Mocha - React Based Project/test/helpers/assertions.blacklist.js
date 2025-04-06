const assert = require('assert');

/**
 * sub page containing specific selectors and methods for assertions
 */
class AssertionsBlacklist {
    // Getters for Assertions
    get id() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[1]");
    }
    get country() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[2]");
    }
    get phoneCode() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[3]");
    }
    get phoneNumber() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[4]");
    }
    get type() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[5]");
    }
    get addedBy() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[6]");
    }
    get ip() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[7]");
    }
    get desc() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[9]");
    }

    //In Future to add Created at

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
                timeout: 30000, // Maximum time to wait in milliseconds (25 seconds)
                interval: 200,  // Interval between condition checks in milliseconds (0.5 seconds)
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
                timeout: 30000, // Maximum time to wait in milliseconds (25 seconds)
                interval: 200,  // Interval between condition checks in milliseconds (0.5 seconds)
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
                timeout: 30000, // Maximum time to wait in milliseconds (25 seconds)
                interval: 200,  // Interval between condition checks in milliseconds (0.5 seconds)
                timeoutMsg: 'Success message did not appear within the expected time.' // Custom error message
            }
        );
    }
    async assertDeleteMessage(message) {
        await this.waitForDeleteMessage();
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
    }

    // Text assertion 
    async waitForCreatedBlacklistAttributes() {
        await this.id.waitForDisplayed();
    }
    async assertCreatedBlacklistTextAttributes() {
        await this.waitForCreatedBlacklistAttributes();
        const actualId = await this.id.isExisting();
        expect(actualId).toBe(true);
        const actualCounry = await this.country.getText();
        assert.strictEqual(actualCounry, 'Bulgaria', 'Expected Country is not present');
        const actualPhoneCode = await this.phoneCode.getText();
        assert.strictEqual(actualPhoneCode, '+359', 'Expected Phone Code is not present');
        const actualPhoneNumber = await this.phoneNumber.getText();
        assert.ok(actualPhoneNumber.includes(global.blacklistNum), `Expected "${global.blacklistNum}" to be in "${actualPhoneNumber}"`);
        const actualType = await this.type.getText();
        assert.strictEqual(actualType, 'Outbound', 'Expected Type is not present');
        const actualAddedBy = await this.addedBy.getText();
        assert.strictEqual(actualAddedBy, 'Rado Testing', 'Expected Added By is not present');
        const actualIp = await this.ip.getText();
        const expectedIps = ['198.199.124.234', '172.18.0.1'];
        assert.ok(expectedIps.includes(actualIp), `Expected IP to be one of ${expectedIps}, but got ${actualIp}`);
        const actualDesc = await this.desc.getText();
        assert.ok(actualDesc.includes(global.blacklistDesc), `Expected "${global.blacklistDesc}" to be in "${actualDesc}"`);
    }

    async waitForEditedBlacklistAttributes() {
        await this.id.waitForDisplayed();
    }
    async assertEditedBlacklistTextAttributes() {
        await this.waitForEditedBlacklistAttributes();
        const actualType = await this.type.getText();
        assert.strictEqual(actualType, 'Inbound', 'Expected Type is not present');
        const actualDesc = await this.desc.getText();
        assert.ok(actualDesc.includes(global.editblacklistDesc), `Expected "${global.editblacklistDesc}" to be in "${actualDesc}"`);
    }

    async waitForRestoredBlacklistAttributes() {
        await this.id.waitForDisplayed();
    }
    async assertRestoredBlacklistTextAttributes() {
        await this.waitForRestoredBlacklistAttributes();
        const actualId = await this.id.isExisting();
        expect(actualId).toBe(true);
        const actualCounry = await this.country.getText();
        assert.strictEqual(actualCounry, 'Bulgaria', 'Expected Country is not present');
        const actualPhoneCode = await this.phoneCode.getText();
        assert.strictEqual(actualPhoneCode, '+359', 'Expected Phone Code is not present');
        const actualPhoneNumber = await this.phoneNumber.getText();
        assert.ok(actualPhoneNumber.includes(global.blacklistNum), `Expected "${global.blacklistNum}" to be in "${actualPhoneNumber}"`);
        const actualType = await this.type.getText();
        assert.strictEqual(actualType, 'Inbound', 'Expected Type is not present');
        const actualAddedBy = await this.addedBy.getText();
        assert.strictEqual(actualAddedBy, 'Rado Testing', 'Expected Added By is not present');
        const actualIp = await this.ip.getText();
        const expectedIps = ['198.199.124.234', '172.18.0.1'];
        assert.ok(expectedIps.includes(actualIp), `Expected IP to be one of ${expectedIps}, but got ${actualIp}`);
        const actualDesc = await this.desc.getText();
        assert.ok(actualDesc.includes(global.editblacklistDesc), `Expected "${global.editblacklistDesc}" to be in "${actualDesc}"`);
    }

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
}

module.exports = new AssertionsBlacklist();