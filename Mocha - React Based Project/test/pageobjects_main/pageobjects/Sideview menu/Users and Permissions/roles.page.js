const assert = require('assert');
const { $ } = require('@wdio/globals')
const Page = require('../../../page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class RolesPage extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("svg[class='lucide lucide-trash2']");
    }

    // Getters for Create Role
    get addRole () {
        return $("//button[contains(@class, 'btn') and text()='+ Add Role']");
    }
    get roleName () {
        return $("input[id='name']");
    }
    get selectLevel () {
        return $("select[name='level_id'] option[value='2']");
    }
    get expandFieldGeneral () {
        return $("(//div[@class='w-full m-2 mx-auto bg-white dark:bg-black rounded-xl border border-dark-light '])[1]");
    }

    // Getters for Edit Role - Manager
    get roleNameEdit () {
        return $("input[id='name']");
    }
    get selectLevelEdit () {
        return $("select[name='level_id'] option[value='3']");
    }

    // Getters for Edit Role - Agent
    get selectLevelEdit2 () {
        return $("select[name='level_id'] option[value='4']");
    }

    // Getters for Copy Role
    get copyBtn () {
        return $("svg[class='lucide lucide-copy']");
    }

    // Getters for dissable/enable permissions for a Role
    get disableGeneralPerm () {
        return $("(//span[contains(@class, 'peer-checked:bg-primary')])[2]");
    }
    get expandFieldMyScore () {
        return $("(//div[@class='w-full m-2 mx-auto bg-white dark:bg-black rounded-xl border border-dark-light '])[2]");
    }
    get disableInnerPerm () {
        return $("(//span[contains(@class, 'peer-checked:bg-primary')])[4]"); // Own call history
    }
    get disableInnerPerm2 () {
        return $("(//span[contains(@class, 'peer-checked:bg-primary')])[5]"); // Listen own call
    }
    get enableInnerPerm () {
        return $("(//span[contains(@class, 'peer-checked:bg-primary')])[10]"); // Own call history
    }
    get enableInnerPerm2 () {
        return $("(//span[contains(@class, 'peer-checked:bg-primary')])[11]"); // Listen own call
    }

    // Getters for Delete Role
    get deleteBtn () {
        return $("svg[class='lucide lucide-trash2']");
    }
    
    // Getters for before 
    get selectRole () {
        return $("div[class='css-19bb58m']");
    }
    get selectRoleValue () {
        return $("//div[contains(@class, 'css-d7l1ni-option') and text()='Default Manager']");
    }
    get moveBtn () {
        return $("//button[contains(@class, 'btn') and text()='Move']");
    }
    
    // Reusible getters for all 
    get opneEditSideview () {
        return $('tr[class="m_4e7aa4fd mantine-Table-tr mantine-datatable-row"]');
    }
    get createBtn () {
        return $("//button[contains(@class, 'btn') and text()='Create']");
    }
    get saveBtn () {
        return $("//button[contains(@class, 'btn') and text()='Save']");
    }
    get searchBar () {
        return $("input[placeholder='Search...']");
    }
    get confirm () {
        return $("button[class='btn btn-primary btn-confirm ltr:ml-4 rtl:mr-4']");
    }
    get closeSideview () {
        return $("(//*[name()='svg'][@class='lucide lucide-x'])[3]");
    }
    get closeSwal2 () {
        return $("button[class='swal2-close']");
    }

    // Getters for inner assettions 
    get labels() {
        return $$("label[class='m-0']"); 
    }
    get permisions() {
        return $$("//span[text()='Enable to see permissions here...']"); 
    }
    get notifyMessage() {
        return $('#swal2-title');
    }
   
    // Async methods to wait until a specific element on the page is visible or present
    async waitForPageLoad() {
        await browser.waitUntil(async () => {
            return await this.table.waitForDisplayed();
        });
    }
   
    // Async methods to encapsule automation code to interact with the page
    // Assertion method to verify all label texts in sequence
    async assertAllLabelTexts(expectedTexts) {
        const labels = await this.labels;
        // Check that the number of labels matches the expected text count
        assert.strictEqual(labels.length, expectedTexts.length, `Expected ${expectedTexts.length} labels, but found ${labels.length}`);
        // Loop through each label and assert its text
        for (let i = 0; i < labels.length; i++) {
            const actualText = await labels[i].getText();
            assert.strictEqual(actualText, expectedTexts[i], `Expected label text "${expectedTexts[i]}", but found "${actualText}" at position ${i + 1}`);
        }
    }

    async createRole_Admin (name, expectedTexts) { 
        await this.addRole.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.roleName.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.selectLevel.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.expandFieldGeneral.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.assertAllLabelTexts(expectedTexts);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.createBtn.waitForClickable();
        await this.createBtn.click();
    }

    async searchCreatedRole (search) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
    }

    async editRole_Manager (search, name_edit, expectedTexts) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.opneEditSideview.click(); 
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.roleNameEdit.click(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.roleNameEdit.setValue(name_edit);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.selectLevelEdit.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.assertAllLabelTexts(expectedTexts);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.saveBtn.waitForClickable();
        await this.saveBtn.click();
    }

    async editRole_Agent (search, expectedTexts) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.opneEditSideview.click(); 
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.selectLevelEdit2.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.assertAllLabelTexts(expectedTexts);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.saveBtn.waitForClickable();
        await this.saveBtn.click();
    }

    async searchEditedRole (search) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
    }

    async disablePermissions (search) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.opneEditSideview.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.expandFieldGeneral.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle = await this.disableGeneralPerm;
        await browser.execute((el) => el.click(), activeToggle);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.expandFieldGeneral.click();
        const permissions = await this.permisions[0];
        await expect(permissions).toHaveText('Enable to see permissions here...');
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.expandFieldMyScore.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle2 = await this.disableInnerPerm;
        await browser.execute((el) => el.click(), activeToggle2);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle3 = await this.disableInnerPerm2;
        await browser.execute((el) => el.click(), activeToggle3);
        await this.saveBtn.waitForClickable();
        await this.saveBtn.click();
    }

    async searchDisRole (search) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.opneEditSideview.click(); 
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.expandFieldGeneral.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.expandFieldMyScore.click();
    }

    async enablePermissions (search) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.opneEditSideview.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.expandFieldGeneral.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle = await this.disableGeneralPerm;
        await browser.execute((el) => el.click(), activeToggle);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.expandFieldMyScore.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle2 = await this.enableInnerPerm;
        await browser.execute((el) => el.click(), activeToggle2);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle3 = await this.enableInnerPerm2;
        await browser.execute((el) => el.click(), activeToggle3);
        await this.saveBtn.waitForClickable();
        await this.saveBtn.click();
    }

    async searchEnabRole (search) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.opneEditSideview.click(); 
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.expandFieldGeneral.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.expandFieldMyScore.click(); 
    }

    async copyRole (search, name_edit) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.copyBtn.click(); 
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.roleNameEdit.click(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.roleNameEdit.setValue(name_edit);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.createBtn.waitForClickable();
        await this.createBtn.click();
    }

    async searchCopiedRole (search) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
    }

    async deleteRole (search, message) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.deleteBtn.click(); 
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.notifyMessage.waitForDisplayed();
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
        await this.confirm.waitForDisplayed();
        await this.confirm.click();
    }

    async deleteRoleWhenAssigned (search, message) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.deleteBtn.click(); 
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.selectRole.click(); 
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.selectRoleValue.click(); 
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.moveBtn.click(); 
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.notifyMessage.waitForDisplayed();
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
        await this.confirm.waitForDisplayed();
        await this.confirm.click();
    }

    async createRoleForUser (name, expectedTexts) { 
        await this.addRole.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.roleName.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.selectLevelEdit.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.assertAllLabelTexts(expectedTexts);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.createBtn.waitForClickable();
        await this.createBtn.click();
    }

    async clearSearch () {
        await this.searchBar.click(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
    }

    async closeNotification () {
        await browser.waitUntil(
            async () => await this.notifyMessage.waitForDisplayed(),
            {
                timeout: 25000, // Maximum time to wait in milliseconds (25 seconds)
                interval: 500,  // Interval between condition checks in milliseconds (0.5 seconds)
                timeoutMsg: 'Success message did not appear within the expected time.' // Custom error message
            }
        );
        await this.closeSwal2.click(); 
    }

    async closeSideviewMenu () {
        await this.closeSideview.click(); 
    }

    // Used in before hooks
    async deleteRoleBefore (message) { 
        await this.deleteBtn.click(); 
        //await this.notifyMessage.waitForDisplayed();
        //await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
        await this.confirm.waitForDisplayed();
        await this.confirm.click();
    }  
    async isRolePresent() {
        const noDataElem = await $("//div[contains(@class, 'mantine-Text-root') and text()='No data available']");
        const isDisplayed = await noDataElem.isDisplayed().catch(() => false);
        return !isDisplayed;
    }

    // Overwrite specific options to adapt it to page object
    open () {
        return super.open('settings/roles');
    }
}

module.exports = new RolesPage();