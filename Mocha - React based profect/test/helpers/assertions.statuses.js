
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
    get disabledTableRow() {
        return $('tr.m_4e7aa4fd.mantine-Table-tr.mantine-datatable-row.disabled');
    }
    get enabledTableRow() {
        return $('tr.m_4e7aa4fd.mantine-Table-tr.mantine-datatable-row');
    }
    get emptyTable() {
        return $("(//div[@class='mantine-focus-auto m_b6d8b162 mantine-Text-root'])[2]");
    }

    //Quick View 
    get quickView() {
        return $("div[class='m_5df29311 text-sm mantine-Drawer-body']");
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

    async waitForQuickView() {
        await this.quickView.waitForDisplayed();
    }
    async assertCreateStatusQucikViewAtributes() {
        await this.waitForQuickView();
        // For Name
        const name = await this.quickView.$(`//p[contains(text(), "${global.statusName}")]`); 
        const actualName = await name.getText();
        assert.strictEqual(actualName, global.statusName, 'Expected "Name" text is not present');
        // For "Status"
        const status = await this.quickView.$("p[class='text-white-dark'] span[class='badge badge-outline-success']"); 
        const actualStatus = await status.getText();
        assert.strictEqual(actualStatus, 'Active', 'Expected "Status" text is not present'); 
        // For "Call Permissions"
        const extType = await this.quickView.$("//p[normalize-space()='Disabled']"); 
        const actualExtType = await extType.getText();
        assert.strictEqual(actualExtType, 'Disabled', 'Expected "Extension Type" text is not present');
        // For "Icon name"
        const icon = await this.quickView.$("//p[contains(text(), 'AArrowDown')]"); 
        const actualIcon = await icon.getText();
        assert.strictEqual(actualIcon, 'AArrowDown', 'Expected "Extension" text is not present'); 
        // For "Type"
        const type = await this.quickView.$("//p[contains(text(), 'PAUSE')]"); 
        const actualType = await type.getText();
        assert.strictEqual(actualType, 'PAUSE', 'Expected "Extension" text is not present');   
    }
    async assertEditedStatusQucikViewAtributes() {
        await this.waitForQuickView();
        // For Name
        const name = await this.quickView.$(`//p[contains(text(), "${global.editStatusName}")]`); 
        const actualName = await name.getText();
        assert.strictEqual(actualName, global.editStatusName, 'Expected "Name" text is not present');
        // For "Status"
        const status = await this.quickView.$("p[class='text-white-dark'] span[class='badge badge-outline-warning']"); 
        const actualStatus = await status.getText();
        assert.strictEqual(actualStatus, 'Inactive', 'Expected "Status" text is not present'); 
        // For "Call Permissions"
        const extType = await this.quickView.$("//p[normalize-space()='Inbound and Outbound']"); 
        const actualExtType = await extType.getText();
        assert.strictEqual(actualExtType, 'Inbound and Outbound', 'Expected "Extension Type" text is not present');
        // For "Icon name"
        const icon = await this.quickView.$("//p[contains(text(), 'AirVent')]"); 
        const actualIcon = await icon.getText();
        assert.strictEqual(actualIcon, 'AirVent', 'Expected "Extension" text is not present'); 
        // For "Type"
        const type = await this.quickView.$("//p[contains(text(), 'WORK')]"); 
        const actualType = await type.getText();
        assert.strictEqual(actualType, 'WORK', 'Expected "Extension" text is not present');   
    }

    async assertTableRowIsDisabled() {
        await this.disabledTableRow.waitForDisplayed({ timeout: 5000 });
        const isDisabled = await this.disabledTableRow.getAttribute('class');
        expect(isDisabled).toContain('disabled');
            console.log('Inactive row:', isDisabled)
    }

    async assertTableRowIsEnabled() {
        await this.enabledTableRow.waitForDisplayed({ timeout: 5000 });
        await expect(this.enabledTableRow).not.toHaveElementClass(expect.stringContaining('disabled'));
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

module.exports = new AssertionsStatus();