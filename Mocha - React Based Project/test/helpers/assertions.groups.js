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
    get notifyMessage() {
        return $('#swal2-title');
    }
    get quickView() {
        return $("div[class='m_d57069b5 mantine-ScrollArea-root']"); 
    }

    // Assertions methods to encapsule automation code to interact with the page
    // Message assertion 
    async waitForSuccessMessage() {
        await this.notifyMessage.waitForDisplayed();
    }
    async assertSuccessMessage(message) {
        await this.waitForSuccessMessage();
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
    }
    async waitForUpdateMessage() {
        await this.notifyMessage.waitForDisplayed();
    }
    async assertUpdateMessage(message) {
        await this.waitForUpdateMessage();
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
    }
    async waitForDeleteMessage() {
        await this.notifyMessage.waitForDisplayed();
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
        assert.ok(actualName.includes(expectedName), `Expected "${expectedName}" to be in "${actualName}"`);
        const actualDesc = await this.desc.getText();
        assert.ok(actualDesc.includes(expectedDesc), `Expected "${expectedDesc}" to be in "${actualDesc}"`);
        const actualMember = await this.members.getText();
        assert.ok(actualMember.includes(expectedMembers), `Expected "${expectedMembers}" to be in "${actualMember}"`);
    }
    
    async waitForEditedGroupAttributes() {
        await this.groupName.waitForDisplayed();
    }
    async assertEditedGroupTextAttributes(expectedName, expectedDesc, expectedMembers) {
        await this.waitForEditedGroupAttributes();
        const actualName = await this.groupName.getText();
        assert.ok(actualName.includes(expectedName), `Expected "${expectedName}" to be in "${actualName}"`);
        const actualDesc = await this.desc.getText();
        assert.ok(actualDesc.includes(expectedDesc), `Expected "${expectedDesc}" to be in "${actualDesc}"`);
        const actualMember = await this.members.getText();
        assert.ok(actualMember.includes(expectedMembers), `Expected "${expectedMembers}" to be in "${actualMember}"`);
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
}

module.exports = new AssertionsGroups();