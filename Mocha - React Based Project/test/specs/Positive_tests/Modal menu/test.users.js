const LoginPageAdmin = require('../../../../pageobjects_main/login.page.admin.js')
const UsersPage = require('../../pageobjects_main/pageobjects/users.page')
const AssertionsUsers = require('../../../../helpers/assertions.users.js')
const TestConfig = require('../../../../data/TestConfig.js');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Create, Edit, Reset password and Delete Users', () => {
    xit('Create Admin User - WEB successfully.\nA pop-up message for update should be displayed after creating the User.', async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await UsersPage.createUserAdminWEB(global.usersNameWeb,global.usersEmailWeb,TestConfig.userPhone)
        await AssertionsUsers.assertSuccessMessage(TestConfig.successMsgU)
    })

    xit('Search the created Admin User - WEB successfully.\nAssert all text atributes are present and correct.', async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await UsersPage.searchUser(global.usersNameWeb) 
        await AssertionsUsers.assertCreatedWebUserAttributesText(TestConfig.extWeb, TestConfig.extTypeWeb, TestConfig.statusActive, TestConfig.groupsWeb, TestConfig.userPhone, TestConfig.userLevelAdmin, TestConfig.userRoleAdmin)
        await UsersPage.openQeickView()
        await AssertionsUsers.assertCreateWebQucikViewAtributes()
    })

    it('Create Manager User - SIP successfully.\nA pop-up message for update should be displayed after creating the User.', async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await UsersPage.createUserSIP(global.usersNameSip, global.usersEmailSip, TestConfig.userPhone)
        await AssertionsUsers.assertSuccessMessage(TestConfig.successMsgU)
    })

    it('Search the created Manager User - SIP successfully.\nAssert all text atributes are present and correct.', async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await UsersPage.searchUser(global.usersNameSip) 
        await AssertionsUsers.assertCreatedSipUserAttributesText(TestConfig.extSip, TestConfig.extTypeSip, TestConfig.statusActive, TestConfig.groupsSip, TestConfig.userPhone, TestConfig.userLevelManager, TestConfig.userRoleManager, TestConfig.forceLogin)
        await UsersPage.openQeickView()
        await AssertionsUsers.assertCreateSipQucikViewAtributes()
    })

    xit('Edit User successfully.\nA pop-up message for update should be displayed after editing the User.', async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await UsersPage.editUserWeb(global.usersNameWeb, global.editUsersNameWeb, global.usersPass)
        await AssertionsUsers.assertUpdateMessage(TestConfig.updateMsgU)
    })

    xit('Search the edited User successfully.\nAssert all text atributes are present and correct.', async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await UsersPage.searchUser(global.editUsersNameWeb) 
        await AssertionsUsers.assertEditedWebUserAttributesText(TestConfig.statusInactive)
        await UsersPage.openQeickView()
        await AssertionsUsers.assertEditedWebQucikViewAtributes()
    })

    xit('Edit User from Quick View successfully.\nA pop-up message for update should be displayed after editing the User.', async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await UsersPage.editUserSip(global.usersNameSip, global.editUsersNameSip, global.usersPass)
        await AssertionsUsers.assertUpdateMessage(TestConfig.updateMsgU)
    })

    xit('Reset password of a User successfully.\nA pop-up message for update should be displayed after resetting the pass.', async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await UsersPage.resetPass(global.editUsersNameSip)
        await AssertionsUsers.assertResetMessage(TestConfig.resetPassMsgU)
    })

    xit('Delete User successfully.\nA pop-up message for update should be displayed after deleting the User.', async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await UsersPage.deleteUser(global.editUsersNameSip)
        await AssertionsUsers.assertDeleteMessage(TestConfig.deleteMsgU)
        await AssertionsUsers.assertEmptyTable(TestConfig.emptyTable)
        await UsersPage.deleteUser(global.editUsersNameWeb)
        await AssertionsUsers.assertDeleteMessage(TestConfig.deleteMsgU)
        await AssertionsUsers.assertEmptyTable(TestConfig.emptyTable)
    })
})