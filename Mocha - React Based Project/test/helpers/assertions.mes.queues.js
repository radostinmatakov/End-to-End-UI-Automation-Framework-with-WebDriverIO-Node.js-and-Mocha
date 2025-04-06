const assert = require('assert');

/**
 * sub page containing specific selectors and methods for assertions
 */
class AssertionsMesQueues {
    // Getters for Assertions
    get queueNumber() {
        return $('//td[normalize-space()="9998"]');
    }
    get queueNumberCopy() {
        return $('//td[normalize-space()="9997"]');
    }
    get queueName() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[2]");
    }
    get queueStatus() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[3]");
    }
    get queueMembers() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[4]");
    }
    get maxWaitingTime() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[5]");
    }
    get agentTimeout() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[6]");
    }
    get serviceLevel() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[7]");
    }
    get chatDestribution() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[8]");
    }
    get autoFill() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[9]");
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

    async waitForDissableMessage() {
        await browser.waitUntil(
            async () => await this.notifyMessage.waitForDisplayed(),
            {
                timeout: 25000, // Maximum time to wait in milliseconds (25 seconds)
                interval: 500,  // Interval between condition checks in milliseconds (0.5 seconds)
                timeoutMsg: 'Success message did not appear within the expected time.' // Custom error message
            }
        );
    }
    async assertDissableMessage(message) {
        await this.waitForDissableMessage();
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
    }

    async waitForEnableMessage() {
        await browser.waitUntil(
            async () => await this.notifyMessage.waitForDisplayed(),
            {
                timeout: 25000, // Maximum time to wait in milliseconds (25 seconds)
                interval: 500,  // Interval between condition checks in milliseconds (0.5 seconds)
                timeoutMsg: 'Success message did not appear within the expected time.' // Custom error message
            }
        );
    }
    async assertEnableMessage(message) {
        await this.waitForEnableMessage();
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

    // Text assertion in table
    // Number
    async waitForCreatedQueueNumber() {
        await this.queueNumber.waitForDisplayed();
    }
    async assertCreatedQueueNumberLinkText(expectedText) {
        await this.waitForCreatedQueueNumber();
        const actualText = await this.queueNumber.getText();
        assert.ok(actualText.includes(expectedText), `Expected "${expectedText}" to be in "${actualText}"`);
    }
    async waitForCopiedQueueNumber() {
        await this.queueNumberCopy.waitForDisplayed();
    }
    async assertCopiedQueueNumberLinkText(expectedText) {
        await this.waitForCopiedQueueNumber();
        const actualText = await this.queueNumberCopy.getText();
        assert.ok(actualText.includes(expectedText), `Expected "${expectedText}" to be in "${actualText}"`);
    }

    // Name
    async waitForCreatedQueuesName() {
        await this.queueName.waitForDisplayed();
    }
    async assertCreatedQueueNameLinkText() {
        await this.waitForCreatedQueuesName();
        const actualText = await this.queueName.getText();
        assert.ok(actualText.includes(global.mesQueuesName), `Expected "${global.mesQueuesName}" to be in "${actualText}"`);
    }
    async waitForEditedQueuesName() {
        await this.queueName.waitForDisplayed();
    }
    async assertEditedQueueNameLinkText() {
        await this.waitForEditedQueuesName();
        const actualText = await this.queueName.getText();
        assert.ok(actualText.includes(global.editMesQueuesName), `Expected "${global.editMesQueuesName}" to be in "${actualText}"`);
    }
    async waitForCopiedQueuesName() {
        await this.queueName.waitForDisplayed();
    }
    async assertCopiedQueueNameLinkText() {
        await this.waitForCopiedQueuesName();
        const actualText = await this.queueName.getText();
        assert.ok(actualText.includes(global.copyMesQueuesName), `Expected "${global.copyMesQueuesName}" to be in "${actualText}"`);
    }

    // Attributes
    async waitForCreatedQueuesAttributes() {
        await this.queueName.waitForDisplayed();
    }
    async assertCreatedQueueAttributesText() {
        await this.waitForCreatedQueuesAttributes();
        const actualStatus = await this.queueStatus.getText();
        assert.strictEqual(actualStatus, 'Active', 'Expected Mes Q status is not present');
        const actualMember = await this.queueMembers.getText();
        assert.strictEqual(actualMember, '3', 'Expected Mes Q members are not present');    
        const actualWaiting = await this.maxWaitingTime.getText();
        assert.strictEqual(actualWaiting, '1 Seconds', 'Expected Mes Q Waiting time is not present');  
        const actualAgentTime = await this.agentTimeout.getText();
        assert.strictEqual(actualAgentTime, '1 Seconds', 'Expected Mes Q Agent Timeout is not present');    
        const actualService = await this.serviceLevel.getText();
        assert.strictEqual(actualService, '2 Seconds', 'Expected Mes Q Service Level is not present');  
        const actualChatDest = await this.chatDestribution.getText();
        assert.strictEqual(actualChatDest, 'To everybody', 'Expected Mes Q Chat Destribution is not present');   
        const actualAutoFill = await this.autoFill.getText();
        assert.strictEqual(actualAutoFill, 'Yes', 'Expected Mes Q Auto Fill is not present'); 
    }
    async assertEditedQueueAttributesText() {
        await this.waitForCreatedQueuesAttributes();
        const actualStatus = await this.queueStatus.getText();
        assert.strictEqual(actualStatus, 'Inactive', 'Expected Mes Q status is not present');
        const actualMember = await this.queueMembers.getText();
        assert.strictEqual(actualMember, '2', 'Expected Mes Q members are not present');    
        const actualWaiting = await this.maxWaitingTime.getText();
        assert.strictEqual(actualWaiting, '10 Seconds', 'Expected Mes Q Waiting time is not present');  
        const actualAgentTime = await this.agentTimeout.getText();
        assert.strictEqual(actualAgentTime, '8 Seconds', 'Expected Mes Q Agent Timeout is not present');    
        const actualService = await this.serviceLevel.getText();
        assert.strictEqual(actualService, '6 Seconds', 'Expected Mes Q Service Level is not present');  
        const actualChatDest = await this.chatDestribution.getText();
        assert.strictEqual(actualChatDest, 'Randomly send chat to user', 'Expected Mes Q Chat Destribution is not present');   
        const actualAutoFill = await this.autoFill.getText();
        assert.strictEqual(actualAutoFill, 'No', 'Expected Mes Q Auto Fill is not present'); 
    }

    // Empty table attributes
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
    // Text assertions of the Sideview
    // TO DO 

    
    // Assertions of the DOM 
    async assertStatusAfterDissabled() {
        await this.queueStatus.waitForDisplayed({ timeout: 5000 });
        const actualStatus = await this.queueStatus.getText();
        assert.strictEqual(actualStatus, 'Inactive', 'Expected Mes Q status is not present');
    }

    async assertStatusAfterEnabled() {
        await this.queueStatus.waitForDisplayed({ timeout: 5000 });
        const actualStatus = await this.queueStatus.getText();
        assert.strictEqual(actualStatus, 'Active', 'Expected Mes Q status is not present');
    }
    
}

module.exports = new AssertionsMesQueues();