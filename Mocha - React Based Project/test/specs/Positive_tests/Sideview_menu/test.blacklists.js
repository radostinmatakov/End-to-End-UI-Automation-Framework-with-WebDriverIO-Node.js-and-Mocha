const LoginPageAdmin = require('../../../pageobjects_main/login.page.admin.js')
const BlacklistPage = require('../../../pageobjects_main/pageobjects/Sideview menu/Security/blacklists.page')
const AssertionsBlacklist = require('../../../helpers/assertions.blacklist.js')
const TestConfig = require('../../../data/TestConfig.js');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Create, Edit, Delete and Restore Blacklists', () => {
    /*
    it('Create Blacklist successfully.\nA pop-up message for update should be displayed after creating the Blacklist.', async () => {
        await BlacklistPage.open()
        await BlacklistPage.waitForPageLoad()
        await BlacklistPage.createBlacklist(global.blacklistNum, global.blacklistDesc) 
        await AssertionsBlacklist.assertSuccessMessage(TestConfig.successMsgBl)
        await BlacklistPage.closeNotification()
    })
        */ // WILL BE ADDED AFTER THE FIX

    it('Search the created Blacklist successfully.\nAssert the Blacklists attributes that are present and correct.', async () => {
        await BlacklistPage.searchBlacklist(global.blacklistDesc) 
        await AssertionsBlacklist.assertCreatedBlacklistTextAttributes()
        await BlacklistPage.clearSearch()
    })

    it('Edit Blacklist successfully.\nA pop-up message for update should be displayed after editing the Blacklist.', async () => {
        await BlacklistPage.editBlacklist(global.blacklistDesc, global.editblacklistDesc) 
        await AssertionsBlacklist.assertUpdateMessage(TestConfig.updateMsgBl)
        await BlacklistPage.closeNotification()
        await BlacklistPage.clearSearch()
    })

    it('Search the edited Blacklist successfully.\nAssert the Blacklists attributes that are present and correct.', async () => {
        await BlacklistPage.searchBlacklist(global.blacklistNum) 
        await AssertionsBlacklist.assertEditedBlacklistTextAttributes()
        await BlacklistPage.clearSearch()
    })

    it('Delete Blacklist successfully.\nA pop-up message for update should be displayed after deleting the Blacklist.', async () => {
        await BlacklistPage.deleteBlacklist(global.editblacklistDesc) 
        await AssertionsBlacklist.assertDeleteMessage(TestConfig.deleteMsgBl)
        await BlacklistPage.closeNotification()
        //await AssertionsBlacklist.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsBlacklist.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsBlacklist.assertEmptyTableIcon()
        await BlacklistPage.clearSearch()
    })

    it('Restore Blacklist successfully.\nA pop-up message for update should be displayed after restoring the Blacklist.', async () => {
        await BlacklistPage.viewDeletedBlacklists() 
        await BlacklistPage.restoreBlacklists(global.editblacklistDesc) 
        await AssertionsBlacklist.assertDeleteMessage(TestConfig.restoreMsBl)
        await BlacklistPage.closeNotification()
        await BlacklistPage.clearSearch()
    })

    it('Verify that the restored Blacklist is in Active Records.', async () => {
        await BlacklistPage.viewActiveBlacklists()
        await BlacklistPage.searchBlacklist(global.editblacklistDesc) 
        await AssertionsBlacklist.assertRestoredBlacklistTextAttributes()
        await BlacklistPage.clearSearch()
    })
    /*
    it('Create(Restore) Blacklist when its already deleted successfully.\nA pop-up message for update should be displayed after creating the Blacklist.', async () => {
        await BlacklistPage.createBlacklistWhenItsDeleted(global.blacklistNum, global.editblacklistDesc, TestConfig.duplMsgBl ) 
        await AssertionsBlacklist.assertSuccessMessage(TestConfig.restoreMsBl)
        await BlacklistPage.closeNotification()
        await BlacklistPage.searchBlacklist(global.editblacklistDesc) 
        await AssertionsBlacklist.assertRestoredBlacklistTextAttributes()
        await BlacklistPage.clearSearch()
    })
        */ // WILL BE ADDED AFTER THE FIX

    after(async () => {
        await BlacklistPage.deleteBlacklist(global.editblacklistDesc) 
        await AssertionsBlacklist.assertDeleteMessage(TestConfig.deleteMsgBl)
        await BlacklistPage.closeNotification()
        //await AssertionsBlacklist.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsBlacklist.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsBlacklist.assertEmptyTableIcon()
    });
})