const LoginPageAdmin = require('../../pageobjects_main/login.page.admin.js')
const StatusesPageN = require('../../pageobjects_main/pageobjects_N/statuses.page_N')
const AssertionsStatusesN = require('../../helpers_N/assertions.statuses_N')
const TestConfig = require('../../data/TestConfig');
const TestConfig_N = require('../../data/TestConfig_N');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Negative Scenarios for Create, Edit Users', () => {
    it('Verify that the user cannot create a User with missing mandatory fields.', async () => {
        await StatusesPageN.open()
        await StatusesPageN.waitForPageLoad()
        await StatusesPageN.createStatusWithEmptyFields()
    })

    it('Verify that the user cannot create a User with already existing Name and Email.', async () => {
        await StatusesPageN.open()
        await StatusesPageN.waitForPageLoad()
        await StatusesPageN.createStatusWithExistingName(TestConfig_N.statusName) 
        await AssertionsStatusesN.assertErrorMessage(TestConfig_N.errorMsgS) 
    })
})