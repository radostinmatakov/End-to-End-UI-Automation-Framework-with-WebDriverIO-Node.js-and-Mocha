const LoginPageAdmin = require('../../../pageobjects_main/login.page.admin.js')
const StatusPage = require('../../../pageobjects_main/pageobjects/Sideview menu/General/statuses.page')
const AssertionsStatus = require('../../../helpers/assertions.statuses.js')
const TestConfig = require('../../../data/TestConfig.js');

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
        await StatusPage.createStatus(global.statusName, TestConfig.searchIcon) 
        await AssertionsStatus.assertSuccessMessage(TestConfig.successMsgS)
        await StatusPage.closeNotification()
    })

    it('Search the created Status successfully.\nAssert all text atributes are present and correct.', async () => {
        await StatusPage.searchStatus(global.statusName) 
        await AssertionsStatus.assertCreatedStatusTextAttributes(TestConfig.activeStatus, TestConfig.permisions)
        await StatusPage.clearSearch()
    })

    it('Assert that the created status is present in the header drop-down.', async () => {
        await StatusPage.openHeader()
        await AssertionsStatus.assertCreatedStatusTextInHeader()
    })

    it('Edit Status successfully.\nA pop-up message for update should be displayed after editing the Status.', async () => {
        await StatusPage.editStatus(global.statusName, global.editStatusName, TestConfig.searchIconEdit)
        await AssertionsStatus.assertUpdateMessage(TestConfig.updateMsgS)
        await StatusPage.closeNotification()
        await StatusPage.clearSearch()
    })

    it('Search the edited Status successfully.\nAssert all text atributes are present and correct.', async () => {
        await StatusPage.searchStatus(global.editStatusName) 
        await AssertionsStatus.assertEditedStatusTextAttributes(TestConfig.activeStatus, TestConfig.permisionsEdit)
        await StatusPage.clearSearch()
    })

    it('Delete Status successfully.\A pop-up message for update should be displayed after deleting the Status.', async () => {
        await StatusPage.deleteStatus(global.editStatusName) 
        await AssertionsStatus.assertDeleteMessage(TestConfig.deleteMsgS)
        await AssertionsStatus.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsStatus.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsStatus.assertEmptyTableIcon()
        await StatusPage.closeNotification()
    })

    it('Assert that the deleted status is not present in the header drop-down.', async () => {
        await StatusPage.openHeader()
        await AssertionsStatus.assertDeletedStatusTextIsNotInHeader()
    })
})