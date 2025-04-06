const assert = require('assert');

/**
 * sub page containing specific selectors and methods for assertions
 */
class AssertionsRoles {
    // Getters for Assertions
    get roleName() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[1]");
    }
    get roleLevel() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[2]");
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
    get sideview() {
        return $("div[class='space-y-5 p-5']"); 
    }
    get sideviewGeneral() {
        return $("(//button[contains(@class, 'flex justify-between')])[7]"); 
    }
    get permissionsGen () {
        return $("//div[contains(@class, 'px-4 pt-4 pb-2')]//span[contains(text(), 'Enable to see permissions here...')]"); 
    }
    get sideviewMyScope() {
        return $("(//div[contains(@class, 'grid grid-cols-2')])[2]"); 
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
    async waitForCreatedRoleLevel() {
        await this.roleLevel.waitForDisplayed();
    }
    async assertCreatedRoleLevelLinkText(expectedText) {
        await this.waitForCreatedRoleLevel();
        const actualText = await this.roleLevel.getText();
        assert.ok(actualText.includes(expectedText), `Expected "${expectedText}" to be in "${actualText}"`);
    }

    async waitForCreatedRoleName() {
        await this.roleName.waitForDisplayed();
    }
    async assertCreatedRoleNameLinkText(expectedText) {
        await this.waitForCreatedRoleName();
        const actualText = await this.roleName.getText();
        assert.ok(actualText.includes(expectedText), `Expected "${expectedText}" to be in "${actualText}"`);
    }

    async waitForQuickView() {
        await this.quickView.waitForDisplayed();
    }
    async assertCreateRoleQucikViewAtributes() {
        await this.waitForQuickView();
        // For "Name"
        const nameLocators = {
            TestQA: `//p[contains(text(), "TestQA")]`,
            TestQAedit: `//p[contains(text(), "TestQAedit")]`,
            TestQACopy: `//p[contains(text(), "TestQACopy")]`
        };
        const expectedNames = Object.keys(nameLocators); 
        let actualName = null;
        if (await this.quickView.$(nameLocators.TestQAedit).isExisting()) {
            actualName = 'TestQAedit';
        } else if (await this.quickView.$(nameLocators.TestQACopy).isExisting()) {
            actualName = 'TestQACopy';
        } else if (await this.quickView.$(nameLocators.TestQA).isExisting()) {
            actualName = 'TestQA';
        }
        console.log(`Actual 'Name' found: ${actualName}`);
        assert.strictEqual(
            expectedNames.includes(actualName),
            true,
            `Expected "Name" text to be one of ${expectedNames.join(', ')}, but found "${actualName}".`
        );
        // For "Level"
        const levelLocators = {
            Agent: `//p[contains(text(), "Agent")]`,
            Admin: `//p[contains(text(), "Admin")]`,
            Manager: `//p[contains(text(), "Manager")]`
        };
        let actualLevel = null;
        if (await this.quickView.$(levelLocators.Admin).isExisting()) {
            actualLevel = 'Admin';
        } else if (await this.quickView.$(levelLocators.Manager).isExisting()) {
            actualLevel = 'Manager';
        } else if (await this.quickView.$(levelLocators.Agent).isExisting()) {
            actualLevel = 'Agent';
        }
        console.log(`Actual 'Level' found: ${actualLevel}`);
        assert.ok(
            actualLevel !== null,
            'Expected Level to be "Agent", "Admin", or "Manager", but none was found in the DOM.'
        );      
    }

    async waitForQuickView() {
        await this.sideview.waitForDisplayed();
    }
    async assertDissabledPermissions() {
        await this.waitForQuickView();
        // General permissions
        const generalText = await this.sideviewGeneral.$('(//label[normalize-space()="General"])[1]');
        const actualGeneral = await generalText.getText();
        assert.strictEqual(actualGeneral, 'General', 'Expected "General" text is not present');
        // Get and assert the text content
        const actualText = await this.permissionsGen.getText();
        assert.strictEqual(actualText.trim(), 'Enable to see permissions here...', 'The text did not match the expected value');

        // My Score permissions
        const MyScoreText = await this.sideviewMyScope.$('//label[normalize-space()="My Score"]'); // Get all <p> elements
        const actualMyScore = await MyScoreText.getText(); 
        assert.strictEqual(actualMyScore, 'My Score', 'Expected "My Score" text is not present');
        // Verify disabled permissions
        const permissions = [
            { label: 'Own call history', selector: 'Own call history' },
            { label: 'Listen own call', selector: 'Listen own call' },
            { label: 'Callback action', selector: 'Callback action' },
            { label: 'Hide Outbound Numbers', selector: 'Hide Outbound Numbers' },
            { label: 'Hide inbound numbers', selector: 'Hide inbound numbers' }
        ];
        
        for (const { label, selector } of permissions) {
            console.log(`Checking permission(Dis): ${label}`)
            const textElement = await this.sideviewMyScope.$(`//label[normalize-space()='${selector}']`);
            const actualText = await textElement.getText();
            console.log(`Text found for My Scope(Dis) "${label}": ${actualText}`);
            assert.strictEqual(actualText, label, `Expected "${label}" text is not present`);
            // Verify switch state based on label
            const switchElement = await this.sideviewMyScope.$(`//label[normalize-space()='${selector}']/following-sibling::label/input[@type='checkbox']`);
            const isChecked = await switchElement.isSelected();
            // Log the current state of the switch
            console.log(`Switch for MyScope (Dis)"${label}" is ${isChecked ? 'active' : 'inactive'}`);
            if (label === 'Own call history' || label === 'Listen own call') {
                // Ensure that these two switches are inactive (unchecked)
                assert.ok(!isChecked, `Expected "${label}" switch to be inactive`);
            } else {
                // Ensure all other switches are active (checked) for all others
                assert.ok(isChecked, `Expected "${label}" switch to be active`);
            }
        }
    }
    async assertEnabledPermissions() {
        await this.waitForQuickView();
        // General permissions
        const generalText = await this.sideviewGeneral.$('(//label[normalize-space()="General"])[1]');
        const actualGeneral = await generalText.getText();
        assert.strictEqual(actualGeneral, 'General', 'Expected "General" text is not present');
        // **General Permissions Switches**: Adding similar checks for general permissions as in MyScore
        const generalPermissions = [
            { label: 'Spy', selector: 'Spy' },
            { label: 'Whisper', selector: 'Whisper' },
            { label: 'Barge', selector: 'Barge' },
            { label: 'Personal Settings', selector: 'Personal Settings' },
            { label: 'Voice Mail List', selector: 'Voice Mail List' },
            { label: 'Delete Voice Mail', selector: 'Delete Voice Mail' },
            { label: 'Unmask last #', selector: 'Unmask last #' }
        ];

        for (const { label, selector } of generalPermissions) {
            // Skip "Unmask last #" because it's not a toggle menu
            if (label === 'Unmask last #') {
                console.log(`Skipping permission: ${label}`);
                continue;  // Skip to the next permission
            }
            // Get the label text for the permission
            const textElement = await this.sideviewGeneral.$(`//label[normalize-space()='${selector}']`);
            const actualLabelText = await textElement.getText();
            console.log(`Text found for General "${label}": ${actualLabelText}`);
            assert.strictEqual(actualLabelText, label, `Expected "${label}" text is not present`);
            // Verify the state of the switch (should be active for all permissions)
            const switchElement = await this.sideviewGeneral.$(`//label[normalize-space()='${selector}']/following-sibling::label/input[@type='checkbox']`);
            const isChecked = await switchElement.isSelected();
            // Log the current state of the switch
            console.log(`Switch for General(En) "${label}" is ${isChecked ? 'active' : 'inactive'}`);
            // Ensure the switch is active (checked)
            assert.ok(isChecked, `Expected "${label}" switch to be active`);
        }

        // My Score permissions
        const MyScoreText = await this.sideviewMyScope.$('//label[normalize-space()="My Score"]'); // Get all <p> elements
        const actualMyScore = await MyScoreText.getText(); 
        assert.strictEqual(actualMyScore, 'My Score', 'Expected "My Score" text is not present');
        // Verify disabled permissions
        const permissions = [
            { label: 'Own call history', selector: 'Own call history' },
            { label: 'Listen own call', selector: 'Listen own call' },
            { label: 'Callback action', selector: 'Callback action' },
            { label: 'Hide Outbound Numbers', selector: 'Hide Outbound Numbers' },
            { label: 'Hide inbound numbers', selector: 'Hide inbound numbers' }
        ];
        
        for (const { label, selector } of permissions) {
            console.log(`Checking permission(En): ${label}`)
            const textElement = await this.sideviewMyScope.$(`//label[normalize-space()='${selector}']`);
            const actualText = await textElement.getText();
            console.log(`Text found for My Scope(En) "${label}": ${actualText}`);
            assert.strictEqual(actualText, label, `Expected "${label}" text is not present`);
            
            // Verify switch state based on label
            const switchElement = await this.sideviewMyScope.$(`//label[normalize-space()='${selector}']/following-sibling::label/input[@type='checkbox']`);
            const isChecked = await switchElement.isSelected();
            // Log the current state of the switch
            console.log(`Switch for MyScope (En) "${label}" is ${isChecked ? 'active' : 'inactive'}`);
            // Ensure that the switch is active (checked) for all
            assert.ok(isChecked, `Expected "${label}" switch to be active`);
        }
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

module.exports = new AssertionsRoles();