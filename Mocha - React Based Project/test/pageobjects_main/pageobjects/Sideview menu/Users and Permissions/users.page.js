const assert = require('assert');
const { $ } = require('@wdio/globals')
const Page = require('../../../page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class UsersPage extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("svg[class='lucide lucide-trash2']");
    }

    // Getters for Create User Admin - WEB
    get addUser () {
        return $("//button[contains(@class, 'btn') and text()='+ New User']");
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
    get numberWeb () {
        return $("input[id='id']");
    }
    get extTypeWebExt () {
        return $("(//select[@name='type']//option[@value='0'])[2]");
    }
    get callWaitingWeb () {
        return $("select[name='call_waiting'] option[value='enabled']");
    }

    /*
    get extensionValueRolesN () {
        return $("span[child-key='115']");
    }
    */
    get extensionValueWeb () {
        return $("span[child-key='520']");
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
    get numberSip () {
        return $("input[id='id']");
    }
    get extTypeSipExt () {
        return $("(//select[@name='type']//option[@value='1'])[2]");
    }
    get callWaitingSip () {
        return $("select[name='call_waiting'] option[value='disabled']");
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
        return $("(//div[@class='css-19bb58m'])[2]");
    }
    get extGroupsSelect () {
        return $("div[class='css-d7l1ni-option']");
    }
    get monitorQueues () {
        return $("(//div[@class='css-19bb58m'])[2]");
    }
    get monitorQueuesSelect () {
        return $("div[class='css-d7l1ni-option']");
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
        return $("//button[contains(@class, 'btn') and text()='Confirm']"); 
    }

    // Getters for Reset Pass 
    get resetBtn () {
        return $("svg[class='lucide lucide-refresh-ccw']"); 
    }
    get confirmBtnReset () {
        return $("//button[contains(@class, 'btn') and text()='Yes']"); 
    }
  
    // Getters for Reusable locators for all methods
    get searchBar () {
        return $("input[placeholder='Search...']");
    }
    get opneEditSideview () {
        return $('tr[class="m_4e7aa4fd mantine-Table-tr mantine-datatable-row"]');
    }
    get createBtnUser () {
        return $("//button[contains(@class, 'btn') and text()='Create']");
    }
    get createBtnExt () {
        return $("(//button[contains(@class, 'btn') and text()='Create'])[2]");
    }
    get saveBtn () {
        return $("//button[contains(@class, 'btn') and text()='Save']");
    }
    get opneEditSideview() {
        return $("tr[class='m_4e7aa4fd mantine-Table-tr mantine-datatable-row']"); 
    }
    get activeToggle () {
        return $('input[name="status"]');
    }
    get addExtWeb () {
        return $("//button[contains(@class, 'btn') and text()='+ Add Extension']");
    }
    get extName () {
        return $("(//input[@id='name'])[2]");
    }
    get extension () {
        return $("div[class='css-19bb58m']");
    }

    // Getters for inner assertions
    get passwordField() {
        return $('#password'); 
    }
    get notifyMessage() {
        return $('#swal2-title');
    }
    get closeSwal2 () {
        return $("button[class='swal2-close']");
    }

    // Async methods to wait until a specific element on the page is visible or present
    async waitForPageLoad() {
        await browser.waitUntil(async () => {
            return await this.table.waitForDisplayed();
        });
    }
    async waitForSuccessMessage() {
        await browser.waitUntil(
            async () => await this.notifyMessage.waitForDisplayed(),
            {
                timeout: 30000, // Maximum time to wait in milliseconds (25 seconds)
                interval: 200,  // Interval between condition checks in milliseconds (0.5 seconds)
                timeoutMsg: 'Success message did not appear within the expected time.' // Custom error message
            }
        );
    }
   
    // Async methods to encapsule automation code to interact with the page
    // Create new User
    async createUserBefore (name, email, phone, extName, extNumber, message) { 
        await this.addUser.click();
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
        await this.addExtWeb.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extName.setValue(extName);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.numberWeb.setValue(extNumber);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extTypeWebExt.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.callWaitingWeb.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.execute((el) => el.click(), await this.createBtnExt);
        await this.waitForSuccessMessage();
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.closeSwal2.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.levelBefore.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.roleBefore.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await browser.execute((el) => el.click(), await this.createBtnUser);
    }

    async createUserBeforeN (name, email, phone) { 
        await this.addUser.click();
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
        await browser.execute((el) => el.click(), await this.createBtnUser);
    }
    
    async createUserAdminWEB (userName, email, phone, extName, extNumber, message) { 
        await this.addUser.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.userName.setValue(userName);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.userEmail.setValue(email);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.userPhone.setValue(phone);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle = await this.activeToggle;
        await browser.execute((el) => el.click(), activeToggle);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extTypeWeb.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extension.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.addExtWeb.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extName.setValue(extName);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.numberWeb.setValue(extNumber);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extTypeWebExt.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.callWaitingWeb.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.execute((el) => el.click(), await this.createBtnExt);
        await this.waitForSuccessMessage({ timeout: 40000 });
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.closeSwal2.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.levelAdmin.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.roleAdmin.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await browser.execute((el) => el.click(), await this.createBtnUser);
    }

    async createUserSIP (userName, email, phone, extName, extNumber, message) { 
        await this.addUser.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.userName.setValue(userName);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.userEmail.setValue(email);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.userPhone.setValue(phone);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle = await this.activeToggle;
        await browser.execute((el) => el.click(), activeToggle);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extTypeSip.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extension.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.addExtWeb.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extName.setValue(extName);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.numberSip.setValue(extNumber);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extTypeSipExt.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.callWaitingSip.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.execute((el) => el.click(), await this.createBtnExt);
        await this.waitForSuccessMessage({ timeout: 40000 });
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.closeSwal2.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.levelManager.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.roleManager.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extGroups.scrollIntoView({ block: 'center' });
        await this.extGroups.waitForClickable({ timeout: 5000 });
        await this.extGroups.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extGroupsSelect.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        // Scroll is used because of a div class <div class='sticky bottom-0 w-full z-20 p-2'> 
        await browser.execute(() => {
            const innerScrollableDiv = document.querySelector('.fixed.overflow-auto'); // Targeting the inner scrollable div
            if (innerScrollableDiv) {
                innerScrollableDiv.scrollTo({ top: innerScrollableDiv.scrollHeight, behavior: 'smooth' });
            }
        });
        //await browser.pause(300); // Pause for 0,3 seconds to observe
        //await this.monitorQueues.click()
        //await browser.pause(300); // Pause for 0,3 seconds to observe
        //await this.monitorQueuesSelect.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        //await this.createBtn.doubleClick();
        await browser.execute((el) => el.click(), await this.createBtnUser);
    }

    //Create Agent ???

    // Edit User
    async editUserWeb (search, name, pass) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.opneEditSideview.click(); 
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
        //await this.createBtn.doubleClick();
        await browser.execute((el) => el.click(), await this.saveBtn);
    }
    /*
    async editUserSip (search, name, pass) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.opneEditSideview.click();
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
        //await this.createBtn.doubleClick();
        await browser.execute((el) => el.click(), await this.saveBtn);
    }
    */
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

    async searchUser (search) {
        await this.searchBar.setValue(search);
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

    // Overwrite specific options to adapt it to page object
    open () {
        return super.open('settings/users');
    }
}

module.exports = new UsersPage();