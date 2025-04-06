const LoginPageAdmin = require('../../../../pageobjects_main/login.page.admin.js')
const RolesPage = require('../../pageobjects_main/pageobjects/roles.page')
const UsersPage = require('../../pageobjects_main/pageobjects/users.page')
const AssertionsRoles = require('../../../../helpers/assertions.roles.js')
const AssertionsUsers = require('../../../../helpers/assertions.users.js')
const TestConfig = require('../../../../data/TestConfig.js');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Create, Edit, Copy, Disable/Enable Permissions, Delete Roles', () => {
    before(async () => {
        const expectedTextsMan = [
            'General',
            'Monitor',
            'Settings',
            'Queues',
            'Reports',
            //'My Score',
            'Dial pad',
            'Dashboard',
            'Messaging'
        ];
        // Log global variables to check special characters
        console.log("User Name:", global.usersNameRoles);
        console.log("User Email:", global.usersEmailRoles);
        await RolesPage.open();
        await RolesPage.waitForPageLoad();
        await RolesPage.createRoleForUser(TestConfig.roleNameBefore, expectedTextsMan)
        await AssertionsRoles.assertSuccessMessage(TestConfig.successMsgR)
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await UsersPage.createUserBefore(global.usersNameRoles,global.usersEmailRoles,TestConfig.userPhone)
    });

    it('Create Admin Role successfully.\nA pop-up message for update should be displayed after creating the Role.', async () => {
        const expectedTextsAdmin = [
            'General',
            'Monitor',
            'Settings',
            'Queues',
            'Reports',
            'Groups',
            'My Score',
            'Dial pad',
            'Dashboard',
            'Messaging'
        ];
        await RolesPage.open()
        await RolesPage.waitForPageLoad()
        await RolesPage.createRole_Admin(TestConfig.roleName, expectedTextsAdmin) 
        await AssertionsRoles.assertSuccessMessage(TestConfig.successMsgR)
    })

    it('Search the created Admin Role successfully.\nAssert the Role name and level are present and correct.', async () => {
        await RolesPage.open()
        await RolesPage.waitForPageLoad()
        await RolesPage.searchCreatedRole(TestConfig.roleName) 
        await AssertionsRoles.assertCreatedRoleNameLinkText(TestConfig.roleName)
        await AssertionsRoles.assertCreatedRoleLevelLinkText(TestConfig.roleLevelAdmin)
        await RolesPage.openQeickView()
        await AssertionsRoles.assertCreateRoleQucikViewAtributes()
    })
    
    it('Edit Role to Manager successfully.\nA pop-up message for update should be displayed after editing the Role.', async () => {
        const expectedTextsMan = [
            'General',
            'Monitor',
            'Settings',
            'Queues',
            'Reports',
            'My Score',
            'Dial pad',
            'Dashboard',
            'Messaging'
        ];
        await RolesPage.open()
        await RolesPage.waitForPageLoad()
        await RolesPage.editRole_Manager(TestConfig.roleName, TestConfig.roleNameEdit, expectedTextsMan) 
        await AssertionsRoles.assertUpdateMessage(TestConfig.updateMsgR)
    })

    it('Search the edited Role successfully.\nAssert the the Role name and level is present and correct.', async () => {
        await RolesPage.open()
        await RolesPage.waitForPageLoad()
        await RolesPage.searchEditedRole(TestConfig.roleNameEdit) 
        await AssertionsRoles.assertCreatedRoleNameLinkText(TestConfig.roleNameEdit)
        await AssertionsRoles.assertCreatedRoleLevelLinkText(TestConfig.roleLevelManager)
        await RolesPage.openQeickView()
        await AssertionsRoles.assertCreateRoleQucikViewAtributes()
    })

    it('Edit Role to Agent successfully.\nA pop-up message for update should be displayed after editing the Role.', async () => {
        const expectedTextsAgent = [
            'General',
            'My Score',
            'Dial pad',
            'Messaging'
        ];
        await RolesPage.open()
        await RolesPage.waitForPageLoad()
        await RolesPage.editRole_Agent(TestConfig.roleNameEdit, expectedTextsAgent) 
        await AssertionsRoles.assertUpdateMessage(TestConfig.updateMsgR)
    })

    it('Search the edited Role successfully.\nAssert that the Role level is present and correct.', async () => {
        await RolesPage.open()
        await RolesPage.waitForPageLoad()
        await RolesPage.searchEditedRole(TestConfig.roleNameEdit) 
        await AssertionsRoles.assertCreatedRoleLevelLinkText(TestConfig.roleLevelAgent)
        await RolesPage.openQeickView()
        await AssertionsRoles.assertCreateRoleQucikViewAtributes()
    })

    it('Copy Role(Agent) successfully.\nA pop-up message for update should be displayed after coping the Role.', async () => {
        const expectedTextsAgent = [
            'General',
            'My Score',
            'Dial pad'
        ];
        await RolesPage.open()
        await RolesPage.waitForPageLoad()
        await RolesPage.copyRole(TestConfig.roleNameEdit, TestConfig.rolenameCopy, expectedTextsAgent) 
        await AssertionsRoles.assertUpdateMessage(TestConfig.updateMsgR)
    })

    it('Search the Copied Role successfully.\nAssert that the Role level is present and correct.', async () => {
        await RolesPage.open()
        await RolesPage.waitForPageLoad()
        await RolesPage.searchCopiedRole(TestConfig.rolenameCopy) 
        await AssertionsRoles.assertCreatedRoleLevelLinkText(TestConfig.roleLevelAgent)
        await RolesPage.openQeickView()
        await AssertionsRoles.assertCreateRoleQucikViewAtributes()
    })

    it('Dissable permissions of a Role successfully.\nAssert the permissions are with the correct output in the quick view.', async () => {
        await RolesPage.open()
        await RolesPage.waitForPageLoad()
        await RolesPage.disablePermissions(TestConfig.roleNameEdit) 
        await AssertionsRoles.assertUpdateMessage(TestConfig.updateMsgR)
        await RolesPage.searchDisRole(TestConfig.roleNameEdit) 
        await AssertionsRoles.assertDissabledPermissions()
    })

    it('Enable permissions of a Role successfully.\nAssert the permissions are with the correct output in the quick view.', async () => { 
        await RolesPage.enablePermissions() 
        await AssertionsRoles.assertUpdateMessage(TestConfig.updateMsgR)
        await RolesPage.searchDisRole(TestConfig.roleNameEdit) 
        await AssertionsRoles.assertEnabledPermissions()
    })

    it('Delete Role/s successfully.\nA pop-up message for update should be displayed after deleting the Role.', async () => {
        await RolesPage.open()
        await RolesPage.waitForPageLoad()
        await RolesPage.deleteRole(TestConfig.rolenameCopy, TestConfig.preDeleteMsg) 
        await AssertionsRoles.assertUpdateMessage(TestConfig.deleteMsgR)
        await AssertionsRoles.assertEmptyTable(TestConfig.emptyTable)
        await RolesPage.deleteRole(TestConfig.roleNameEdit, TestConfig.preDeleteMsg) 
        await AssertionsRoles.assertUpdateMessage(TestConfig.deleteMsgR)
        await AssertionsRoles.assertEmptyTable(TestConfig.emptyTable)
    })

    it('Delete Role/s successfully when it is assign to a User.\nA pop-up message for update should be displayed after deleting the Role.', async () => {
        await RolesPage.open()
        await RolesPage.waitForPageLoad()
        await RolesPage.deleteRoleWhenAssigned(TestConfig.roleNameBefore, TestConfig.assignMsg) 
        await AssertionsRoles.assertUpdateMessage(TestConfig.deleteMsgR)
        await AssertionsRoles.assertEmptyTable(TestConfig.emptyTable)
    })

    after(async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await UsersPage.deleteUser(global.usersNameRoles)
        await AssertionsUsers.assertDeleteMessage(TestConfig.deleteMsgU)
        await AssertionsUsers.assertEmptyTable(TestConfig.emptyTable)
    });
})