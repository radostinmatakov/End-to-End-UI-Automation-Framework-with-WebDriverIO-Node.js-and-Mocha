const LoginPageAdmin = require('../../../pageobjects_main/login.page.admin.js')
const MessQueuesPage = require('../../../pageobjects_main/pageobjects/Sideview menu/Messaging/mes.queues.page')
const UsersPage = require('../../../pageobjects_main/pageobjects/Sideview menu/Users and Permissions/users.page.js')
const ExtPage = require('../../../pageobjects_main/pageobjects/Sideview menu/Users and Permissions/ext.page')
const AssertionsMesQueues = require('../../../helpers/assertions.mes.queues.js')
const AssertionsUsers = require('../../../helpers/assertions.users.js')
const AssertionsExt = require('../../../helpers/assertions.ext.js')
const TestConfig = require('../../../data/TestConfig.js');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Create, Edit, Copy, Disable/Enable, Delete Messaging Queues', () => {
    before(async () => {
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await browser.pause(1000)
        try {
            await ExtPage.searchExt(TestConfig.userMesQwebNumber);
            const hasResult = await ExtPage.isExtPresent();
            if (hasResult) {
                await ExtPage.deleteExtBefore(TestConfig.userMesQwebNumber);
                await AssertionsExt.assertDeleteMessage(TestConfig.deleteMsgE);
                await ExtPage.closeNotification();
                await ExtPage.clearSearch()
            } else {
                await ExtPage.clearSearch()
                console.log(`ℹ️ Extension ${TestConfig.userMesQwebNumber} not found — skipping delete.`);
            }
        } catch (error) {
            console.warn(`⚠️ Error while trying to delete extension: ${error.message}`);
        }
        await MessQueuesPage.open();
        await MessQueuesPage.waitForPageLoad();
        try {
            await MessQueuesPage.searchQueue(TestConfig.queuesNum);
            const isQueuePresent1 = await MessQueuesPage.isQueuePresent(TestConfig.queuesNum);
            if (isQueuePresent1) {
                await MessQueuesPage.disableDeleteMesQueue(TestConfig.queuesNum, TestConfig.disableMsMq);
                await AssertionsMesQueues.assertDeleteMessage(TestConfig.deleteMsgMq);
            } else {
                console.log(`ℹ️ Mes.Queue ${TestConfig.queuesNum} not found — skipping delete.`);
            }
        } catch (error) {
            console.warn(`⚠️ Error while trying to delete Mes.Queue ${TestConfig.queuesNum}: ${error.message}`);
        }
        await MessQueuesPage.open();
        await MessQueuesPage.clearSearch();
        await MessQueuesPage.waitForPageLoad();
        try {
            await MessQueuesPage.searchQueue(TestConfig.copyQueuesNum);
            const isQueuePresent2 = await MessQueuesPage.isQueuePresent(TestConfig.copyQueuesNum);
            if (isQueuePresent2) {
                await MessQueuesPage.disableDeleteMesQueue(TestConfig.copyQueuesNum, TestConfig.disableMsMq);
                await AssertionsMesQueues.assertDeleteMessage(TestConfig.deleteMsgMq);
                await MessQueuesPage.clearSearch();
            } else {
                await MessQueuesPage.clearSearch();
                console.log(`ℹ️ Mes.Queue ${TestConfig.copyQueuesNum} not found — skipping delete.`);
            }
        } catch (error) {
            console.warn(`⚠️ Error while trying to delete Mes.Queue ${TestConfig.copyQueuesNum}: ${error.message}`);
        }
    
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await UsersPage.createUserAdminWEB(global.usersNameMesQ, global.usersEmailMesQ, TestConfig.userPhone, TestConfig.userMesQwebName, TestConfig.userMesQwebNumber, TestConfig.successMsgE)
        await AssertionsUsers.assertSuccessMessage(TestConfig.successMsgU)
        await UsersPage.closeNotification()
    });
    
    it('Create Messaging Queues successfully.\nA pop-up message for update should be displayed after creating the Queues.', async () => {
        await MessQueuesPage.open()
        await MessQueuesPage.clearSearch()
        await MessQueuesPage.waitForPageLoad()
        await MessQueuesPage.createMesQueue(global.mesQueuesName, TestConfig.queuesNum, global.usersNameMesQ) 
        await AssertionsMesQueues.assertSuccessMessage(TestConfig.successMsgMq)
        await MessQueuesPage.closeNotification()
        await MessQueuesPage.closeSideviewMenu()
    })

    it('Search the create Messaging Queues successfully.\nAssert the Queues name and number are present and correct.', async () => {
        await MessQueuesPage.searchQueue(global.mesQueuesName) 
        await AssertionsMesQueues.assertCreatedQueueNumberLinkText(TestConfig.queuesNum)
        await AssertionsMesQueues.assertCreatedQueueNameLinkText()
        await AssertionsMesQueues.assertCreatedQueueAttributesText()
        await MessQueuesPage.clearSearch()
    })

    it('Edit Messaging Queues successfully.\nA pop-up message for update should be displayed after editing the Queues.', async () => {
        await MessQueuesPage.editMesQueue(global.mesQueuesName, global.editMesQueuesName) 
        await AssertionsMesQueues.assertUpdateMessage(TestConfig.updateMsgMq)
        await MessQueuesPage.closeNotification()
        await MessQueuesPage.closeSideviewMenu()
        await MessQueuesPage.clearSearch()
        await browser.pause(1000)
    })

    it('Search the edited Messaging Queues successfully.\nAssert the Queues name is present and correct.', async () => {
        await MessQueuesPage.searchQueue(TestConfig.queuesNum) 
        await AssertionsMesQueues.assertEditedQueueNameLinkText()
        await AssertionsMesQueues.assertEditedQueueAttributesText()
        await MessQueuesPage.clearSearch()
    })

    it('Copy Messaging Queues successfully.\nA pop-up message for update should be displayed after copying the Queues.', async () => {
        await MessQueuesPage.copyQueue(global.editMesQueuesName, global.copyMesQueuesName, TestConfig.copyQueuesNum)
        await AssertionsMesQueues.assertSuccessMessage(TestConfig.successMsgMq)
        await MessQueuesPage.closeNotification()
        await MessQueuesPage.closeSideviewMenu()
        await MessQueuesPage.clearSearch()
        await browser.pause(1000)
    })

    it('Search the copied Messaging Queues successfully.\nAssert the Queues name and number are present and correct.', async () => {
        await MessQueuesPage.searchQueue(global.copyMesQueuesName) 
        await AssertionsMesQueues.assertCopiedQueueNumberLinkText(TestConfig.copyQueuesNum)
        await AssertionsMesQueues.assertCopiedQueueNameLinkText()
        await MessQueuesPage.clearSearch()
    })

    it('Disable Messaging Queues successfully.\nAssert that the row is dissabled successfully.', async () => {
        await MessQueuesPage.disableMesQueue(global.copyMesQueuesName)
        await browser.pause(1000)
        await AssertionsMesQueues.assertStatusAfterDissabled()
        await AssertionsMesQueues.assertDissableMessage(TestConfig.disableMsMq)
    })

    it('Enable Messaging Queues successfully.\nAssert that the row is enabled successfully.', async () => {
        await MessQueuesPage.enableQueue(global.editMesQueuesName)
        await browser.pause(1000)
        await AssertionsMesQueues.assertStatusAfterEnabled()
        await AssertionsMesQueues.assertEnableMessage(TestConfig.enableMsMq)
    })

    it('Disable Messaging Queues successfully.\nAssert that the row is dissabled successfully.', async () => {
        await MessQueuesPage.disableMesQueue(global.editMesQueuesName)
        await browser.pause(1000)
        await AssertionsMesQueues.assertStatusAfterDissabled()
        await AssertionsMesQueues.assertDissableMessage(TestConfig.disableMsMq)
    })

    it('Delete Messaging Queues successfully.\nA pop-up message for update should be displayed after deleting the Queues.', async () => {
        await MessQueuesPage.deleteQueue(global.editMesQueuesName) 
        //await AssertionsQueues.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsQueues.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsMesQueues.assertEmptyTableIcon()
        await AssertionsMesQueues.assertDeleteMessage(TestConfig.deleteMsgMq)
        await MessQueuesPage.closeNotification()
        await MessQueuesPage.deleteQueue(global.copyMesQueuesName) 
        //await AssertionsQueues.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsQueues.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsMesQueues.assertEmptyTableIcon()
        await AssertionsMesQueues.assertDeleteMessage(TestConfig.deleteMsgMq)
    })

    after(async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await browser.pause(1000)
        await UsersPage.deleteUser(global.usersNameMesQ)
        await AssertionsUsers.assertDeleteMessage(TestConfig.deleteMsgU)
        await AssertionsUsers.assertEmptyTable(TestConfig.emptyTable)
        await AssertionsUsers.assertEmptyTableIcon()
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await browser.pause(1000)
        await ExtPage.deleteExt(TestConfig.userMesQwebName) 
        await AssertionsExt.assertDeleteMessage(TestConfig.deleteMsgE)
        await ExtPage.closeNotification()
        //await AssertionsExt.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsExt.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsExt.assertEmptyTableIcon()
    });
})
