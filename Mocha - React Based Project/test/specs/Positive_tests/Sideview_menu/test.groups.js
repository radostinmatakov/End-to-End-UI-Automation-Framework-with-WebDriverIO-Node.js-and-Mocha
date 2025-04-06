const LoginPageAdmin = require('../../../pageobjects_main/login.page.admin.js')
const GroupsPage = require('../../../pageobjects_main/pageobjects/Sideview menu/Users and Permissions/groups.page')
const AssertionsGroups = require('../../../helpers/assertions.groups.js')
const TestConfig = require('../../../data/TestConfig.js');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Create, Edit and Delete Groups', () => {
    it('Create Group successfully.\nA pop-up message for update should be displayed after creating the Groups.', async () => {
        await GroupsPage.open()
        await GroupsPage.waitForPageLoad()
        await GroupsPage.createGroup(global.groupName, TestConfig.descName, TestConfig.ext, TestConfig.extTwo) 
        await AssertionsGroups.assertSuccessMessage(TestConfig.successMsgG)
        await GroupsPage.closeNotification()
    })

    it('Search the created Group successfully.\nAssert the Groups name, description and members are present and correct.', async () => {
        await GroupsPage.searchGroup(global.groupName) 
        await AssertionsGroups.assertCreatedGroupTextAttributes()
        await GroupsPage.editAssert()
        await GroupsPage.clearSearch()
        /*
        await GroupsPage.open()
        await GroupsPage.waitForPageLoad()
        await GroupsPage.searchGroup(TestConfig.grName) 
        await GroupsPage.openQeickView()
        await AssertionsGroups.assertCreateGroupQucikViewAtributes()
        */
    })

    it('Edit Group successfully.\nA pop-up message for update should be displayed after editing the Groups.', async () => {
        await GroupsPage.editGroup(global.groupName, global.editGroupName, TestConfig.descNameEdit) 
        await AssertionsGroups.assertUpdateMessage(TestConfig.updateMsgG)
        await GroupsPage.closeNotification()
        await GroupsPage.clearSearch()
    })

    it('Search the edited Group successfully.\nAssert the Groups name, description and members are present and correct.', async () => {
        await GroupsPage.open()
        await GroupsPage.waitForPageLoad()
        await GroupsPage.searchGroup(global.editGroupName) 
        await AssertionsGroups.assertEditedGroupTextAttributes()
        await GroupsPage.clearSearch()
        /*
        await GroupsPage.openQeickView()
        await AssertionsGroups.assertEditedGroupQucikViewAtributes()
        */
    })

    it('Delete Group successfully.\nA pop-up message for update should be displayed after deleting the Groups.', async () => {
        await GroupsPage.deleteGroup(global.editGroupName) 
        await AssertionsGroups.assertDeleteMessage(TestConfig.deleteMsgG)
        //await AssertionsGroups.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsGroups.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsGroups.assertEmptyTableIcon()
    })
})