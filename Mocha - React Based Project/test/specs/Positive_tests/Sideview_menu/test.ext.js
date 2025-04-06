const LoginPageAdmin = require('../../../pageobjects_main/login.page.admin.js')
const ExtPage = require('../../../pageobjects_main/pageobjects/Sideview menu/Users and Permissions/ext.page')
const GroupsPage = require('../../../pageobjects_main/pageobjects/Sideview menu/Users and Permissions/groups.page.js')
const UsersPage = require('../../../pageobjects_main/pageobjects/Sideview menu/Users and Permissions/users.page.js')
const AssertionsExt = require('../../../helpers/assertions.ext.js')
const AssertionsUsers = require('../../../helpers/assertions.users.js')
const AssertionsGroups = require('../../../helpers/assertions.groups.js')
const TestConfig = require('../../../data/TestConfig.js');
const axios = require('axios');

describe('Login in Axiom as admin', () => {
    it('Succsesfully login with valid credentials', async () => {
        await LoginPageAdmin.open()
        await LoginPageAdmin.login(TestConfig.emailAdmin,TestConfig.passwordAdmin)
    })
})

describe('Check and Update Ext Limit if necessary by API requests', () => {
    let currentLimit;
    let currentNumber;
    const user = "admin@squaretalk.com";
    const pass = "Th#g^sa!jkpl";

    before(async () => {
        // Fetch Current Limit of Ext
        const limitResponse = await axios.get(`https://uat.squaretalk.com/v1/limit?user=admin@squaretalk.com&pass=Th%23g^sa!jkpl`);
        currentLimit = limitResponse.data.data.limit; 
        console.log('Current Limit of Ext:', currentLimit);

        // Fetch Current Number of Ext
        const numberResponse = await axios.get(`https://uat.squaretalk.com/v1/limit/current-ext?user=admin@squaretalk.com&pass=Th%23g^sa!jkpl`);
        currentNumber = numberResponse.data.data.count; 
        console.log('Current Number of Ext:', currentNumber);

        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await browser.pause(1000)
        try {
            await ExtPage.searchExt(TestConfig.extUsersNumber);
            const hasResult = await ExtPage.isExtPresent();
            if (hasResult) {
                await ExtPage.deleteExtBefore(TestConfig.extUsersNumber);
                await AssertionsExt.assertDeleteMessage(TestConfig.deleteMsgE);
                await ExtPage.closeNotification();
                await ExtPage.clearSearch()
            } else {
                await ExtPage.clearSearch()
                console.log(`ℹ️ Extension ${TestConfig.extUsersNumber} not found — skipping delete.`);
            }
        } catch (error) {
            console.warn(`⚠️ Error while trying to delete extension: ${error.message}`);
        }
        try {
            await ExtPage.searchExt(TestConfig.extWebNumber);
            const hasResult = await ExtPage.isExtPresent();
            if (hasResult) {
                await ExtPage.deleteExtBefore(TestConfig.extWebNumber);
                await AssertionsExt.assertDeleteMessage(TestConfig.deleteMsgE);
                await ExtPage.closeNotification();
                await ExtPage.clearSearch()
            } else {
                await ExtPage.clearSearch()
                console.log(`ℹ️ Extension ${TestConfig.extWebNumber} not found — skipping delete.`);
            }
        } catch (error) {
            console.warn(`⚠️ Error while trying to delete extension: ${error.message}`);
        }
        try {
            await ExtPage.searchExt(TestConfig.extSipNumber);
            const hasResult = await ExtPage.isExtPresent();
            if (hasResult) {
                await ExtPage.deleteExtBefore(TestConfig.extSipNumber);
                await AssertionsExt.assertDeleteMessage(TestConfig.deleteMsgE);
                await ExtPage.closeNotification();
                await ExtPage.clearSearch()
            } else {
                await ExtPage.clearSearch()
                console.log(`ℹ️ Extension ${TestConfig.extSipNumber} not found — skipping delete.`);
            }
        } catch (error) {
            console.warn(`⚠️ Error while trying to delete extension: ${error.message}`);
        }

        // Create User for the Ext Test Cases
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await UsersPage.createUserAdminWEB(global.usersNameExt, global.usersEmailExt, TestConfig.userPhone, TestConfig.extUsersName, TestConfig.extUsersNumber, TestConfig.successMsgE)
        await AssertionsUsers.assertSuccessMessage(TestConfig.successMsgU)
        await UsersPage.closeNotification()
        // Create User for the Ext Test Cases - WILL BE ADDED WHEN THE GROUPS PAGE IS FIXED
        /*
        await GroupsPage.open()
        await GroupsPage.waitForPageLoad()
        await GroupsPage.createGroupExt(global.groupNameExt, TestConfig.descName) 
        await AssertionsGroups.assertSuccessMessage(TestConfig.successMsgG)
        await GroupsPage.closeNotification()
        */
    });

    it('Update Limit if it Matches Current Number', async () => {
        console.log(`Checking values - Limit: ${currentLimit}, Number: ${currentNumber}`);

        if (currentLimit === currentNumber) {
            console.log(`Limit (${currentLimit}) and Number (${currentNumber}) are the same. Updating limit...`);
            console.log(`Updating limit from ${currentLimit} to ${currentNumber + 10}...`);

            const payload = {
                user: user,
                pass: pass,
                maxusers: currentLimit + 10 // Increase limit by 10
            };

            const response = await axios.post('https://uat.squaretalk.com/v1/limit', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('Updated Limit Response:', response.data);
            expect(response.status).toEqual(200);

            // Verify Limit After Update
            const responseAfter = await axios.get(`https://uat.squaretalk.com/v1/limit?user=admin@squaretalk.com&pass=Th%23g^sa!jkpl`);
            updatedLimit = responseAfter.data.data.limit; 
            console.log('Current Limit of Ext after Update:', updatedLimit);
            expect(responseAfter.status).toEqual(200);

        } else {
            console.log(`Limit (${currentLimit}) and Number (${currentNumber}) are different. No update needed.`);
        }
    });
});

describe('Create, Edit and Delete Extensions', () => {
    it('Create Ext - WEB successfully.\nA pop-up message for update should be displayed after creating the Ext.', async () => {
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await ExtPage.createExtWeb(global.extNameWEB, TestConfig.extWebNumber) 
        await AssertionsExt.assertSuccessMessage(TestConfig.successMsgE)
        await ExtPage.closeNotification()
    })

    it('Add the created Ext to a Group successfully.', async () => {
        await GroupsPage.open()
        await GroupsPage.waitForPageLoad()
        //await ExtPage.addExtToAGroup(global.groupNameExt, TestConfig.extWebNumber) WILL BE AVAILABLE WHEN THE GROUPS PAGE IS FIXED
        await ExtPage.addExtToAGroup(TestConfig.groupName, TestConfig.extWebNumber) 
        await AssertionsGroups.assertUpdateMessage(TestConfig.updateMsgG)
        await ExtPage.closeNotification()
        await AssertionsExt.assertExtGroupAttributes()
    })

    it('Add the created Ext to a User successfully.', async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await ExtPage.addExtToAUser(global.usersNameExt) 
        await AssertionsUsers.assertUpdateMessage(TestConfig.updateMsgU)
        await ExtPage.closeNotification()
    })

    it('Search the created Ext - WEB successfully.\nAssert the Ext attributes that are present and correct.', async () => {
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await ExtPage.searchExt(global.extNameWEB) 
        await AssertionsExt.assertCreatedExtWebTextAttributes(TestConfig.extWebNumber)
        await ExtPage.clearSearch()
    })

    it('Create Ext - SIP successfully.\nA pop-up message for update should be displayed after creating the Ext.', async () => {
        await ExtPage.createExtSip(global.extNameSIP, TestConfig.extSipNumber) 
        await AssertionsExt.assertSuccessMessage(TestConfig.successMsgE)
        await ExtPage.closeNotification()
        await ExtPage.clearSearch()
    })

    it('Search the created Ext - SIP successfully.\nAssert the Ext attributes that are present and correct.', async () => {
        await ExtPage.searchExt(TestConfig.extSipNumber) 
        await AssertionsExt.assertCreatedExtSipTextAttributes(TestConfig.extSipNumber)
        await ExtPage.clearSearch()
    })

    it('Edit Ext - WEB successfully.\nA pop-up message for update should be displayed after editing the Ext.', async () => {
        await ExtPage.editWebExt(global.extNameWEB, global.editExtNameWeb) 
        await AssertionsExt.assertUpdateMessage(TestConfig.updateMsgE)
        await ExtPage.closeNotification()
        await ExtPage.clearSearch()
    })

    it('Search the edited Ext successfully.\nAssert the Ext attributes that are present and correct.', async () => {
        await ExtPage.searchExt(global.editExtNameWeb) 
        await AssertionsExt.assertEditedExtWebTextAttributes()
        await ExtPage.clearSearch()
    })

    it('Delete Ext successfully.\nA pop-up message for update should be displayed after deleting the Ext.', async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await ExtPage.clearSearch()
        await ExtPage.removeExtFromUser(global.usersNameExt)
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await ExtPage.deleteExt(global.editExtNameWeb) 
        await AssertionsExt.assertDeleteMessage(TestConfig.deleteMsgE)
        await ExtPage.closeNotification()
        //await AssertionsExt.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsExt.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsExt.assertEmptyTableIcon()
        await ExtPage.deleteExt(global.extNameSIP) 
        await AssertionsExt.assertDeleteMessage(TestConfig.deleteMsgE)
        await ExtPage.closeNotification()
        //await AssertionsExt.assertEmptyTable(TestConfig.emptyTable)
        //await AssertionsExt.assertEmptyTableTwo(TestConfig.emptyTable)
        await AssertionsExt.assertEmptyTableIcon()
        await ExtPage.clearSearch()
    })

    after(async () => {
        await UsersPage.open()
        await UsersPage.waitForPageLoad()
        await UsersPage.deleteUser(global.usersNameExt)
        await AssertionsUsers.assertDeleteMessage(TestConfig.deleteMsgU)
        await AssertionsUsers.assertEmptyTable(TestConfig.emptyTable)
        await ExtPage.clearSearch()
        await ExtPage.open()
        await ExtPage.waitForPageLoad()
        await ExtPage.deleteExt(TestConfig.extUsersName) 
        await AssertionsExt.assertDeleteMessage(TestConfig.deleteMsgE)
        await AssertionsExt.assertEmptyTableIcon()
    });
})