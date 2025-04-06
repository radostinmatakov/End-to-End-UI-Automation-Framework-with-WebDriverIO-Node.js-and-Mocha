const LoginPageAdmin = require('../../../pageobjects_main/login.page.admin.js')
const UsersPage = require('../../../pageobjects_main/pageobjects/Sideview menu/Users and Permissions/users.page.js')
const ExtPage = require('../../../pageobjects_main/pageobjects/Sideview menu/Users and Permissions/ext.page')
const AssertionsUsers = require('../../../helpers/assertions.users.js')
const AssertionsExt = require('../../../helpers/assertions.ext.js')
const TestConfig = require('../../../data/TestConfig.js');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Create, Edit, Reset password and Delete Users', () => {
    it('Create Admin User - WEB successfully.\nA pop-up message for update should be displayed after creating the User.', async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await UsersPage.createUserAdminWEB(global.usersNameWeb, global.usersEmailWeb, TestConfig.userPhone, TestConfig.userExtWebName, TestConfig.userExtWebNumber, TestConfig.successMsgE)
        await AssertionsUsers.assertSuccessMessage(TestConfig.successMsgU)
        await UsersPage.closeNotification()
    })

    it('Search the created Admin User - WEB successfully.\nAssert all text atributes are present and correct.', async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await browser.pause(2000)
        await UsersPage.searchUser(global.usersNameWeb) 
        await browser.pause(3000)
        await AssertionsUsers.assertCreatedWebUserAttributesText(TestConfig.userExtWebNumber)
        await UsersPage.clearSearch()
    })

    it('Create Manager User - SIP successfully.\nA pop-up message for update should be displayed after creating the User.', async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await UsersPage.createUserSIP(global.usersNameSip, global.usersEmailSip, TestConfig.userPhone, TestConfig.userExtSipName, TestConfig.userExtSipNumber, TestConfig.successMsgE)
        await AssertionsUsers.assertSuccessMessage(TestConfig.successMsgU)
        await UsersPage.closeNotification()
    })

    it('Search the created Manager User - SIP successfully.\nAssert all text atributes are present and correct.', async () => {
        await UsersPage.searchUser(global.usersNameSip) 
        await browser.pause(3000)
        await AssertionsUsers.assertCreatedSipUserAttributesText(TestConfig.userExtSipNumber)
        await UsersPage.clearSearch()
    })

    it('Edit User successfully.\nA pop-up message for update should be displayed after editing the User.', async () => {
        await UsersPage.waitForPageLoad()
        await UsersPage.editUserWeb(global.usersNameWeb, global.editUsersNameWeb, global.usersPass)
        await AssertionsUsers.assertUpdateMessage(TestConfig.updateMsgU)
        await UsersPage.closeNotification()
        await UsersPage.clearSearch()
    })

    it('Search the edited User successfully.\nAssert all text atributes are present and correct.', async () => {
        await UsersPage.waitForPageLoad()
        await browser.pause(2000)
        await UsersPage.searchUser(global.editUsersNameWeb) 
        await browser.pause(3000)
        await AssertionsUsers.assertEditedWebUserAttributesText(TestConfig.statusInactive)
        await UsersPage.clearSearch()
        
    })
    
    it('Reset password of a User successfully.\nA pop-up message for update should be displayed after resetting the pass.', async () => {
        await UsersPage.resetPass(global.editUsersNameWeb)
        await AssertionsUsers.assertResetMessage(TestConfig.resetPassMsgU)
        await UsersPage.closeNotification()
        await UsersPage.clearSearch()
    })

    it('Delete User successfully.\nA pop-up message for update should be displayed after deleting the User.', async () => {
        await UsersPage.waitForPageLoad()
        await UsersPage.deleteUser(global.usersNameSip)
        await AssertionsUsers.assertDeleteMessage(TestConfig.deleteMsgU)
        await AssertionsUsers.assertEmptyTable(TestConfig.emptyTable)
        await AssertionsUsers.assertEmptyTableIcon()
        await UsersPage.closeNotification()
        await UsersPage.deleteUser(global.editUsersNameWeb)
        await AssertionsUsers.assertDeleteMessage(TestConfig.deleteMsgU)
        await AssertionsUsers.assertEmptyTable(TestConfig.emptyTable)
        await AssertionsUsers.assertEmptyTableIcon()
    })

    after(async () => {
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await ExtPage.deleteExt(TestConfig.userExtWebName) 
        await AssertionsExt.assertDeleteMessage(TestConfig.deleteMsgE)
        await ExtPage.closeNotification()
        //await AssertionsExt.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsExt.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsExt.assertEmptyTableIcon()
        await ExtPage.deleteExt(TestConfig.userExtSipName) 
        await AssertionsExt.assertDeleteMessage(TestConfig.deleteMsgE)
        await ExtPage.closeNotification()
        //await AssertionsExt.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsExt.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsExt.assertEmptyTableIcon()
    });
})