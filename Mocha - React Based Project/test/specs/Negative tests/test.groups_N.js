const LoginPageAdmin = require('../../pageobjects_main/login.page.admin.js')
const GroupsPageN = require('../../pageobjects_main/pageobjects_N/groups.page_N')
const AssertionsGroupsN = require('../../helpers_N/assertions.groups_N')
const TestConfig = require('../../data/TestConfig');
const TestConfig_N = require('../../data/TestConfig_N');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Negative Scenarios for Create, Edit Groups', () => {
    it('Verify that the user cannot create a Group with missing mandatory fields.', async () => {
        await GroupsPageN.open()
        await GroupsPageN.waitForPageLoad()
        await GroupsPageN.createGroupWithEmptyFields() 
    })

    it('Verify that the user cannot create a Group with already existing Name.', async () => {
        await GroupsPageN.open()
        await GroupsPageN.waitForPageLoad()
        await GroupsPageN.createGroupWithExistingNameAndEmail(TestConfig_N.groupName) 
        await AssertionsGroupsN.assertErrorMessage(TestConfig_N.errorMsgG)
    })
})