const LoginPageAdmin = require('../../../pageobjects_main/login.page.admin.js')
const AnnouncementPage = require('../../../pageobjects_main/pageobjects/Sideview menu/Voice/announcements.page.js')
const AssertionsAnn = require('../../../helpers/assertions.ann.js')
const TestConfig = require('../../../data/TestConfig.js');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Create, Edit, Delete Announcements', () => {
    it('Create Announcement successfully.\nA pop-up message for update should be displayed after creating the Announcement.', async () => {
        await AnnouncementPage.open()
        await AnnouncementPage.waitForPageLoad()
        await AnnouncementPage.createAnn(global.annDesc, TestConfig.input, TestConfig.inputTwo) 
        //await AssertionsAnn.assertSuccessMessage(TestConfig.successMsgA)
        await AssertionsAnn.assertSuccessMessage("general.success")
        await AnnouncementPage.closeNotification()
    })

    it('Search the create Announcement successfully.\nAssert the Announcement name that is present and correct.', async () => {
        await AnnouncementPage.searchAnn(global.annDesc) 
        await AssertionsAnn.assertCreatedAnnDesc()
        await AssertionsAnn.assertCreatedAnnAttributes()
        await AnnouncementPage.clearSearch()
    })

    it('Edit Announcement successfully.\nA pop-up message for update should be displayed after creating the Announcement.', async () => {
        await AnnouncementPage.editAnn(global.annDesc, global.editAnnDesc) 
        //await AssertionsAnn.assertUpdateMessage(TestConfig.updateMsgA)
        await AssertionsAnn.assertUpdateMessage("general.success")
        await AnnouncementPage.closeNotification()
        await AnnouncementPage.clearSearch()
    })

    it('Search the edited Announcement successfully.\nAssert the Announcement name is present and correct.', async () => {
        await AnnouncementPage.searchAnn(editAnnDesc) 
        await AssertionsAnn.assertEditedAnnDesc()
        await AnnouncementPage.clearSearch()
    })

    it('Delete Announcement successfully.\nA pop-up message for update should be displayed after deleting the Announcement.', async () => {
        await AnnouncementPage.deleteAnn(global.editAnnDesc) 
        //await AssertionsAnn.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsAnn.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsAnn.assertEmptyTableIcon()
        await AssertionsAnn.assertDeleteMessage("general.success")
        //await AssertionsAnn.assertDeleteMessage(TestConfig.deleteMsgA)
    })
})
