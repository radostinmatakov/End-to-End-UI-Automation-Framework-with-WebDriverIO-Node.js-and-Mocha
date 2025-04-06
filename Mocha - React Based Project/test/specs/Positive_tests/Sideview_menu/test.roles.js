const LoginPageAdmin = require('../../../pageobjects_main/login.page.admin.js')
const RolesPage = require('../../../pageobjects_main/pageobjects/Sideview menu/Users and Permissions/roles.page.js')
const UsersPage = require('../../../pageobjects_main/pageobjects/Sideview menu/Users and Permissions/users.page.js')
const ExtPage = require('../../../pageobjects_main/pageobjects/Sideview menu/Users and Permissions/ext.page')
const AssertionsRoles = require('../../../helpers/assertions.roles.js')
const AssertionsUsers = require('../../../helpers/assertions.users.js')
const AssertionsExt = require('../../../helpers/assertions.ext.js')
const TestConfig = require('../../../data/TestConfig.js');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Create, Edit, Copy, Disable/Enable Permissions, Delete Roles', () => {
    before(async () => {
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await browser.pause(1000)
        try {
            await ExtPage.searchExt(TestConfig.roleExtNumber);
            const hasResult = await ExtPage.isExtPresent();
            if (hasResult) {
                await ExtPage.deleteExtBefore(TestConfig.roleExtNumber);
                await AssertionsExt.assertDeleteMessage(TestConfig.deleteMsgE);
                await ExtPage.closeNotification();
                await ExtPage.clearSearch()
            } else {
                await ExtPage.clearSearch()
                console.log(`ℹ️ Extension ${TestConfig.roleExtNumber} not found — skipping delete.`);
            }
        } catch (error) {
            console.warn(`⚠️ Error while trying to delete extension: ${error.message}`);
        }
        await RolesPage.open()
        await RolesPage.waitForPageLoad()
        try {
            await RolesPage.searchCreatedRole(TestConfig.roleNameBefore);
            const hasResult = await RolesPage.isRolePresent();
            if (hasResult) {
                await RolesPage.deleteRoleBefore(TestConfig.roleNameBefore, TestConfig.preDeleteMsg) 
                await AssertionsRoles.assertUpdateMessage(TestConfig.deleteMsgR)
                await RolesPage.closeNotification();
                await RolesPage.clearSearch()
            } else {
                await RolesPage.clearSearch()
                console.log(`ℹ️ Extension ${TestConfig.roleNameBefore} not found — skipping delete.`);
            }
        } catch (error) {
            console.warn(`⚠️ Error while trying to delete role: ${error.message}`);
        }
        try {
            await RolesPage.searchCreatedRole(TestConfig.roleName);
            const hasResult = await RolesPage.isRolePresent();
            if (hasResult) {
                await RolesPage.deleteRoleBefore(TestConfig.roleName, TestConfig.preDeleteMsg) 
                await AssertionsRoles.assertUpdateMessage(TestConfig.deleteMsgR)
                await RolesPage.closeNotification();
                await RolesPage.clearSearch()
            } else {
                await RolesPage.clearSearch()
                console.log(`ℹ️ Extension ${TestConfig.roleName} not found — skipping delete.`);
            }
        } catch (error) {
            console.warn(`⚠️ Error while trying to delete role: ${error.message}`);
        }
        const expectedTextsMan = [
            'General',
            'Monitor',
            'Settings',
            'Queues',
            'Reports',
            'Dial pad',
            'Dashboard',
            'Messaging',
            'Contacts'
        ];
        await RolesPage.open();
        await RolesPage.waitForPageLoad();
        await RolesPage.createRoleForUser(TestConfig.roleNameBefore, expectedTextsMan)
        await AssertionsRoles.assertSuccessMessage(TestConfig.successMsgR)
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await UsersPage.createUserBefore(global.usersNameRoles, global.usersEmailRoles, TestConfig.userPhone, TestConfig.roleExtName, TestConfig.roleExtNumber, TestConfig.successMsgE)
    });

    it('Create Admin Role successfully.\nA pop-up message for update should be displayed after creating the Role.', async () => {
        const expectedTextsAdmin = [
            'General',
            'Monitor',
            'Settings',
            'Queues',
            'Reports',
            'Groups',
            'Dial pad',
            'Dashboard',
            'Messaging',
            'Contacts'
        ];
        await RolesPage.open()
        await RolesPage.waitForPageLoad()
        await RolesPage.createRole_Admin(TestConfig.roleName, expectedTextsAdmin) 
        await AssertionsRoles.assertSuccessMessage(TestConfig.successMsgR)
        await RolesPage.closeNotification()
        await browser.pause(1000)
    })

    it('Search the created Admin Role successfully.\nAssert the Role name and level are present and correct.', async () => {
        await RolesPage.searchCreatedRole(TestConfig.roleName) 
        await AssertionsRoles.assertCreatedRoleNameLinkText(TestConfig.roleName)
        await AssertionsRoles.assertCreatedRoleLevelLinkText(TestConfig.roleLevelAdmin)
        await RolesPage.clearSearch() 
    })
    
    it('Edit Role to Manager successfully.\nA pop-up message for update should be displayed after editing the Role.', async () => {
        const expectedTextsMan = [
            'General',
            'Monitor',
            'Settings',
            'Queues',
            'Reports',
            'Dial pad',
            'Dashboard',
            'Messaging',
            'Contacts'
        ];
        await RolesPage.editRole_Manager(TestConfig.roleName, TestConfig.roleNameEdit, expectedTextsMan) 
        await AssertionsRoles.assertUpdateMessage(TestConfig.updateMsgR)
        await RolesPage.closeNotification()
        await browser.pause(1000)
        await RolesPage.clearSearch() 
        await browser.pause(1000)
    })

    it('Search the edited Role successfully.\nAssert the the Role name and level is present and correct.', async () => {
        await RolesPage.searchEditedRole(TestConfig.roleNameEdit) 
        await AssertionsRoles.assertCreatedRoleNameLinkText(TestConfig.roleNameEdit)
        await AssertionsRoles.assertCreatedRoleLevelLinkText(TestConfig.roleLevelManager)
        await RolesPage.clearSearch() 
    })

    it('Edit Role to Agent successfully.\nA pop-up message for update should be displayed after editing the Role.', async () => {
        const expectedTextsAgent = [
            'General',
            'My Score',
            'Dial pad',
            'Messaging',
            'Contacts'
        ];
        await RolesPage.editRole_Agent(TestConfig.roleNameEdit, expectedTextsAgent) 
        await AssertionsRoles.assertUpdateMessage(TestConfig.updateMsgR)
        await RolesPage.closeNotification()
        await RolesPage.clearSearch() 
        await browser.pause(1000)
    })

    it('Search the edited Role successfully.\nAssert that the Role level is present and correct.', async () => {
        await RolesPage.searchEditedRole(TestConfig.roleNameEdit) 
        await AssertionsRoles.assertCreatedRoleLevelLinkText(TestConfig.roleLevelAgent)
        await RolesPage.clearSearch() 
    })

    it('Copy Role(Agent) successfully.\nA pop-up message for update should be displayed after coping the Role.', async () => {
        const expectedTextsAgent = [
            'General',
            'My Score',
            'Dial pad',
            'Messaging',
            'Contacts'
        ];
        await RolesPage.copyRole(TestConfig.roleNameEdit, TestConfig.rolenameCopy, expectedTextsAgent) 
        await AssertionsRoles.assertUpdateMessage(TestConfig.successMsgR)
        await RolesPage.closeNotification()
        await RolesPage.clearSearch() 
        await browser.pause(1000)
    })

    it('Search the Copied Role successfully.\nAssert that the Role level is present and correct.', async () => {
        await RolesPage.searchCopiedRole(TestConfig.rolenameCopy) 
        await AssertionsRoles.assertCreatedRoleLevelLinkText(TestConfig.roleLevelAgent)
        await RolesPage.clearSearch() 
    })

    xit('Dissable permissions of a Role successfully.\nAssert the permissions are with the correct output in the quick view.', async () => {
        await RolesPage.disablePermissions(TestConfig.roleNameEdit) 
        await AssertionsRoles.assertUpdateMessage(TestConfig.updateMsgR)
        await RolesPage.searchDisRole(TestConfig.roleNameEdit) 
        await AssertionsRoles.assertDissabledPermissions()
        await RolesPage.clearSearch() 
    })

    xit('Enable permissions of a Role successfully.\nAssert the permissions are with the correct output in the quick view.', async () => { 
        await RolesPage.enablePermissions(TestConfig.roleNameEdit) 
        await AssertionsRoles.assertUpdateMessage(TestConfig.updateMsgR)
        await RolesPage.searchEnabRole(TestConfig.roleNameEdit) 
        await AssertionsRoles.assertEnabledPermissions()
        await RolesPage.clearSearch() 
        await RolesPage.closeSideviewMenu()
    })

    it('Delete Role/s successfully.\nA pop-up message for update should be displayed after deleting the Role.', async () => {
        await RolesPage.deleteRole(TestConfig.rolenameCopy, TestConfig.preDeleteMsg) 
        await AssertionsRoles.assertUpdateMessage(TestConfig.deleteMsgR)
        await AssertionsRoles.assertEmptyTable(TestConfig.emptyTable)
        await RolesPage.clearSearch() 
        await RolesPage.deleteRole(TestConfig.roleNameEdit, TestConfig.preDeleteMsg) 
        await AssertionsRoles.assertUpdateMessage(TestConfig.deleteMsgR)
        //await AssertionsRoles.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsRoles.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsRoles.assertEmptyTableIcon()
        await RolesPage.clearSearch() 
    })

    it('Delete Role/s successfully when it is assign to a User.\nA pop-up message for update should be displayed after deleting the Role.', async () => {
        await RolesPage.open()
        await RolesPage.waitForPageLoad()
        await browser.pause(1000)
        await RolesPage.deleteRoleWhenAssigned(TestConfig.roleNameBefore, TestConfig.assignMsg) 
        await AssertionsRoles.assertUpdateMessage(TestConfig.deleteMsgR)
        //await AssertionsRoles.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsRoles.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsRoles.assertEmptyTableIcon()
    })
    after(async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await browser.pause(1000)
        await UsersPage.deleteUser(global.usersNameRoles)
        await AssertionsUsers.assertDeleteMessage(TestConfig.deleteMsgU)
        await AssertionsUsers.assertEmptyTable(TestConfig.emptyTable)
        await AssertionsUsers.assertEmptyTableIcon()
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await ExtPage.deleteExt(TestConfig.roleExtName) 
        await AssertionsExt.assertDeleteMessage(TestConfig.deleteMsgE)
        await ExtPage.closeNotification()
        //await AssertionsExt.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsExt.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsExt.assertEmptyTableIcon()
    });
})