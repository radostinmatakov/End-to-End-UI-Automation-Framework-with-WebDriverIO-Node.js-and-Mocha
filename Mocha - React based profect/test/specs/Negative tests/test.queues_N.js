const LoginPageAdmin = require('../../pageobjects_main/login.page.admin.js')
const QueuesPageN = require('../../pageobjects_main/pageobjects_N/queues.page_N')
const TestConfig = require('../../data/TestConfig');
const TestConfig_N = require('../../data/TestConfig_N');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Negative Scenarios for Create, Edit Queues', () => {
    it('Verify that the user cannot create a Queues with missing mandatory fields.', async () => {
        await QueuesPageN.open()
        await QueuesPageN.waitForPageLoad()
        await QueuesPageN.createQWithEmptyFields() 
    })

    it('Verify that the user cannot create a Queues with already existing Name and Number.', async () => {
        await QueuesPageN.open()
        await QueuesPageN.waitForPageLoad()
        await QueuesPageN.createQWithExistingNameAndNumber(TestConfig_N.queuesName, TestConfig_N.queuesNumber) 
    })

    it('Verify that the user cannot create a Queues with missing mandatory fields if they enabled Callback tab', async () => {
        await QueuesPageN.open()
        await QueuesPageN.waitForPageLoad()
        await QueuesPageN.createQCallbackTab() 
    })


})