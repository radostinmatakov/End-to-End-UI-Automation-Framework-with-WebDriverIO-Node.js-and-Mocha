const LoginPageAdmin = require('../../../pageobjects_main/login.page.admin.js')
const IPManagementPage = require('../../../pageobjects_main/pageobjects/Sideview menu/Security/ip.managment.page')
const AssertionsIps = require('../../../helpers/assertions.ip.js')
const TestConfig = require('../../../data/TestConfig.js');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Create, Edit, Delete and Restore IP/GEOIP', () => {
    it('Create IP successfully.\nA pop-up message for update should be displayed after creating the IP.', async () => {
        await IPManagementPage.open()
        await IPManagementPage.waitForPageLoad()
        await IPManagementPage.createIP(global.ipAdress, global.ipDesc) 
        await AssertionsIps.assertSuccessMessage(TestConfig.successMsgIp)
        await IPManagementPage.closeNotification()
    })

    it('Search the created IP successfully.\nAssert the IPs attributes that are present and correct.', async () => {
        await IPManagementPage.searchIps(global.ipAdress) 
        await AssertionsIps.assertCreatedIpTextAttributes()
        await IPManagementPage.clearSearch()
    })
    /*
    it('Create GEOIP successfully.\nA pop-up message for update should be displayed after creating the GEOIP.', async () => {
        await IPManagementPage.createGeoIP(global.geoIpDesc) 
        await AssertionsIps.assertSuccessMessage(TestConfig.successMsgIp)
        await IPManagementPage.closeNotification()
    })
    
    it('Search the created GEOIP successfully.\nAssert the GEOIPs attributes that are present and correct.', async () => {
        await IPManagementPage.searchIps(global.geoIpDesc) 
        await AssertionsIps.assertCreatedGeoIpTextAttributes()
        await IPManagementPage.clearSearch()
    })
    */
    it('Edit IP successfully.\nA pop-up message for update should be displayed after editing the IP.', async () => {
        await IPManagementPage.editIP(global.ipDesc, global.editIpDesc) 
        await AssertionsIps.assertSuccessMessage(TestConfig.successMsgIp)
        await IPManagementPage.closeNotification()
        await IPManagementPage.clearSearch()
    })

    it('Search the edited IP successfully.\nAssert the IP attributes that are present and correct.', async () => {
        await IPManagementPage.searchIps(global.editIpDesc) 
        await AssertionsIps.assertEditedIpTextAttributes() 
        await IPManagementPage.clearSearch()
    })
    /*
    it('Edit GEOIP successfully.\nA pop-up message for update should be displayed after editing the GEOIP.', async () => {
        await IPManagementPage.editGeoIP(global.geoIpDesc, global.editGeoIpDesc) 
        await AssertionsIps.assertSuccessMessage(TestConfig.successMsgIp)
        await IPManagementPage.closeNotification()
        await IPManagementPage.clearSearch()
    })

    it('Search the edited GEOIP successfully.\nAssert the GEOIP attributes that are present and correct.', async () => {
        await IPManagementPage.searchIps(global.editGeoIpDesc) 
        await AssertionsIps.assertEditedGeoIpTextAttributes()
        await IPManagementPage.clearSearch()
    })
    */
    it('Delete IPs successfully.\nA pop-up message for update should be displayed after deleting the IPs.', async () => {
        await IPManagementPage.deactivateIp(global.ipAdress) 
        await AssertionsIps.assertDeleteMessage(TestConfig.deleteMsgIp)
        await IPManagementPage.closeNotification()
        //await AssertionsIps.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsIps.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsIps.assertEmptyTableIcon()
        await IPManagementPage.clearSearch()
    })
    /* // TO ADD AFTER THE FIX IS DEPLOYED 
    it('Restore IP successfully.\nA pop-up message for update should be displayed after restoring the IPs.', async () => {
        await IPManagementPage.viewDisabledIps() 
        await IPManagementPage.restoreIps(global.editIpDesc) 
        //await AssertionsIps.assertDeleteMessage(TestConfig.restoreMsBl) // after the fix to fectch the correct message 
        await IPManagementPage.closeNotification()
        await IPManagementPage.clearSearch()
    })

    it('Verify that the restored IPs is in Active Records.', async () => {
        await IPManagementPage.viewActiveIps()
        await IPManagementPage.searchIps(global.editIpDesc) 
        await AssertionsIps.assertRestoredIpTextAttributes()
        await IPManagementPage.clearSearch()
    })
    /*
    it('Restore GEOIP successfully.\nA pop-up message for update should be displayed after restoring the IPs.', async () => {
        await IPManagementPage.viewDisabledIps() 
        await IPManagementPage.restoreIps(global.editGeoIpDesc) 
        //await AssertionsIps.assertDeleteMessage(TestConfig.restoreMsBl) //after the fix to fectch the correct message 
        await IPManagementPage.closeNotification()
        await IPManagementPage.clearSearch()
    })

    it('Verify that the restored IPs is in Active Records.', async () => {
        await IPManagementPage.viewActiveIps()
        await IPManagementPage.searchIps(global.editGeoIpDesc) 
        await AssertionsIps.assertRestoredIpTextAttributes()
        await IPManagementPage.clearSearch()
    })
        */
})