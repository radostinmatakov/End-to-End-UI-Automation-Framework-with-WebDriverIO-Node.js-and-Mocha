
const assert = require('assert');

/**
 * sub page containing specific selectors and methods for assertions
 */
class AssertionsStatus {
    // Getters for Assertions
    // Table
    get statusName() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[1]");
    }
    get status() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[2]");
    }
    get callPerm() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[3]");
    }
    get iconCreate() {
        return $("svg[class='lucide lucide-aarrow-down shrink-0  undefined']");
    }
    get iconEdit() {
        return $("svg[class='lucide lucide-air-vent shrink-0  undefined']");
    }
    get notifyMessage() {
        return $('#swal2-title');
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
    get headerMenuDropDown () {
        return $("(//span[contains(@class,'font-semibold')][normalize-space()='Available'])[1]");
    }
    get headerMenu () {
        return $(`//ul[contains(@class, "!px-2")]//*[text()='${global.statusName}']`);
    }
    
    
    //Quick View 
    get quickView() {
        return $("div[class='justify-between border-b border-gray-200 pb-2 px-4']");
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
    async waitForCreatedStatusAttributes() {
        await this.statusName.waitForDisplayed();
    }
    async assertCreatedStatusTextAttributes(expectedStatus, expectedCallPerm) {
        await this.waitForCreatedStatusAttributes();
        const actualName = await this.statusName.getText();
        assert.ok(actualName.includes(global.statusName), `Expected "${global.statusName}" to be in "${actualName}"`);
        const actualStatus = await this.status.getText();
        assert.ok(actualStatus.includes(expectedStatus), `Expected "${expectedStatus}" to be in "${actualStatus}"`);
        const actualCallPerm = await this.callPerm.getText();
        assert.ok(actualCallPerm.includes(expectedCallPerm), `Expected "${expectedCallPerm}" to be in "${actualCallPerm}"`);
        const iconCr = await this.iconCreate;
        assert(iconCr, 'SVG icon is not present'); 
        const isDisplayed = await this.iconCreate.isDisplayed();
        assert(isDisplayed, 'SVG icon is not visible');
    }
    
    async waitForEditedStatusAttributes() {
        await this.statusName.waitForDisplayed();
    }
    async assertEditedStatusTextAttributes(expectedStatus, expectedCallPerm) {
        await this.waitForEditedStatusAttributes();
        const actualName = await this.statusName.getText();
        assert.ok(actualName.includes(global.editStatusName), `Expected "${global.editStatusName}" to be in "${actualName}"`);
        const actualStatus = await this.status.getText();
        assert.ok(actualStatus.includes(expectedStatus), `Expected "${expectedStatus}" to be in "${actualStatus}"`);
        const actualCallPerm = await this.callPerm.getText();
        assert.ok(actualCallPerm.includes(expectedCallPerm), `Expected "${expectedCallPerm}" to be in "${actualCallPerm}"`);
        const iconEd = await this.iconEdit;
        assert(iconEd, 'SVG icon is not present'); 
        const isDisplayed = await this.iconEdit.isDisplayed();
        assert(isDisplayed, 'SVG icon is not visible');
    }

    async waitForCreatedStatusInHeader() {
        await this.headerMenu .waitForDisplayed();
    }
    async assertCreatedStatusTextInHeader() {
        await this.waitForCreatedStatusInHeader();
        const actualText   = await this.headerMenu.getText();
        expect(actualText).toBe(global.statusName), `Expected: "${global.statusName}", but got: "${actualText}"`;
        console.log(`Expected: ${global.statusName}, Actual: ${actualText}`); 
    }

    async waitForDeletedStatusIsNotInHeader() {
        await this.headerMenuDropDown .waitForDisplayed();
    }
    async assertDeletedStatusTextIsNotInHeader() {
        await this.waitForDeletedStatusIsNotInHeader();
        const actualText   = await this.headerMenu.isExisting();
        expect(actualText).toBe(false, `The status "${global.editStatusName}" is still present after deletion!`);
      
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

module.exports = new AssertionsStatus();