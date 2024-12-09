const LoginPageAdmin = require('../../pageobjects_main/login.page.admin.js')
const StatusPage = require('../../pageobjects_main/pageobjects/statuses.page')
const AssertionsStatus = require('../../helpers/assertions.statuses')
const TestConfig = require('../../data/TestConfig');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Create, Edit and Delete Custom Status', () => {
    it('Create Custom Status successfully.\nA pop-up message for update should be displayed after creating the Status.', async () => {
        await StatusPage.open()
        await StatusPage.waitForPageLoad()
        await StatusPage.createStatus(global.statusName) 
        await AssertionsStatus.assertSuccessMessage(TestConfig.successMsgS)
    })

    it('Search the created Status successfully.\nAssert all text atributes are present and correct.', async () => {
        await StatusPage.open()
        await StatusPage.waitForPageLoad()
        await StatusPage.searchStatus(global.statusName) 
        await AssertionsStatus.assertCreatedStatusTextAttributes(TestConfig.activeStatus, TestConfig.permisions)
        await StatusPage.openQeickView()
        await AssertionsStatus.assertCreateStatusQucikViewAtributes()
    })

    it('Edit Status form Quick View successfully.\nA pop-up message for update should be displayed after editing the Status.', async () => {
        await StatusPage.editStatusQuickView(global.editStatusName)
        await AssertionsStatus.assertUpdateMessage(TestConfig.updateMsgS)
    })

    it('Search the edited User successfully.\nAssert all text atributes are present and correct.', async () => {
        await StatusPage.open()
        await StatusPage.waitForPageLoad()
        await StatusPage.searchStatus(global.editStatusName) 
        await AssertionsStatus.assertEditedStatusTextAttributes(TestConfig.inactiveStatus, TestConfig.permisionsEdit)
        await AssertionsStatus.assertTableRowIsDisabled()
        await StatusPage.openQeickViewInactive()
        await AssertionsStatus.assertEditedStatusQucikViewAtributes()
    })

    it('Edit Status form Edit icon successfully.\nA pop-up message for update should be displayed after editing the Status.', async () => {
        await StatusPage.editStatus(global.editStatusName)
        await AssertionsStatus.assertUpdateMessage(TestConfig.updateMsgS)
    })

    it('Search the edited User successfully.\nAssert all text atributes are present and correct.', async () => {
        await StatusPage.open()
        await StatusPage.waitForPageLoad()
        await StatusPage.searchStatus(global.editStatusName) 
        await AssertionsStatus.assertEditedStatusTextAttributes(TestConfig.activeStatus, TestConfig.permisionsEdit)
        await AssertionsStatus.assertTableRowIsEnabled()
    })

    it('Delete Status successfully.\A pop-up message for update should be displayed after deleting the Status.', async () => {
        await StatusPage.deleteStatus() 
        await AssertionsStatus.assertDeleteMessage(TestConfig.deleteMsgS)
        await AssertionsStatus.assertEmptyTable(TestConfig.emptyTable)
    })
})