const assert = require('assert');

/**
 * sub page containing specific selectors and methods for assertions
 */
class AssertionsExt {
    // Getters for Assertions
    get members() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[3]");
    }
    get extNumber() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[1]");
    }
    get extName() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[2]");
    }
    get extType() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[3]");
    }
    get userName() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[4]");
    }
    get groups() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[5]");
    }
    get recordingType() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[6]");
    }
    get callerId() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[9]");
    }

    //In Future to add Created and Modify 

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
                timeout: 40000, // Maximum time to wait in milliseconds (25 seconds)
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
                timeout: 40000, // Maximum time to wait in milliseconds (25 seconds)
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
                timeout: 40000, // Maximum time to wait in milliseconds (25 seconds)
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
    async waitForExtGroup() {
        await this.extName.waitForDisplayed();
    }
    async assertExtGroupAttributes() {
        await this.waitForExtGroup();
        const actualMember = await this.members.getText();
        assert.strictEqual(actualMember, '1', 'Expected Ext Group Members is not present');
    }

    async waitForCreatedExtWebAttributes() {
        await this.extName.waitForDisplayed();
    }
    async assertCreatedExtWebTextAttributes(expectedNumber) {
        await this.waitForCreatedExtWebAttributes();
        const actualNumber = await this.extNumber.getText();
        assert.ok(actualNumber.includes(expectedNumber), `Expected "${expectedNumber}" to be in "${actualNumber}"`);
        const actualName = await this.extName.getText();
        assert.ok(actualName.includes(global.extNameWEB), `Expected "${global.extNameWEB}" to be in "${actualName}"`);
        const actualType = await this.extType.getText();
        assert.strictEqual(actualType, 'Web', 'Expected Web Ext Type is not present');
        const actualUser = await this.userName.getText();
        assert.ok(actualUser.includes(global.usersNameExt), `Expected "${global.usersNameExt}" to be in "${actualUser}"`);
        //const actualGroup = await this.groups.getText();
        //assert.ok(actualGroup.includes(global.groupNameExt), `Expected "${global.groupNameExt}" to be in "${actualGroup}"`); TO BE ADDED AFTER THE GROUP FIX
        const actualGroup = await this.groups.getText();
        assert.strictEqual(actualGroup, 'Test Automation Group', 'Expected Group is not present');
        const actualRec = await this.recordingType.getText();
        assert.strictEqual(actualRec, 'Inherit', 'Expected Web Reccording Type is not present');
        const actualCaller = await this.callerId.getText();
        assert.strictEqual(actualCaller, '+none', 'Expected Web Caller ID is not present');
    }

    async waitForCreatedExtSipAttributes() {
        await this.extName.waitForDisplayed();
    }
    async assertCreatedExtSipTextAttributes(expectedNumber) {
        await this.waitForCreatedExtSipAttributes();
        const actualNumber = await this.extNumber.getText();
        assert.ok(actualNumber.includes(expectedNumber), `Expected "${expectedNumber}" to be in "${actualNumber}"`);
        const actualName = await this.extName.getText();
        assert.ok(actualName.includes(global.extNameSIP), `Expected "${global.extNameSIP}" to be in "${actualName}"`);
        const actualType = await this.extType.getText();
        assert.strictEqual(actualType, 'Sip', 'Expected Sip Ext Type is not present');
        const actualRec = await this.recordingType.getText();
        assert.strictEqual(actualRec, 'Never', 'Expected Sip Reccording Type is not present');
        const actualCaller = await this.callerId.getText();
        assert.strictEqual(actualCaller, '+447441910836', 'Expected Sip Caller ID is not present');
    }
    
    async waitForEditedExtWebAttributes() {
        await this.extName.waitForDisplayed();
    }
    async assertEditedExtWebTextAttributes() {
        await this.waitForEditedExtWebAttributes();
        const actualName = await this.extName.getText();
        assert.ok(actualName.includes(global.editExtNameWeb), `Expected "${global.editExtNameWeb}" to be in "${actualName}"`);
        const actualRec = await this.recordingType.getText();
        assert.strictEqual(actualRec, 'Always', 'Expected Web Edit Reccording Type is not present');
        const actualCaller = await this.callerId.getText();
        assert.strictEqual(actualCaller, '+447441910836', 'Expected Edit Web Caller ID is not present');
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

module.exports = new AssertionsExt();