const assert = require('assert');

/**
 * sub page containing specific selectors and methods for assertions
 */
class AssertionsGroups {
    // Getters for Assertions
    get groupName() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[1]");
    }
    get desc() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[2]");
    }
    get members() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[3]");
    }
    get emptyTable() {
        return $("(//div[@class='mantine-focus-auto m_b6d8b162 mantine-Text-root'])[2]");
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

    // Text assertion 
    async waitForCreatedGroupAttributes() {
        await this.groupName.waitForDisplayed();
    }
    async assertCreatedGroupTextAttributes(expectedName, expectedDesc, expectedMembers) {
        await this.waitForCreatedGroupAttributes();
        const actualName = await this.groupName.getText();
        assert.ok(actualName.includes(global.groupName), `Expected "${global.groupName}" to be in "${actualName}"`);
        const actualDesc = await this.desc.getText();
        assert.strictEqual(actualDesc, 'Testing Group', 'Expected Group description is not present');
        const actualMember = await this.members.getText();
        assert.strictEqual(actualMember, '3', 'Expected Group members is not present');
    }
    
    async waitForEditedGroupAttributes() {
        await this.groupName.waitForDisplayed();
    }
    async assertEditedGroupTextAttributes(expectedName, expectedDesc, expectedMembers) {
        await this.waitForEditedGroupAttributes();
        const actualName = await this.groupName.getText();
        assert.ok(actualName.includes(global.editGroupName), `Expected "${global.editGroupName}" to be in "${actualName}"`);
        const actualDesc = await this.desc.getText();
        assert.strictEqual(actualDesc, 'Testing Group Edit', 'Expected Group description is not present');
        const actualMember = await this.members.getText();
        assert.strictEqual(actualMember, '2', 'Expected Group members is not present');
    }

    async waitForQuickView() {
        await this.quickView.waitForDisplayed();
    }
    async assertCreateGroupQucikViewAtributes() {
        await this.waitForQuickView();
        // For "Name"
        const name = await this.quickView.$('//p[contains(text(), "Test_QA")]'); 
        const actualName = await name.getText();
        assert.strictEqual(actualName, 'Test_QA', 'Expected "Name" text is not present');
        // For "Description"
        const desc = await this.quickView.$(`//p[contains(text(), "Testing Group")]`); 
        const actualDesc = await desc.getText();
        assert.strictEqual(actualDesc, 'Testing Group', 'Expected "Description" text is not present');
        // For "Members"
        const members = await this.quickView.$('h2.text-primary span.text-base.font-light'); 
        const actualNumber = await members.getText();
        assert.strictEqual(actualNumber, '3', 'Expected "Number of Members" text is not present/correct');
            console.log("Members Create:", actualNumber)
        // For "Ext."
        const ext = await this.quickView.$$("div[class='w-full flex items-center grid grid-cols-2 my-2 p-2 border rounded-lg']"); 
        assert(ext.length >= 2,
            `Expected at least two child elements with class="cursor-move", but found ${ext.length}.`
        );
            console.log(`Number for create: ${ext.length}`);
    }
    async assertEditedGroupQucikViewAtributes() {
        await this.waitForQuickView();
        // For "Name"
        const name = await this.quickView.$('//p[contains(text(), "Test_QA/Edit")]'); 
        const actualName = await name.getText();
        assert.strictEqual(actualName, 'Test_QA/Edit', 'Expected "Name" text is not present');
        // For "Description"
        const desc = await this.quickView.$(`//p[contains(text(), "Testing Group Edit")]`); 
        const actualDesc = await desc.getText();
        assert.strictEqual(actualDesc, 'Testing Group Edit', 'Expected "Description" text is not present');
        // For "Members"
        const members = await this.quickView.$('h2.text-primary span.text-base.font-light'); 
        const actualNumber = await members.getText();
        assert.strictEqual(actualNumber, '2', 'Expected "Number of Members" text is not present/correct');
            console.log("Members Edit:", actualNumber)
        // For "Ext."
        const ext = await this.quickView.$$("div[class='w-full flex items-center grid grid-cols-2 my-2 p-2 border rounded-lg']"); 
        assert(ext.length >= 2,
            `Expected at least two child elements with class="cursor-move", but found ${ext.length}.`
        );
            console.log(`Number for create: ${ext.length}`);    
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

module.exports = new AssertionsGroups();