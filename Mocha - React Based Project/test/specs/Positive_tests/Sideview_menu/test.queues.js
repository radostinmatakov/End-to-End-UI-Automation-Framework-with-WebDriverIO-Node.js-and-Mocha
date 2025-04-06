const LoginPageAdmin = require('../../../pageobjects_main/login.page.admin.js')
const QueuesPage = require('../../../pageobjects_main/pageobjects/Sideview menu/Voice/queues.page')
const ExtPage = require('../../../pageobjects_main/pageobjects/Sideview menu/Users and Permissions/ext.page')
const AssertionsQueues = require('../../../helpers/assertions.queues.js')
const AssertionsExt = require('../../../helpers/assertions.ext.js')
const TestConfig = require('../../../data/TestConfig.js');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Create, Edit, Copy, Disable/Enable, Delete Queues', () => {
    before(async () => {
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await browser.pause(1000)
        try {
            await ExtPage.searchExt(TestConfig.extAgentNumber);
            const hasResult = await ExtPage.isExtPresent();
            if (hasResult) {
                await ExtPage.deleteExtBefore(TestConfig.extAgentNumber);
                await AssertionsExt.assertDeleteMessage(TestConfig.deleteMsgE);
                await ExtPage.closeNotification();
                await ExtPage.clearSearch()
            } else {
                await ExtPage.clearSearch()
                console.log(`ℹ️ Extension ${TestConfig.extAgentNumber} not found — skipping delete.`);
            }
        } catch (error) {
            console.warn(`⚠️ Error while trying to delete extension: ${error.message}`);
        }
        await QueuesPage.open();
        await QueuesPage.waitForPageLoad();
        try {
            await QueuesPage.searchQueue(TestConfig.queuesNum);
            const isQueuePresent1 = await QueuesPage.isQueuePresent(TestConfig.queuesNum);
            if (isQueuePresent1) {
                await QueuesPage.disableDeleteQueue(TestConfig.queuesNum, TestConfig.disableMsg);
                await AssertionsQueues.assertDeleteMessage(TestConfig.deleteMsgQ);
            } else {
                console.log(`ℹ️ Queue ${TestConfig.queuesNum} not found — skipping delete.`);
            }
        } catch (error) {
            console.warn(`⚠️ Error while trying to delete Queue ${TestConfig.queuesNum}: ${error.message}`);
        }
        await QueuesPage.open();
        await QueuesPage.clearSearch();
        await QueuesPage.waitForPageLoad();
        try {
            await QueuesPage.searchQueue(TestConfig.copyQueuesNum);
            const isQueuePresent2 = await QueuesPage.isQueuePresent(TestConfig.copyQueuesNum);
            if (isQueuePresent2) {
                await QueuesPage.disableDeleteQueue(TestConfig.copyQueuesNum, TestConfig.disableMsg);
                await AssertionsQueues.assertDeleteMessage(TestConfig.deleteMsgQ);
                await QueuesPage.clearSearch()
            } else {
                await QueuesPage.clearSearch();
                console.log(`ℹ️ Queue ${TestConfig.copyQueuesNum} not found — skipping delete.`);
            }
        } catch (error) {
            console.warn(`⚠️ Error while trying to delete Queue ${TestConfig.copyQueuesNum}: ${error.message}`);
        }

        await ExtPage.open()
        await browser.pause(1000)
        await ExtPage.waitForPageLoad()
        await ExtPage.createExtWeb(TestConfig.extAgent, TestConfig.extAgentNumber) 
        await AssertionsExt.assertSuccessMessage(TestConfig.successMsgE)
        await ExtPage.closeNotification()
    });
    
    it('Create Queues successfully.\nA pop-up message for update should be displayed after creating the Queues.', async () => {
        await QueuesPage.open()
        await QueuesPage.waitForPageLoad()
        await QueuesPage.createQueue(global.queuesName, TestConfig.queuesNum, TestConfig.extAgent) 
        await AssertionsQueues.assertSuccessMessage(TestConfig.successMsgQ)
        await QueuesPage.closeNotification()
    })

    it('Search the create Queues successfully.\nAssert the Queues name and number are present and correct.', async () => {
        await QueuesPage.searchQueue(global.queuesName) 
        await AssertionsQueues.assertCreatedQueueNumberLinkText(TestConfig.queuesNum)
        await AssertionsQueues.assertCreatedQueueNameLinkText()
        await QueuesPage.clearSearch()
    })

    it('Edit Queues successfully.\nA pop-up message for update should be displayed after editing the Queues.', async () => {
        await QueuesPage.editQueue(global.queuesName, global.editQueuesName) 
        await AssertionsQueues.assertUpdateMessage(TestConfig.updateMsgQ)
        await QueuesPage.closeNotification()
        await QueuesPage.clearSearch()
        await browser.pause(1000)
    })

    it('Search the edited Queues successfully.\nAssert the Queues name is present and correct.', async () => {
        await QueuesPage.searchQueue(TestConfig.queuesNum) 
        await AssertionsQueues.assertEditedQueueNameLinkText()
        await QueuesPage.clearSearch()
    })

    it('Copy Queues successfully.\nA pop-up message for update should be displayed after copying the Queues.', async () => {
        await QueuesPage.copyQueue(global.editQueuesName, global.copyQueuesName, TestConfig.copyQueuesNum)
        await AssertionsQueues.assertSuccessMessage(TestConfig.successMsgQ)
        await QueuesPage.closeNotification()
        await QueuesPage.clearSearch()
        await browser.pause(1000)
    })

    it('Search the copied Queues successfully.\nAssert the Queues name and number are present and correct.', async () => {
        await QueuesPage.searchQueue(global.copyQueuesName) 
        await AssertionsQueues.assertCopiedQueueNumberLinkText(TestConfig.copyQueuesNum)
        await AssertionsQueues.assertCopiedQueueNameLinkText()
        await QueuesPage.clearSearch()
    })

    it('Disable Queues successfully.\nAssert that the row is dissabled successfully.', async () => {
        await QueuesPage.disableQueue(global.editQueuesName)
        await AssertionsQueues.assertTableRowIsDisabled()
        await AssertionsQueues.assertDissableMessage(TestConfig.disableMsg)
        await QueuesPage.disableQueue(global.copyQueuesName)
        await AssertionsQueues.assertTableRowIsDisabled()
        await AssertionsQueues.assertDissableMessage(TestConfig.disableMsg)
    })

    it('Enable Queues successfully.\nAssert that the row is enabled successfully.', async () => {
        await QueuesPage.enableQueue(global.copyQueuesName)
        await AssertionsQueues.assertTableRowIsEnabled()
        await AssertionsQueues.assertEnableMessage(TestConfig.enableMsgQ)
    })

    it('Disable Queues successfully.\nAssert that the row is dissabled successfully.', async () => {
        await QueuesPage.disableQueue(global.copyQueuesName)
        await AssertionsQueues.assertTableRowIsDisabled()
        await AssertionsQueues.assertDissableMessage(TestConfig.disableMsg)
    })

    it('Delete Queues successfully.\nA pop-up message for update should be displayed after deleting the Queues.', async () => {
        await QueuesPage.deleteQueue(global.editQueuesName) 
        //await AssertionsQueues.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsQueues.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsQueues.assertEmptyTableIcon()
        await AssertionsQueues.assertDeleteMessage(TestConfig.deleteMsgQ)
        await QueuesPage.closeNotification()
        await QueuesPage.deleteQueue(global.copyQueuesName) 
        //await AssertionsQueues.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsQueues.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsQueues.assertEmptyTableIcon()
        await AssertionsQueues.assertDeleteMessage(TestConfig.deleteMsgQ)
    })

    after(async () => {
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await ExtPage.deleteExt(TestConfig.extAgent) 
        await AssertionsExt.assertDeleteMessage(TestConfig.deleteMsgE)
        await ExtPage.closeNotification()
        //await AssertionsExt.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsExt.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsExt.assertEmptyTableIcon()
    });
})
