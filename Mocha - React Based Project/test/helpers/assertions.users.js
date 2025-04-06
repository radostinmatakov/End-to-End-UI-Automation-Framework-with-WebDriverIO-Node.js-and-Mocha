const assert = require('assert');

/**
 * sub page containing specific selectors and methods for assertions
 */
class AssertionsUsers {
    // Getters for Assertions
    get userName() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[1]");
    }
    get extension() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[2]");
    }
    get extType() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[3]");
    }
    get status() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[4]");
    }
    get userEmail() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[5]");
    }
    get groupsWeb() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[6]");
    }
    get groupsSip() {
        return $("//span[contains(text(), 'Group1')]");
    }
    get userPhone() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[7]");
    }
    get level() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[8]");
    }
    get role() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[9]");
    }
    get forceLogin() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[10]");
    }
    get notifyMessage() {
        return $('#swal2-title');
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
    async assertSuccessMessage(expectedMessage) {
        await this.waitForSuccessMessage();
         // Get the actual notification message text
        const actualMessage = await this.notifyMessage.getText();
        // Normalize whitespace for comparison (replace \n and extra spaces)
        const normalizedMessage = actualMessage.replace(/\s+/g, ' ').trim();
        // Normalize the expected message in the same way
        const normalizedExpectedMessage = expectedMessage.replace(/\s+/g, ' ').trim();
        // Assert that the actual message matches the expected message
        expect(normalizedMessage).toContain(normalizedExpectedMessage);
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
    async waitForResetMessage() {
        await browser.waitUntil(
            async () => await this.notifyMessage.waitForDisplayed(),
            {
                timeout: 25000, // Maximum time to wait in milliseconds (25 seconds)
                interval: 500,  // Interval between condition checks in milliseconds (0.5 seconds)
                timeoutMsg: 'Success message did not appear within the expected time.' // Custom error message
            }
        );
    }
    async assertResetMessage(message) {
        await this.waitForResetMessage();
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
    }

    // Text assertion 
    async waitForCreatedUsers() {
        await this.userName.waitForDisplayed();
    }
    async assertCreatedWebUserAttributesText(expectedNumber) {
        await this.waitForCreatedUsers();
        const actualName = await this.userName.getText();
        assert.ok(actualName.includes(global.usersNameWeb), `Expected "${global.usersNameWeb}" to be in "${actualName}"`);
        const actualExt = await this.extension.getText();
        assert.ok(actualExt.includes(expectedNumber), `Expected "${expectedNumber}" to be in "${actualExt}"`);
        const actualExtType = await this.extType.getText();
        assert.strictEqual(actualExtType, 'Web', 'Expected Web Ext Type is not present');
        const actualStatus = await this.status.getText();
        assert.strictEqual(actualStatus, 'Active', 'Expected Web User status is not present');
        const actualEmail = await this.userEmail.getText();
        assert.ok(actualEmail.includes(global.usersEmailWeb), `Expected "${global.usersEmailWeb}" to be in "${actualEmail}"`);
        const actualGroups = await this.groupsWeb.getText();
        assert.strictEqual(actualGroups, 'All', 'Expected Web User Group is not present');
        const actualPhone = await this.userPhone.getText();
        assert.strictEqual(actualPhone, '359888777', 'Expected Web User Phone number is not present');
        const actualLevel = await this.level.getText();
        assert.strictEqual(actualLevel, 'Admin', 'Expected Web User Level is not present');
        const actualRole = await this.role.getText();
        assert.strictEqual(actualRole, 'Default Admin', 'Expected Web User Role is not present');
    }
    async assertCreatedSipUserAttributesText(expectedNumber) {
        await this.waitForCreatedUsers();
        const actualName = await this.userName.getText();
        assert.ok(actualName.includes(global.usersNameSip), `Expected "${global.usersNameSip}" to be in "${actualName}"`);
        const actualExt = await this.extension.getText();
        assert.ok(actualExt.includes(expectedNumber), `Expected "${expectedNumber}" to be in "${actualExt}"`);
        const actualExtType = await this.extType.getText();
        assert.strictEqual(actualExtType, 'Sip', 'Expected Sip Ext Type is not present');
        const actualStatus = await this.status.getText();
        assert.strictEqual(actualStatus, 'Active', 'Expected Sip User status is not present');
        const actualEmail = await this.userEmail.getText();
        assert.ok(actualEmail.includes(global.usersEmailSip), `Expected "${global.usersEmailSip}" to be in "${actualEmail}"`);
        const actualGroups = await this.groupsSip.getText();
        assert.strictEqual(actualGroups, 'Group1', 'Expected Sip User Group is not present');
        const actualPhone = await this.userPhone.getText();
        assert.strictEqual(actualPhone, '359888777', 'Expected Web User Phone number is not present');
        const actualLevel = await this.level.getText();
        assert.strictEqual(actualLevel, 'Manager', 'Expected Sip User Level is not present');
        const actualRole = await this.role.getText();
        assert.strictEqual(actualRole, 'Default Manager', 'Expected Sip User Role is not present');
        //const actualLogin = await this.forceLogin.getText();
        //assert.strictEqual(actualLogin, 'Default Manager', 'Expected Sip User Login is not present');
    }
    async assertEditedWebUserAttributesText(expectedStatus) {
        await this.waitForCreatedUsers();
        const actualName = await this.userName.getText();
        assert.ok(actualName.includes(global.editUsersNameWeb), `Expected "${global.editUsersNameWeb}" to be in "${actualName}"`);
        const actualStatus = await this.status.getText();
        assert.ok(actualStatus.includes(expectedStatus), `Expected "${expectedStatus}" to be in "${actualStatus}"`);
    }

    async waitForQuickView() {
        await this.quickView.waitForDisplayed();
    }
    async assertCreateWebQucikViewAtributes() {
        await this.waitForQuickView();
        // For Name
        const name = await this.quickView.$(`//p[contains(text(), "${global.usersNameWeb}")]`); 
        const actualName = await name.getText();
        assert.strictEqual(actualName, global.usersNameWeb, 'Expected "Name" text is not present');
        // For "Email"
        const email = await this.quickView.$(`//p[contains(text(), "${global.usersEmailWeb}")]`); 
        const actualEmail = await email.getText();
        assert.strictEqual(actualEmail, global.usersEmailWeb, 'Expected "Email" text is not present');
        // For "Phone"
        const phone = await this.quickView.$("//p[contains(text(), '359888777')]"); 
        const actualPhone = await phone.getText();
        assert.strictEqual(actualPhone, '359888777', 'Expected "Phone" text is not present');
        // For "Extension Type"
        const extType = await this.quickView.$("//p[normalize-space()='Web']"); 
        const actualExtType = await extType.getText();
        assert.strictEqual(actualExtType, 'Web', 'Expected "Extension Type" text is not present');
        // For "Extension"
        const ext = await this.quickView.$("//p[contains(text(), '111')]"); 
        const actualExt = await ext.getText();
        assert.strictEqual(actualExt, '111', 'Expected "Extension" text is not present');   
        // For "Status"
        const status = await this.quickView.$("//span[contains(text(), 'Active')]"); 
        const actualStatus = await status.getText();
        assert.strictEqual(actualStatus, 'Active', 'Expected "Status" text is not present'); 
        // For "Level"
        const level = await this.quickView.$("//p[normalize-space()='Admin']"); 
        const actualLevel = await level.getText();
        assert.strictEqual(actualLevel, 'Admin', 'Expected "Level" text is not present'); 
        // For "Role"
        const role = await this.quickView.$("//p[contains(text(), 'Default Admin')]"); 
        const actualRole = await role.getText();
        assert.strictEqual(actualRole, 'Default Admin', 'Expected "Role" text is not present');
    }
    async assertCreateSipQucikViewAtributes() {
        await this.waitForQuickView();
        // For Name
        const name = await this.quickView.$(`//p[contains(text(), "${global.usersNameSip}")]`); 
        const actualName = await name.getText();
        assert.strictEqual(actualName, global.usersNameSip, 'Expected "Name" text is not present');
        // For "Email"
        const email = await this.quickView.$(`//p[contains(text(), "${global.usersEmailSip}")]`); 
        const actualEmail = await email.getText();
        assert.strictEqual(actualEmail, global.usersEmailSip, 'Expected "Email" text is not present');
        // For "Phone"
        const phone = await this.quickView.$("//p[contains(text(), '359888777')]"); 
        const actualPhone = await phone.getText();
        assert.strictEqual(actualPhone, '359888777', 'Expected "Phone" text is not present');
        // For "Extension Type"
        const extType = await this.quickView.$("//p[normalize-space()='Sip']"); 
        const actualExtType = await extType.getText();
        assert.strictEqual(actualExtType, 'Sip', 'Expected "Extension Type" text is not present');
        // For "Extension"
        const ext = await this.quickView.$("//p[contains(text(), '112')]"); 
        const actualExt = await ext.getText();
        assert.strictEqual(actualExt, '112', 'Expected "Extension" text is not present');   
        // For "Status"
        const status = await this.quickView.$("//span[contains(text(), 'Active')]"); 
        const actualStatus = await status.getText();
        assert.strictEqual(actualStatus, 'Active', 'Expected "Status" text is not present'); 
        // For "Level"
        const level = await this.quickView.$("//p[normalize-space()='Manager']"); 
        const actualLevel = await level.getText();
        assert.strictEqual(actualLevel, 'Manager', 'Expected "Level" text is not present'); 
        // For "Role"
        const role = await this.quickView.$("//p[contains(text(), 'Default Manager')]"); 
        const actualRole = await role.getText();
        assert.strictEqual(actualRole, 'Default Manager', 'Expected "Role" text is not present');
        // For "Force Login"
        const forceLogin = await this.quickView.$("//p[contains(text(), 'No')]"); 
        const actualLogin = await forceLogin.getText();
        assert.strictEqual(actualLogin, 'No', 'Expected "Force Login" text is not present');
        // For "Groups"
        const groups = await this.quickView.$("(//span[contains(text(), 'group1')])[2]"); 
        const actualGroups = await groups.getText();
        assert.strictEqual(actualGroups, 'group1', 'Expected "Groups" text is not present');
        // For "Monitor Queues"
        const queues = await this.quickView.$("//span[contains(text(), '9000')]"); 
        const actualQueues = await queues.getText();
        assert.strictEqual(actualQueues, '9000 | TestQueue11', 'Expected "Monitor Queues" text is not present');
    }

    async assertEditedWebQucikViewAtributes() {
        await this.waitForQuickView();
        // For Name
        const name = await this.quickView.$(`//p[contains(text(), "${global.editUsersNameWeb}")]`); 
        const actualName = await name.getText();
        assert.strictEqual(actualName, global.editUsersNameWeb, 'Expected "Name" text is not present');
        // For "Status"
        const status = await this.quickView.$("//span[contains(text(), 'Inactive')]"); 
        const actualStatus = await status.getText();
        assert.strictEqual(actualStatus, 'Inactive', 'Expected "Status" text is not present');
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

module.exports = new AssertionsUsers();