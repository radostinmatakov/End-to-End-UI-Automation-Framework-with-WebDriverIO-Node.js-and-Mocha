const LoginPageAdmin = require('../../../pageobjects_main/login.page.admin.js')
const IVRPage = require('../../../pageobjects_main/pageobjects/Sideview menu/Voice/ivr.page')
const AssertionsIVR = require('../../../helpers/assertions.ivr.js')
const TestConfig = require('../../../data/TestConfig.js');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Create, Edit, Copy, Delete IVR', () => {
    it('Create IVR successfully.\nA pop-up message for update should be displayed after creating the IVR.', async () => {
        await IVRPage.open()
        await IVRPage.waitForPageLoad()
        await IVRPage.createIVR(global.IVRName, TestConfig.desc, TestConfig.input, TestConfig.inputTwo, TestConfig.input, TestConfig.inputTwo) 
        //await AssertionsIVR.assertSuccessMessage(TestConfig.successMsgI)
        await AssertionsIVR.assertSuccessMessage("general.success.created")
        await IVRPage.closeNotification()
    })

    it('Search the create IVR successfully.\nAssert the IVR name that is present and correct.', async () => {
        await IVRPage.searchIVR(global.IVRName) 
        await AssertionsIVR.assertCreatedIvrName()
        await AssertionsIVR.assertCreatedIvrDesc()
        await AssertionsIVR.assertCreatedIvrAttributes()
        await IVRPage.clearSearch()
        await browser.pause(1000); 
    })

    it('Edit IVR successfully.\nA pop-up message for update should be displayed after creating the IVR.', async () => {
        await IVRPage.editIVR(global.IVRName, global.editIVRName, TestConfig.descEdit) 
        //await AssertionsIVR.assertUpdateMessage(TestConfig.updateMsgI)
        await AssertionsIVR.assertSuccessMessage("general.success.updated")
        await IVRPage.closeNotification()
        await IVRPage.clearSearch()
        await browser.pause(1000);
    })

    it('Search the edited IVR successfully.\nAssert the IVR name is present and correct.', async () => {
        await IVRPage.searchIVR(global.editIVRName) 
        await AssertionsIVR.assertEditedIvrName()
        await AssertionsIVR.assertEditedIvrDesc()
        await IVRPage.clearSearch()
        await browser.pause(1000);
    })

    it('Copy IVR successfully.\nA pop-up message for update should be displayed after copying the IVR.', async () => {
        await IVRPage.copyIVR(global.editIVRName, global.copyIVRName) 
        //await AssertionsIVR.assertSuccessMessage(TestConfig.successMsgI)
        await AssertionsIVR.assertSuccessMessage("general.success.created")
        await IVRPage.closeNotification()
        await IVRPage.clearSearch()
        await browser.pause(1000);
    })

    it('Search the copied IVR successfully.\nAssert the Queues name and number are present and correct.', async () => {
        await IVRPage.searchIVR(global.copyIVRName) 
        await AssertionsIVR.assertCopiedIvrName()
        await IVRPage.clearSearch()
        await browser.pause(1000);
    })

    it('Delete IVR successfully.\nA pop-up message for update should be displayed after deleting the IVRs.', async () => {
        await IVRPage.deleteIVR(global.editIVRName) 
        //await AssertionsIVR.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsIVR.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsIVR.assertEmptyTableIcon()
        //await AssertionsIVR.assertDeleteMessage(TestConfig.deleteMsgI)
        await AssertionsIVR.assertSuccessMessage("general.success.deleted")
        await IVRPage.closeNotification()
        await IVRPage.deleteIVR(global.copyIVRName) 
        //await AssertionsIVR.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsIVR.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsIVR.assertEmptyTableIcon()
        //await AssertionsIVR.assertDeleteMessage(TestConfig.deleteMsgI)
        await AssertionsIVR.assertSuccessMessage("general.success.deleted")
    })
})
