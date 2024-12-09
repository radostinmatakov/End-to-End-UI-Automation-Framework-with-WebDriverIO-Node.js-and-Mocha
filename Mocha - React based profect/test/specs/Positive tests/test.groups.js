const LoginPageAdmin = require('../../pageobjects_main/login.page.admin.js')
const GroupsPage = require('../../pageobjects_main/pageobjects/groups.page')
const AssertionsGroups = require('../../helpers/assertions.groups')
const TestConfig = require('../../data/TestConfig');

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
        await GroupsPage.createGroup(TestConfig.grName, TestConfig.descName, TestConfig.ext, TestConfig.extTwo) 
        await AssertionsGroups.assertSuccessMessage(TestConfig.successMsgG)
    })

    it('Search the created Group successfully.\nAssert the Groups name, description and members are present and correct.', async () => {
        await GroupsPage.open()
        await GroupsPage.waitForPageLoad()
        await GroupsPage.searchGroup(TestConfig.grName) 
        await AssertionsGroups.assertCreatedGroupTextAttributes(TestConfig.grName, TestConfig.descName, TestConfig.members)
        await GroupsPage.editAssert()
        await GroupsPage.open()
        await GroupsPage.waitForPageLoad()
        await GroupsPage.searchGroup(TestConfig.grName) 
        await GroupsPage.openQeickView()
        await AssertionsGroups.assertCreateGroupQucikViewAtributes()
    })

    it('Edit Group successfully.\nA pop-up message for update should be displayed after editing the Groups.', async () => {
        await GroupsPage.open()
        await GroupsPage.waitForPageLoad()
        await GroupsPage.editGroup(TestConfig.grName, TestConfig.grNameEdit, TestConfig.descNameEdit) 
        await AssertionsGroups.assertUpdateMessage(TestConfig.updateMsgG)
    })

    it('Search the edited Group successfully.\nAssert the Groups name, description and members are present and correct.', async () => {
        await GroupsPage.open()
        await GroupsPage.waitForPageLoad()
        await GroupsPage.searchGroup(TestConfig.grNameEdit) 
        await AssertionsGroups.assertEditedGroupTextAttributes(TestConfig.grNameEdit, TestConfig.descNameEdit, TestConfig.membersEdit)
        await GroupsPage.openQeickView()
        await AssertionsGroups.assertEditedGroupQucikViewAtributes()
    })

    it('Delete Group successfully.\nA pop-up message for update should be displayed after deleting the Groups.', async () => {
        await GroupsPage.open()
        await GroupsPage.waitForPageLoad()
        await GroupsPage.deleteGroup(TestConfig.grNameEdit) 
        await AssertionsGroups.assertDeleteMessage(TestConfig.deleteMsgG)
        await AssertionsGroups.assertEmptyTable(TestConfig.emptyTable)
    })
})