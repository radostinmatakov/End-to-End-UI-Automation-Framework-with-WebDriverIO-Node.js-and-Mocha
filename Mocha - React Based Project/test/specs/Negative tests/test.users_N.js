const LoginPageAdmin = require('../../pageobjects_main/login.page.admin.js')
const UsersPageN = require('../../pageobjects_main/pageobjects_N/users.page_N')
const AssertionsUsersN = require('../../helpers_N/assertions.users_N')
const TestConfig = require('../../data/TestConfig');
const TestConfig_N = require('../../data/TestConfig_N');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Negative Scenarios for Create, Edit Users', () => {
    before(async () => {
        await UsersPageN.open()
        await UsersPageN.waitForPageLoad()
        await UsersPageN.createUserBefore(global.usersNameWeb, global.usersEmailWeb, TestConfig_N.userPhone)
    });

    it('Verify that the user cannot create a User with missing mandatory fields.', async () => {
        await UsersPageN.open()
        await UsersPageN.waitForPageLoad()
        await UsersPageN.createUserWithMissingFields()
    })

    it('Verify that the user cannot create a User with already existing Name and Email.', async () => {
        await UsersPageN.open()
        await UsersPageN.waitForPageLoad()
        await UsersPageN.createUserWithExistingNameAndEmail(global.usersNameWeb, global.usersEmailWeb, TestConfig_N.userPhone) 
        await AssertionsUsersN.assertErrorMessage(TestConfig_N.errorMsgU) 
    })

    after(async () => {
        await UsersPageN.open()
        await UsersPageN.waitForPageLoad()
        await UsersPageN.deleteUser(global.usersNameWeb)
    });
})