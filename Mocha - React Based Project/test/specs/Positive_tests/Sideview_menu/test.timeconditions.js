const LoginPageAdmin = require('../../../pageobjects_main/login.page.admin.js')
const TimeConditionsPage = require('../../../pageobjects_main/pageobjects/Sideview menu/Voice/time.conditions')
const AssertionsTc = require('../../../helpers/assertions.tc.js')
const TestConfig = require('../../../data/TestConfig.js');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Create, Edit, Delete Time Condition', () => {
    it('Create Time Condition successfully.\nA pop-up message for update should be displayed after creating the Time Condition.', async () => {
        await TimeConditionsPage.open()
        await TimeConditionsPage.waitForPageLoad()
        await TimeConditionsPage.createTc(global.TcName, TestConfig.input, TestConfig.inputTwo) 
        //await AssertionsTc.assertSuccessMessage(TestConfig.successMsgT)
        await AssertionsTc.assertSuccessMessage("general.success.created")
        await TimeConditionsPage.closeNotification()
    })

    it('Search the create Time Condition successfully.\nAssert the Time Condition name that is present and correct.', async () => {
        await TimeConditionsPage.searchTc(global.TcName) 
        await AssertionsTc.assertCreatedTcName()
        await AssertionsTc.assertCreatedTcAttributes()
        await TimeConditionsPage.clearSearch()
    })

    it('Edit Time Condition successfully.\nA pop-up message for update should be displayed after creating the Time Condition.', async () => {
        await TimeConditionsPage.editTc(global.TcName, global.editTcname, TestConfig.timeGr, TestConfig.from, TestConfig.to) 
        //await AssertionsTc.assertUpdateMessage(TestConfig.updateMsgT)
        await AssertionsTc.assertSuccessMessage("general.success.updated")
        await TimeConditionsPage.closeNotification()
        await TimeConditionsPage.clearSearch()
    })

    it('Search the edited Time Condition successfully.\nAssert the Time Condition name is present and correct.', async () => {
        await TimeConditionsPage.searchTc(editTcname) 
        await AssertionsTc.assertEditedTcName()
        await TimeConditionsPage.clearSearch()
    })

    it('Delete Time Condition successfully.\nA pop-up message for update should be displayed after deleting the Time Condition.', async () => {
        await TimeConditionsPage.deleteTc(global.editTcname) 
        //await AssertionsTc.assertEmptyTable(TestConfig.emptyTable)
        await AssertionsTc.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsTc.assertEmptyTableIcon()
        await AssertionsTc.assertSuccessMessage("general.success")
        //await AssertionsTc.assertDeleteMessage(TestConfig.deleteMsgT)
    })
})
