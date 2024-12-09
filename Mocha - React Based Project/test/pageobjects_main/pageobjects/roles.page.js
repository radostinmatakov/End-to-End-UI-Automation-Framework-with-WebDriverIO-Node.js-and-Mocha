const assert = require('assert');
const { $ } = require('@wdio/globals')
const Page = require('../page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class RolesPage extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("div[class='panel mt-2.5']");
    }

    // Getters for Create Role
    get createBtn () {
        return $("button[class='btn btn-outline-info ']");
    }
    get roleName () {
        return $("input[id='name']");
    }
    get selectLevel () {
        return $("select[name='level_id'] option[value='2']");
    }
    get expandFieldGeneral () {
        return $("(//div[@class='flex w-full pr-4 justify-between gap-2'])[1]");
    }

    // Getters for Edit Role - Manager
    get editBtn () {
        return $("svg[class='lucide lucide-pencil']");
    }
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
        return $("(//span[contains(@class, 'peer-checked:bg-primary')])[1]");
    }
    get expandFieldMyScore () {
        return $("(//div[@class='flex w-full pr-4 justify-between gap-2'])[2]");
    }
    get disableInnerPerm () {
        return $("(//span[contains(@class, 'peer-checked:bg-primary')])[3]"); // Own call history
    }
    get disableInnerPerm2 () {
        return $("(//span[contains(@class, 'peer-checked:bg-primary')])[4]"); // Listen own call
    }
    get quickViewRow () {
        return $("tr[class='m_4e7aa4fd mantine-Table-tr mantine-datatable-row']"); 
    }
    get closeNotification () {
        return $("button[aria-label='Close this dialog']"); 
    }
    get editQuickView () {
        return $("svg[class='lucide lucide-pencil ml-2 w-5 h-5 text-primary']"); 
    }
    get enableInnerPerm () {
        return $("(//span[contains(@class, 'peer-checked:bg-primary')])[9]"); // Own call history
    }
    get enableInnerPerm2 () {
        return $("(//span[contains(@class, 'peer-checked:bg-primary')])[10]"); // Listen own call
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
        return $("div[class='css-d7l1ni-option']");
    }
    get moveBtn () {
        return $("button[class='btn btn-outline-primary ']");
    }
    
    // Reusible getters for all 
    get create () {
        return $("button[class='btn btn-outline-success ']");
    }
    get searchBar () {
        return $("(//input[@placeholder='Search...'])[2]");
    }
    get confirm () {
        return $("button[class='btn btn-primary btn-confirm ltr:ml-4 rtl:mr-4']");
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
        await this.createBtn.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.roleName.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.selectLevel.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.expandFieldGeneral.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.assertAllLabelTexts(expectedTexts);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.create.scrollIntoView({ block: 'center', behavior: 'smooth' });
        await this.create.waitForClickable();
        await this.create.click();
    }

    async searchCreatedRole (search) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
    }

    async editRole_Manager (search, name_edit, expectedTexts) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.editBtn.click(); 
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
        await this.create.scrollIntoView({ block: 'center', behavior: 'smooth' });
        await this.create.waitForClickable();
        await this.create.click();
    }

    async editRole_Agent (search, expectedTexts) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.editBtn.click(); 
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.selectLevelEdit2.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.assertAllLabelTexts(expectedTexts);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.create.scrollIntoView({ block: 'center', behavior: 'smooth' });
        await this.create.waitForClickable();
        await this.create.click();
    }

    async searchEditedRole (search) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
    }

    async disablePermissions (search) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.editBtn.click();
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
        await this.create.scrollIntoView({ block: 'center', behavior: 'smooth' });
        await this.create.waitForClickable();
        await this.create.click();
    }

    async searchDisRole (search) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.quickViewRow.click(); 
    }

    async enablePermissions () {
        await this.closeNotification.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.editQuickView.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.expandFieldGeneral.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle = await this.disableGeneralPerm;
        await browser.execute((el) => el.click(), activeToggle);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.expandFieldGeneral.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.expandFieldMyScore.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle2 = await this.enableInnerPerm;
        await browser.execute((el) => el.click(), activeToggle2);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle3 = await this.enableInnerPerm2;
        await browser.execute((el) => el.click(), activeToggle3);
        await this.create.scrollIntoView({ block: 'center', behavior: 'smooth' });
        await this.create.waitForClickable();
        await this.create.click();
    }

    async searchEnabRole (search) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.quickViewRow.click(); 
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
        //await browser.pause(2000); // Pause for 2 seconds to load the labels
        //await this.assertAllLabelTexts(expectedTexts);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.create.scrollIntoView({ block: 'center', behavior: 'smooth' });
        await this.create.waitForClickable();
        await this.create.click();
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
        await this.createBtn.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.roleName.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.selectLevelEdit.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.assertAllLabelTexts(expectedTexts);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.create.scrollIntoView({ block: 'center', behavior: 'smooth' });
        await this.create.waitForClickable();
        await this.create.click();
    }

    async openQeickView () {
        await this.quickViewRow.click(); 
    }

    // Overwrite specific options to adapt it to page object
    open () {
        return super.open('settings/roles');
    }
}

module.exports = new RolesPage();