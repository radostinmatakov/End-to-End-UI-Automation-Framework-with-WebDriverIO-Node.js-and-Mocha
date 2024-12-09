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
        return $("(//div[@class='mantine-focus-auto m_b6d8b162 mantine-Text-root'])[2]");
    }
    get notifyMessage() {
        return $('#swal2-title');
    }
    get quickView() {
        return $("div.m_5df29311.text-sm.mantine-Drawer-body"); 
    }
    get quickViewGeneral() {
        return $("//div[contains(@class, 'grid') and .//p[text()='General']]"); 
    }
    get permissionsGen () {
        return $("div.mt-2.flex.gap-1.align-middle.text-center"); 
    }
    get quickViewMyScope() {
        return $("//div[contains(@class, 'grid') and .//p[text()='My Score']]"); 
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
        await this.quickView.waitForDisplayed();
    }
    async assertDissabledPermissions() {
        await this.waitForQuickView();
        // General permissions
        const generalText = await this.quickViewGeneral.$('p.text-dark');
        const actualGeneral = await generalText.getText();
        assert.strictEqual(actualGeneral, 'General', 'Expected "General" text is not present');
        /* Removed from the UI of the currect version deployd on 06/11/24
        // Locate the icon
        const iconGeneral = await this.quickViewGeneral.$('svg.lucide.lucide-x.text-gray');
        assert.ok(await iconGeneral.isExisting(), 'Expected icon with class "lucide lucide-x text-gray" is not present');
        */
        // Get and assert the text content
        const actualText = await this.permissionsGen.getText();
        assert.strictEqual(actualText.trim(), 'General permissions are disabled', 'The text did not match the expected value');

        // My Score permissions
        const MyScoreText = await this.quickViewMyScope.$('p.text-dark'); // Get all <p> elements
        const actualMyScore = await MyScoreText.getText(); 
        assert.strictEqual(actualMyScore, 'My Score', 'Expected "My Score" text is not present');
        // Locate icons and text for dissabled permissions
        // For "Own call history"
        const ownCallHistoryText = await this.quickViewMyScope.$("//p[contains(text(), 'Own call history')]"); // Text locator
        const ownCallHistoryIcon = await this.quickViewMyScope.$("(//*[name()='svg'][@class='lucide lucide-x text-gray'])[1]"); // Icon locator
        // Verify the text
        const actualOwnCallHistory = await ownCallHistoryText.getText();
        assert.strictEqual(actualOwnCallHistory, 'Own call history', 'Expected "Own call history" text is not present');
        // Verify the icon existence
        const iconOwnCallHistory = await ownCallHistoryIcon.isExisting();
        assert.ok(iconOwnCallHistory, 'Expected icon for "Own call history" is not present');
        // For "Listen own call"
        const listenOwnCallText = await this.quickViewMyScope.$("//p[contains(text(), 'Listen own call')]"); // Text locator
        const listenOwnCallIcon = await this.quickViewMyScope.$("(//*[name()='svg'][@class='lucide lucide-x text-gray'])[2]"); // Icon locator
        // Verify the text
        const actualListen = await listenOwnCallText.getText();
        assert.strictEqual(actualListen, 'Listen own call', 'Expected "Listen own call" text is not present');
        // Verify the icon existence
        const iconListen = await listenOwnCallIcon.isExisting();
        assert.ok(iconListen, 'Expected icon for "Listen own call" is not present');
    }
    async assertEnabledPermissions() {
        await this.waitForQuickView();
        // General permissions
        const generalText = await this.quickViewGeneral.$('p.text-dark');
        const actualGeneral = await generalText.getText();
        assert.strictEqual(actualGeneral, 'General', 'Expected "General" text is not present');
        /* Removed from the UI of the currect version deployd on 06/11/24
        // Locate the icon
        const iconGeneral = await this.quickViewGeneral.$('svg.lucide.lucide-check.text-success');
        assert.ok(await iconGeneral.isExisting(), 'Expected icon with class "lucide lucide-x text-gray" is not present');
        */
        // Locate icons and text for enabled permissions
        // For "Spy"
        const SpyText = await this.quickViewMyScope.$("//p[contains(text(), 'Spy')]"); // Text locator
        const SpyIcon = await this.quickViewMyScope.$("(//*[name()='svg'][@class='lucide lucide-check text-success'])[1]"); // Icon locator
        const actualSpy = await SpyText.getText();
        assert.strictEqual(actualSpy, 'Spy', 'Expected "Spy" text is not present');
        const iconSpy = await SpyIcon.isExisting();
        assert.ok(iconSpy, 'Expected icon for "Spy" is not present');
        // For "Whisper"
        const WhisperText = await this.quickViewMyScope.$("//p[contains(text(), 'Whisper')]"); // Text locator
        const WhisperIcon = await this.quickViewMyScope.$("(//*[name()='svg'][@class='lucide lucide-check text-success'])[2]"); // Icon locator
        const actualWhisper = await WhisperText.getText();
        assert.strictEqual(actualWhisper, 'Whisper', 'Expected "Whisper" text is not present');
        const iconWhisper = await WhisperIcon.isExisting();
        assert.ok(iconWhisper, 'Expected icon for "Whisper" is not present');
        // For "Barge"
        const BargeText = await this.quickViewMyScope.$("//p[contains(text(), 'Barge')]"); // Text locator
        const BargeIcon = await this.quickViewMyScope.$("(//*[name()='svg'][@class='lucide lucide-check text-success'])[3]"); // Icon locator
        const actualBarge = await BargeText.getText();
        assert.strictEqual(actualBarge, 'Barge', 'Expected "Barge" text is not present');
        const iconBarge = await BargeIcon.isExisting();
        assert.ok(iconBarge, 'Expected icon for "Barge" is not present');
        // For "Personal Settings"
        const PersonalText = await this.quickViewMyScope.$("//p[contains(text(), 'Personal Settings')]"); // Text locator
        const Personalcon = await this.quickViewMyScope.$("(//*[name()='svg'][@class='lucide lucide-check text-success'])[4]"); // Icon locator
        const actualPersonal = await PersonalText.getText();
        assert.strictEqual(actualPersonal, 'Personal Settings', 'Expected "Personal Settings" text is not present');
        const iconPersonal = await Personalcon.isExisting();
        assert.ok(iconPersonal, 'Expected icon for "Personal Settings" is not present');
        // For "Voice Mail List"
        const VoiceText = await this.quickViewMyScope.$("//p[contains(text(), 'Voice Mail List')]"); // Text locator
        const Voicelcon = await this.quickViewMyScope.$("(//*[name()='svg'][@class='lucide lucide-check text-success'])[5]"); // Icon locator
        const actualVoice = await VoiceText.getText();
        assert.strictEqual(actualVoice, 'Voice Mail List', 'Expected "Voice Mail List" text is not present');
        const iconVoice = await Voicelcon.isExisting();
        assert.ok(iconVoice, 'Expected icon for "Voice Mail List" is not present');
        // For "Delete Voice Mail"
        const DeleteText = await this.quickViewMyScope.$("//p[contains(text(), 'Delete Voice Mail')]"); // Text locator
        const Deletelcon = await this.quickViewMyScope.$("(//*[name()='svg'][@class='lucide lucide-check text-success'])[6]"); // Icon locator
        const actualDelete = await DeleteText.getText();
        assert.strictEqual(actualDelete, 'Delete Voice Mail', 'Expected "Delete Voice Mail" text is not present');
        const iconDelete = await Deletelcon.isExisting();
        assert.ok(iconDelete, 'Expected icon for "Delete Voice Mail" is not present');
        // My Score permissions
        const generalTexts = await this.quickViewMyScope.$('p.text-dark'); // Get all <p> elements
        const actualText3 = await generalTexts.getText(); // Get the second element
        assert.strictEqual(actualText3, 'My Score', 'Expected "My Score" text is not present');
        // Locate icons and text for dissabled permissions
        // For "Own call history"
        const ownCallHistoryText = await this.quickViewMyScope.$("//p[contains(text(), 'Own call history')]"); // Text locator
        const ownCallHistoryIcon = await this.quickViewMyScope.$("(//*[name()='svg'][@class='lucide lucide-check text-success'])[7]"); // Icon locator
        // Verify the text
        const actualText4 = await ownCallHistoryText.getText();
        assert.strictEqual(actualText4, 'Own call history', 'Expected "Own call history" text is not present');
        // Verify the icon existence
        const iconExists = await ownCallHistoryIcon.isExisting();
        assert.ok(iconExists, 'Expected icon for "Own call history" is not present');
        // For "Listen own call"
        const listenOwnCallText = await this.quickViewMyScope.$("//p[contains(text(), 'Listen own call')]"); // Text locator
        const listenOwnCallIcon = await this.quickViewMyScope.$("(//*[name()='svg'][@class='lucide lucide-check text-success'])[8]"); // Icon locator
        // Verify the text
        const actualListen = await listenOwnCallText.getText();
        assert.strictEqual(actualListen, 'Listen own call', 'Expected "Listen own call" text is not present');
        // Verify the icon existence
        const iconListen = await listenOwnCallIcon.isExisting();
        assert.ok(iconListen, 'Expected icon for "Listen own call" is not present');
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

module.exports = new AssertionsRoles();