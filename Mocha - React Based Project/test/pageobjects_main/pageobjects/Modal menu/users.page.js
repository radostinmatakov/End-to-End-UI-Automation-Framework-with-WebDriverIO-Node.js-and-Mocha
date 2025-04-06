const assert = require('assert');
const { $ } = require('@wdio/globals')
const Page = require('../../page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class UsersPage extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("div[class='panel']");
    }

    // Getters for Create User Admin - WEB
    get newUser () {
        return $("button[class='btn btn-outline-info ']");
    }
    get userName () {
        return $("input[id='name']");
    }
    get userEmail () {
        return $("input[id='email']");
    }
    get userPhone () {
        return $("input[id='phone']");
    }
    get extTypeWeb () {
        return $("select[name='type'] option[value='0']");
    }
    get extension () {
        return $(".css-19bb58m");
    }
    get extensionValueRoles () {
        return $("span[child-key='114']");
    }
    get extensionValueRolesN () {
        return $("span[child-key='115']");
    }
    get extensionValueWeb () {
        return $("span[child-key='111']");
    }
    get levelAdmin () {
        return $("select[name='level_id'] option[value='2']"); // Admin
    }
    get roleAdmin () {
        return $("//select[@name='role_id']/option[normalize-space(text())='Default Admin']"); // Default Admin
    }

    // Getters for Create User - WEB for Before method in Roles
    get levelBefore () {
        return $("select[name='level_id'] option[value='3']"); // Manager
    }
    get roleBeforeN () {
        return $("//select[@name='role_id']/option[normalize-space(text())='TestNRole']"); // Before method in Roles page
    }
    get roleBefore () {
        return $("//select[@name='role_id']/option[normalize-space(text())='TestUser']"); // Before method in Roles page
    }
    
    // Getters for Create User - SIP
    get extTypeSip () {
        return $("select[name='type'] option[value='1']");
    }
    get extensionSip () {
        return $("(//div[@class=' css-19bb58m'])[1]");
    }
    get extensionValueSip () {
        return $("span[child-key='112']");
    }
    get forceLogin () {
        return $("select[name='force_login'] option[value='0']");
    }
    get levelManager () {
        return $("select[name='level_id'] option[value='3']"); // Manager
    }
    get roleManager () {
        return $("//select[@name='role_id']/option[normalize-space(text())='Default Manager']"); // Default Manager
    }
    // Additional field when the manager is selected 
    get extGroups () {
        return $("(//div[@class=' css-1wy0on6'])[2]");
    }
    get extGroupsSelect () {
        return $("div[class=' css-d7l1ni-option']");
    }
    get monitorQueues () {
        return $("(//div[@class=' css-1wy0on6'])[3]");
    }
    get monitorQueuesSelect () {
        return $("div[class=' css-d7l1ni-option']");
    }

    // Getters for Create User Agent - WEB
    get newUser () {
        return $("button[class='btn btn-outline-info ']");
    }
    get userName () {
        return $("input[id='name']");
    }
    get userEmail () {
        return $("input[id='email']");
    }
    get userPhone () {
        return $("input[id='phone']");
    }
    get extTypeWeb () {
        return $("select[name='type'] option[value='0']");
    }
    get extension () {
        return $("div[class=' css-19bb58m']");
    }
    get extensionValueWeb () {
        return $("span[child-key='111']");
    }
    get levelAdmin () {
        return $("select[name='level_id'] option[value='2']"); // Admin
    }
    get roleAdmin () {
        return $("//select[@name='role_id']/option[normalize-space(text())='Default Admin']"); // Default Admin
    }

    // Getters for Edit User - WEB 
    get editBtn () {
        return $("svg[class='lucide lucide-pencil']"); 
    }
    get editQuickView () {
        return $("svg[class='lucide lucide-pencil ml-2 w-5 h-5 text-primary']"); 
    }
    get password () {
        return $("input[name='password']"); 
    }
    get showPassIcon () {
        return $("svg[class='lucide lucide-eye-off h-5 w-5']"); 
    }
    
    // Getters for Delete User 
    get deleteBtn () {
        return $("svg[class='lucide lucide-trash2']"); 
    }
    get confirmBtn () {
        return $("button[class='btn btn-primary btn-confirm ltr:ml-4 rtl:mr-4']"); 
    }

    // Getters for Reset Pass 
    get resetBtn () {
        return $("svg[class='lucide lucide-refresh-ccw']"); 
    }
    get confirmBtnReset () {
        return $("button[class='btn btn-outline-primary ']"); 
    }
  
    // Getters for Reusable locators for all methods
    get searchBar () {
        return $("(//input[@placeholder='Search...'])[2]");
    }
    get createBtn () {
        return $("button[class='btn btn-outline-success ']");
    }
    get quickViewRow() {
        return $("tr[class='m_4e7aa4fd mantine-Table-tr mantine-datatable-row']"); 
    }
    get activeToggle () {
        return $("input.custom_switch");
    }

    // Getters for inner assertions
    get passwordField() {
        return $('#password'); 
    }

    // Async methods to wait until a specific element on the page is visible or present
    async waitForPageLoad() {
        await browser.waitUntil(async () => {
            return await this.table.waitForDisplayed();
        });
    }
   
    // Async methods to encapsule automation code to interact with the page
    // Create new User
    async createUserBefore (name, email, phone) { 
        await this.newUser.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.userName.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.userEmail.setValue(email);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.userPhone.setValue(phone);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.activeToggle.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extTypeWeb.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extension.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extensionValueRoles.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.levelBefore.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.roleBefore.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.createBtn.moveTo();
        await browser.execute((el) => el.click(), await this.createBtn);
    }

    async createUserBeforeN (name, email, phone) { 
        await this.newUser.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.userName.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.userEmail.setValue(email);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.userPhone.setValue(phone);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.activeToggle.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extTypeWeb.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extension.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extensionValueRolesN.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.levelBefore.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.roleBeforeN.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.createBtn.moveTo();
        await browser.execute((el) => el.click(), await this.createBtn);
    }
    
    async createUserAdminWEB (name, email, phone) { 
        await this.newUser.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.userName.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.userEmail.setValue(email);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.userPhone.setValue(phone);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.activeToggle.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extTypeWeb.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.pause(30000);
        await this.extension.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extensionValueWeb.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.levelAdmin.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.roleAdmin.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        //await this.createBtn.doubleClick();
        await browser.execute((el) => el.click(), await this.createBtn);
        await browser.pause(4000); // Pause for 4 seconds to observe
    }

    async searchUser (search) {
        //await browser.refresh();
        await this.searchBar.setValue(search);
    }

    async openQeickView () {
        await this.quickViewRow.click(); 
    }

    async createUserSIP (name, email, phone) { 
        await this.newUser.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.userName.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.userEmail.setValue(email);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.userPhone.setValue(phone);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.activeToggle.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extTypeSip.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extensionSip.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extensionValueSip.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.forceLogin.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.forceLogin.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.levelManager.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.roleManager.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extGroups.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extGroupsSelect.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        // Scroll is used because of a div class <div class='sticky bottom-0 w-full z-20 p-2'> 
        await browser.execute(() => {
            window.scrollTo(0, document.body.scrollHeight); // Scroll to the very bottom of the page
        });
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.monitorQueues.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.monitorQueuesSelect.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        //await this.createBtn.doubleClick();
        await browser.execute((el) => el.click(), await this.createBtn);
        await browser.pause(4000); // Pause for 4 seconds to observe
    }


    //Create Agent ???

    // Edit User
    async editUserWeb (search, name, pass) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.editBtn.click(); 
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.userName.click(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.userName.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.password.setValue(pass);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.showPassIcon.click();
        const passwordType = await this.passwordField.getAttribute('type');
        expect(passwordType).toBe('text');
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.activeToggle.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.createBtn.doubleClick();
        //await browser.execute((el) => el.click(), await this.createBtn);
    }

    async editUserSip (search, name, pass) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.quickViewRow.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.editQuickView.click(); 
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.userName.click(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.userName.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.password.setValue(pass);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.showPassIcon.click();
        const passwordType = await this.passwordField.getAttribute('type');
        expect(passwordType).toBe('text');
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.createBtn.doubleClick();
        //await browser.execute((el) => el.click(), await this.createBtn);
    }

    async deleteUser (search) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.deleteBtn.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.confirmBtn.waitForDisplayed();
        await this.confirmBtn.click();
    }

    async resetPass (search) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.resetBtn.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.confirmBtnReset.waitForDisplayed();
        await this.confirmBtnReset.click();
    }

    // Overwrite specific options to adapt it to page object
    open () {
        return super.open('settings/users');
    }
}

module.exports = new UsersPage();