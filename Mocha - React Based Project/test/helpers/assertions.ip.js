const assert = require('assert');

/**
 * sub page containing specific selectors and methods for assertions
 */
class AssertionsIps {
    // Getters for Assertions
    get type() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[1]");
    }
    get ip() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[2]");
    }
    get status() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[3]");
    }
    get addedBy() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[5]");
    }
    get fromIp() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[6]");
    }
    get activeFrom() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[7]");
    }
    get activeTo() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[8]");
    }
    get ignoreList() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[10]");
    }
    get description() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[11]");
    }

    //In Future to add Created at

    get emptyTable() {
        return $("(//div[contains(@class, 'mantine-Text-root') and text()='No data available'])[1]");
    }
    get emptyTableTwo() {
        return $("(//div[contains(@class, 'mantine-Text-root') and text()='No data available'])[2]");
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
    async waitForCreatedIpAttributes() {
        await this.ip.waitForDisplayed();
    }
    async assertCreatedIpTextAttributes() {
        await this.waitForCreatedIpAttributes();
        const actualType = await this.type.getText();
        assert.strictEqual(actualType, 'IP', 'Expected text is not present');
        const actualIp = await this.ip.getText();
        assert.ok(actualIp.includes(global.ipAdress), `Expected "${global.ipAdress}" to be in "${actualIp}"`);
        const actualStatus = await this.status.getText();
        assert.strictEqual(actualStatus, 'Pending Activation', 'Expected Status is not present');
        const actualAddedBy = await this.addedBy.getText();
        assert.strictEqual(actualAddedBy, 'Rado Testing', 'Expected Added By is not present');
        /*
        const actualFropIp = await this.fromIp.getText();
        const expectedIps = ['198.199.124.234', '172.18.0.1'];
        assert.ok(expectedIps.includes(actualFropIp), `Expected IP to be one of ${expectedIps}, but got ${actualIp}`);
        */
        const actualIgnore = await this.ignoreList.getText();
        assert.strictEqual(actualIgnore, 'No', 'Expected Ignore List is not present');
        const actualDesc = await this.description.getText();
        assert.ok(actualDesc.includes(global.ipDesc), `Expected "${global.ipDesc}" to be in "${actualDesc}"`);
    }

    async waitForCreatedGeoIpAttributes() {
        await this.ip.waitForDisplayed();
    }
    async assertCreatedGeoIpTextAttributes() {
        await this.waitForCreatedGeoIpAttributes();
        const actualType = await this.type.getText();
        assert.strictEqual(actualType, 'GEOIP', 'Expected text is not present');
        const actualIp = await this.ip.getText();
        assert.strictEqual(actualIp, 'Bulgaria', 'Expected IP is not present');
        const actualStatus = await this.status.getText();
        assert.strictEqual(actualStatus, 'Pending Activation', 'Expected Status is not present');
        const actualAddedBy = await this.addedBy.getText();
        assert.strictEqual(actualAddedBy, 'Rado Testing', 'Expected Added By is not present');
        /*
        const actualFropIp = await this.fromIp.getText();
        const expectedIps = ['198.199.124.234', '172.18.0.1'];
        assert.ok(expectedIps.includes(actualFropIp), `Expected IP to be one of ${expectedIps}, but got ${actualIp}`);
        */
        const actualIgnore = await this.ignoreList.getText();
        assert.strictEqual(actualIgnore, 'No', 'Expected Ignore List is not present');
        const actualDesc = await this.description.getText();
        assert.ok(actualDesc.includes(global.geoIpDesc), `Expected "${global.geoIpDesc}" to be in "${actualDesc}"`);
    }

    async waitForEditedIpAttributes() {
        await this.ip.waitForDisplayed();
    }
    async assertEditedIpTextAttributes() {
        await this.waitForEditedIpAttributes();
        const actualType = await this.type.getText();
        assert.strictEqual(actualType, 'IP', 'Expected text is not present');
        const actualIp = await this.ip.getText();
        assert.ok(actualIp.includes(global.ipAdress), `Expected "${global.ipAdress}" to be in "${actualIp}"`);
        const actualStatus = await this.status.getText();
        assert.strictEqual(actualStatus, 'Pending Activation', 'Expected Status is not present');
        const actualAddedBy = await this.addedBy.getText();
        assert.strictEqual(actualAddedBy, 'Rado Testing', 'Expected Added By is not present');
        /*
        const actualFropIp = await this.fromIp.getText();
        const expectedIps = ['198.199.124.234', '172.18.0.1'];
        assert.ok(expectedIps.includes(actualFropIp), `Expected IP to be one of ${expectedIps}, but got ${actualIp}`);
        */
        const actualIgnore = await this.ignoreList.getText();
        assert.strictEqual(actualIgnore, 'Yes', 'Expected Ignore List is not present');
        const actualDesc = await this.description.getText();
        assert.ok(actualDesc.includes(global.editIpDesc), `Expected "${global.editIpDesc}" to be in "${actualDesc}"`);
    }
    async waitForEditedGeoIpAttributes() {
        await this.ip.waitForDisplayed();
    }
    async assertEditedGeoIpTextAttributes() {
        const actualType = await this.type.getText();
        assert.strictEqual(actualType, 'GEOIP', 'Expected text is not present');
        const actualIp = await this.ip.getText();
        assert.strictEqual(actualIp, 'Bulgaria', 'Expected IP is not present');
        const actualStatus = await this.status.getText();
        assert.strictEqual(actualStatus, 'Pending Activation', 'Expected Status is not present');
        const actualAddedBy = await this.addedBy.getText();
        assert.strictEqual(actualAddedBy, 'Rado Testing', 'Expected Added By is not present');
        const actualFropIp = await this.fromIp.getText();
        const expectedIps = ['198.199.124.234', '172.18.0.1'];
        assert.ok(expectedIps.includes(actualFropIp), `Expected IP to be one of ${expectedIps}, but got ${actualIp}`);
        const actualIgnore = await this.ignoreList.getText();
        assert.strictEqual(actualIgnore, 'Yes', 'Expected Ignore List is not present');
        const actualDesc = await this.description.getText();
        assert.ok(actualDesc.includes(global.editGeoIpDesc), `Expected "${global.editGeoIpDesc}" to be in "${actualDesc}"`);
    }

    async waitForRestoredIpAttributes() {
        await this.ip.waitForDisplayed();
    }
    async assertRestoredIpTextAttributes() {
        await this.waitForRestoredIpAttributes();
        const actualType = await this.type.getText();
        assert.strictEqual(actualType, 'IP', 'Expected text is not present');
        const actualIp = await this.ip.getText();
        assert.ok(actualIp.includes(global.ipAdress), `Expected "${global.ipAdress}" to be in "${actualIp}"`);
        const actualStatus = await this.status.getText();
        assert.strictEqual(actualStatus, 'Pending Activation', 'Expected Status is not present');
        const actualAddedBy = await this.addedBy.getText();
        assert.strictEqual(actualAddedBy, 'Rado Testing', 'Expected Added By is not present');
        const actualFropIp = await this.fromIp.getText();
        const expectedIps = ['198.199.124.234', '172.18.0.1'];
        assert.ok(expectedIps.includes(actualFropIp), `Expected IP to be one of ${expectedIps}, but got ${actualIp}`);
        const actualIgnore = await this.ignoreList.getText();
        assert.strictEqual(actualIgnore, 'Yes', 'Expected Ignore List is not present');
        const actualDesc = await this.description.getText();
        assert.ok(actualDesc.includes(global.editIpDesc), `Expected "${global.editIpDesc}" to be in "${actualDesc}"`);
    }

    async waitForRestoredGeoIpAttributes() {
        await this.ip.waitForDisplayed();
    }
    async assertRestoredGeoIpTextAttributes() {
        await this.waitForRestoredGeoIpAttributes();
        const actualType = await this.type.getText();
        assert.strictEqual(actualType, 'GEOIP', 'Expected text is not present');
        const actualIp = await this.ip.getText();
        assert.strictEqual(actualIp, 'Bulgaria', 'Expected IP is not present');
        const actualStatus = await this.status.getText();
        assert.strictEqual(actualStatus, 'Pending Activation', 'Expected Status is not present');
        const actualAddedBy = await this.addedBy.getText();
        assert.strictEqual(actualAddedBy, 'Rado Testing', 'Expected Added By is not present');
        const actualFropIp = await this.fromIp.getText();
        const expectedIps = ['198.199.124.234', '172.18.0.1'];
        assert.ok(expectedIps.includes(actualFropIp), `Expected IP to be one of ${expectedIps}, but got ${actualIp}`);
        const actualIgnore = await this.ignoreList.getText();
        assert.strictEqual(actualIgnore, 'Yes', 'Expected Ignore List is not present');
        const actualDesc = await this.description.getText();
        assert.ok(actualDesc.includes(global.editGeoIpDesc), `Expected "${global.editGeoIpDesc}" to be in "${actualDesc}"`);
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

module.exports = new AssertionsIps();