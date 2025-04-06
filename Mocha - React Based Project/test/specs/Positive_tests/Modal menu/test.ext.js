const LoginPageAdmin = require('../../../../pageobjects_main/login.page.admin.js')
const ExtPage = require('../../pageobjects_main/pageobjects/ext.page')
const GroupsPage = require('../../../../pageobjects_main/pageobjects/Sideview menu/groups.page.js')
const UsersPage = require('../../../../pageobjects_main/pageobjects/Sideview menu/users.page.js')
const AssertionsExt = require('../../../../helpers/assertions.ext.js')
const AssertionsUsers = require('../../../../helpers/assertions.users.js')
const AssertionsGroups = require('../../../../helpers/assertions.groups.js')
const TestConfig = require('../../../../data/TestConfig.js');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Create, Edit and Delete Groups', () => {
    it('Create Ext - WEB successfully.\nA pop-up message for update should be displayed after creating the Ext.', async () => {
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await ExtPage.createExtWeb(global.extNameWEB, TestConfig.extWebNumber) 
        await AssertionsExt.assertSuccessMessage(TestConfig.successMsgE)
    })

    it('Add the created Ext to a Group successfully.', async () => {
        await GroupsPage.open()
        await GroupsPage.waitForPageLoad()
        await ExtPage.addExtToAGroup(TestConfig.groupName, TestConfig.extWebNumber) 
        await AssertionsGroups.assertUpdateMessage(TestConfig.updateMsgG)
    })

    it('Add the created Ext to a User successfully.', async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await ExtPage.addExtToAUser(TestConfig.userName) 
        await AssertionsUsers.assertUpdateMessage(TestConfig.updateMsgU)
    })

    it('Search the created Ext - WEB successfully.\nAssert the Ext attributes that are present and correct.', async () => {
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await ExtPage.searchExt(global.extNameWEB) 
        await AssertionsExt.assertCreatedExtWebTextAttributes(TestConfig.extWebNumber, TestConfig.extTypeWeb, TestConfig.userName, TestConfig.groupName, TestConfig.recTypeWeb, TestConfig.extCaller)
        //await ExtPage.openQeickView()
        //await AssertionsExt.assertCreateGroupQucikViewAtributes()
    })

    it('Create Ext - SIP successfully.\nA pop-up message for update should be displayed after creating the Ext.', async () => {
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await ExtPage.createExtSip(global.extNameSIP, TestConfig.extSipNumber) 
        await AssertionsExt.assertSuccessMessage(TestConfig.successMsgE)
    })

    it('Search the created Ext - SIP successfully.\nAssert the Ext attributes that are present and correct.', async () => {
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await ExtPage.searchExt(global.extNameSIP) 
        await AssertionsExt.assertCreatedExtSipTextAttributes(TestConfig.extSipNumber, TestConfig.extTypeSip, TestConfig.recTypeSip, TestConfig.extCallerNumber)
        //await ExtPage.openQeickView()
        //await AssertionsExt.assertCreateGroupQucikViewAtributes()
    })

    xit('Edit Ext - WEB successfully.\nA pop-up message for update should be displayed after editing the Ext.', async () => {
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await ExtPage.editExt(global.extNameWEB, global.editExtNameWeb) 
        await AssertionsExt.assertUpdateMessage(TestConfig.updateMsgE)
    })

    xit('Search the edited Ext successfully.\nAssert the Ext attributes that are present and correct.', async () => {
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await ExtPage.searchExt(global.editExtNameWeb) 
        await AssertionsExt.assertEditedExtWebTextAttributes(TestConfig.recTypeWebEdit, TestConfig.extCallerNumber)
        //await GroupsPage.openQeickView()
        //await AssertionsGroups.assertEditedGroupQucikViewAtributes()
    })

    xit('Delete Group successfully.\nA pop-up message for update should be displayed after deleting the Groups.', async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await ExtPage.removeExtFromUser(TestConfig.userName)
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await ExtPage.deleteExt(TestConfig.userName) 
        await AssertionsExt.assertDeleteMessage(TestConfig.deleteMsgE)
        await AssertionsExt.assertEmptyTable(TestConfig.emptyTable)
    })
})