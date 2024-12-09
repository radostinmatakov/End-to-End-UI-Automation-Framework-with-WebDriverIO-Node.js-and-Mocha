const LoginPageAdmin = require('../../pageobjects_main/login.page.admin.js')
const RolesPageN = require('../../pageobjects_main/pageobjects_N/roles.page_N.js')
const RolesPage = require('../../pageobjects_main/pageobjects/roles.page.js')
const UsersPage = require('../../pageobjects_main/pageobjects/users.page')
const AssertionsRoles = require('../../helpers/assertions.roles')
const AssertionsUsers = require('../../helpers/assertions.users')
const AssertionsRolesN = require('../../helpers_N/assertions.roles_N')
const TestConfig = require('../../data/TestConfig.js');
const TestConfig_N = require('../../data/TestConfig_N');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Negative Scenarios for Create, Edit Roles', () => {
    before(async () => {
        const expectedTextsMan = [
            'General',
            'Monitor',
            'Settings',
            'Queues',
            'Reports',
            'My Score',
            'Dial pad',
            'Dashboard'
        ];
        console.log("User Name:", global.usersNameWeb);
        console.log("User Email:", global.usersEmailWeb);
        await RolesPage.open();
        await RolesPage.waitForPageLoad();
        await RolesPage.createRoleForUser(TestConfig.roleNameBefore, expectedTextsMan)
        await AssertionsRoles.assertSuccessMessage(TestConfig.succsessMsgR)
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await UsersPage.createUserBefore(global.usersNameWeb,global.usersEmailWeb,TestConfig.userPhone)
    });

    it('Verify that the user cannot create a Role with missing mandatory fields.', async () => {
        await RolesPageN.open()
        await RolesPageN.waitForPageLoad()
        await RolesPageN.createRoleWithEmptyFields() 
    })

    it('Verify that the user cannot create a Role with already existing Name.', async () => {
        await RolesPageN.open()
        await RolesPageN.waitForPageLoad()
        await RolesPageN.createRoleWithExistingName(TestConfig.roleNameBefore) 
        await AssertionsRolesN.assertErrorMessage(TestConfig_N.errorMsgR)
    })

    it('Verify that the user cannot delete an asigned Role to a User.', async () => {
        await RolesPageN.open()
        await RolesPageN.waitForPageLoad()
        await RolesPageN.deleteRoleWhenAssigned_N(TestConfig.roleNameBefore) 
    })

    after(async () => {
        await RolesPageN.open()
        await RolesPageN.waitForPageLoad()
        await RolesPageN.deleteRole_N(TestConfig.roleNameBefore, TestConfig.assignMsg) 
        await AssertionsRoles.assertUpdateMessage(TestConfig.deleteMsgR)
        await AssertionsRoles.assertEmptyTable(TestConfig.emptyTable)
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await UsersPage.deleteUser(global.usersNameWeb)
        await AssertionsUsers.assertDeleteMessage(TestConfig.deleteMsgU)
        await AssertionsUsers.assertEmptyTable(TestConfig.emptyTable)
    });
})