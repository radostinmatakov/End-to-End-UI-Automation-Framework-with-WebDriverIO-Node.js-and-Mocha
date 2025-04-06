const LoginPageAdmin = require('../../../../pageobjects_main/login.page.admin.js')
const QueuesPage = require('../../pageobjects_main/pageobjects/queues.page')
const AssertionsQueues = require('../../../../helpers/assertions.queues.js')
const TestConfig = require('../../../../data/TestConfig.js');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Create, Edit, Copy, Disable/Enable, Delete Queues', () => {
    it('Create Queues successfully.\nA pop-up message for update should be displayed after creating the Queues.', async () => {
        await QueuesPage.open()
        await QueuesPage.waitForPageLoad()
        await QueuesPage.createQueue(global.queuesName, TestConfig.queuesNum, TestConfig.searchAgent) 
        await AssertionsQueues.assertSuccessMessage(TestConfig.successMsgQ)
    })

    it('Search the create Queues successfully.\nAssert the Queues name and number are present and correct.', async () => {
        await QueuesPage.open()
        await QueuesPage.waitForPageLoad()
        await QueuesPage.searchCreatedQueue(global.queuesName) 
        await AssertionsQueues.assertCreatedQueueNumberLinkText(TestConfig.queuesNum)
        await AssertionsQueues.assertCreatedQueueNameLinkText()
    })

    it('Edit Queues successfully.\nA pop-up message for update should be displayed after editing the Queues.', async () => {
        await QueuesPage.open()
        await QueuesPage.waitForPageLoad()
        await QueuesPage.editQueue(global.queuesName, global.editQueuesName) 
        await AssertionsQueues.assertUpdateMessage(TestConfig.updateMsgQ)
    })

    it('Search the edited Queues successfully.\nAssert the Queues name and number are present and correct.', async () => {
        await QueuesPage.open()
        await QueuesPage.waitForPageLoad()
        await QueuesPage.searchCreatedQueue(global.editQueuesName) 
        await AssertionsQueues.assertEditedQueueNameLinkText()
    })

    it('Copy Queues successfully.\nA pop-up message for update should be displayed after copying the Queues.', async () => {
        await QueuesPage.open()
        await QueuesPage.waitForPageLoad()
        await QueuesPage.copyQueue(global.editQueuesName, global.copyQueuesName, TestConfig.copyQueuesNum)
        await AssertionsQueues.assertSuccessMessage(TestConfig.successMsgQ)
    })

    it('Search the copied Queues successfully.\nAssert the Queues name and number are present and correct.', async () => {
        await QueuesPage.open()
        await QueuesPage.waitForPageLoad()
        await QueuesPage.searchCopiedQueue(global.copyQueuesName) 
        await AssertionsQueues.assertCopiedQueueNumberLinkText(TestConfig.copyQueuesNum)
        await AssertionsQueues.assertCopiedQueueNameLinkText()
    })

    it('Disable Queues successfully.\nAssert that the row is dissabled successfully.', async () => {
        await QueuesPage.open()
        await QueuesPage.waitForPageLoad()
        await QueuesPage.disableQueue(global.editQueuesName)
        await AssertionsQueues.assertTableRowIsDisabled()
        await AssertionsQueues.assertDissableMessage(TestConfig.disableMsg)
        await QueuesPage.disableQueue(global.copyQueuesName)
        await AssertionsQueues.assertTableRowIsDisabled()
        await AssertionsQueues.assertDissableMessage(TestConfig.disableMsg)
    })

    it('Enable Queues successfully.\nAssert that the row is enabled successfully.', async () => {
        await QueuesPage.open()
        await QueuesPage.waitForPageLoad()
        await QueuesPage.enableQueue(global.copyQueuesName)
        await AssertionsQueues.assertTableRowIsEnabled()
        await AssertionsQueues.assertEnableMessage(TestConfig.enableMsg)
    })

    it('Disable Queues successfully.\nAssert that the row is dissabled successfully.', async () => {
        await QueuesPage.open()
        await QueuesPage.waitForPageLoad()
        await QueuesPage.disableQueue(global.copyQueuesName)
        await AssertionsQueues.assertTableRowIsDisabled()
        await AssertionsQueues.assertDissableMessage(TestConfig.disableMsg)
    })

    it('Delete Queues successfully.\nA pop-up message for update should be displayed after deleting the Queues.', async () => {
        await QueuesPage.open()
        await QueuesPage.waitForPageLoad()
        await QueuesPage.deleteQueue(global.editQueuesName) 
        await AssertionsQueues.assertEmptyTable(TestConfig.emptyTable)
        await AssertionsQueues.assertDeleteMessage(TestConfig.deleteMsgQ)
        await QueuesPage.deleteQueue(global.copyQueuesName) 
        await AssertionsQueues.assertEmptyTable(TestConfig.emptyTable)
        await AssertionsQueues.assertDeleteMessage(TestConfig.deleteMsgQ)
    })
})
