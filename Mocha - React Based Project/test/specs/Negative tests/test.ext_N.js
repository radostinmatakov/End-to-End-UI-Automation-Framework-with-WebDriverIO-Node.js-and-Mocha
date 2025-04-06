const LoginPageAdmin = require('../../pageobjects_main/login.page.admin.js')
const ExtPageN = require('../../pageobjects_main/pageobjects_N/ext.page_N')
const ExtPage = require('../../pageobjects_main/pageobjects/Sideview menu/ext.page.js')
const UsersPage = require('../../pageobjects_main/pageobjects/Sideview menu/users.page.js')
const AssertionsExtN = require('../../helpers_N/assertions.ext_N')
const AssertionsUsers = require('../../helpers/assertions.users')
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
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await ExtPage.createExtWeb(TestConfig_N.extName, TestConfig_N.extNumber) 
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await ExtPageN.addExtToAUserN(TestConfig_N.userNameN, TestConfig_N.extNumber) 
        await AssertionsUsers.assertUpdateMessage(TestConfig.updateMsgU)
    });

    it('Verify that the user cannot create an Ext with missing mandatory fields.', async () => {
        await ExtPageN.open()
        await ExtPageN.waitForPageLoad()
        await ExtPageN.createExtWithEmptyFields() 
    })

    it('Verify that the user cannot create an Ext with already existing Name and Number.', async () => {
        await ExtPageN.open()
        await ExtPageN.waitForPageLoad()
        await ExtPageN.createExtWithExistingNameAndNumber(TestConfig_N.extName, TestConfig_N.extNumber) 
    })
    /*
    it('Verify that the user cannot create an Ext with number different from whole numbers.', async () => {
        await ExtPageN.open()
        await ExtPageN.waitForPageLoad()
        await ExtPageN.createExtWithExistingNameAndNumber(TestConfig_N.extName, TestConfig_N.extNumber) 
    })
    */
    it('Verify that the user cannot delete an Ext that is assigned to a User.', async () => {
        await ExtPageN.open()
        await ExtPageN.waitForPageLoad()
        await ExtPageN.deleteAssignExtToAUser(TestConfig_N.extName) 
    })

    after(async () => {
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await ExtPage.createExtWeb(TestConfig_N.extName, TestConfig_N.extNumber) 
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await ExtPageN.addExtToAUserN(TestConfig_N.userNameN, TestConfig_N.extNumber) 
        await AssertionsUsers.assertUpdateMessage(TestConfig.updateMsgU)
    });
})