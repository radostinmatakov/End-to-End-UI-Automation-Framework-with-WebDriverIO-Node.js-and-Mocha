const { $ } = require('@wdio/globals')
const Page = require('../../../page');
const assert = require('assert');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class BlacklistPage extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("svg[class='lucide lucide-trash2']");
    }

    // Getters for Create Blacklist
    get addBlacklist() {
        return $("//button[contains(@class, 'btn') and text()='+ Add Blacklist']");
    }
    get country() {
        return $("div[class='css-19bb58m']");
    }
    get countrySelect() {
        return $("span[child-key='BG']");
    }
    get phoneNumber() {
        return $("input[name='phone_number']");
    }
    get description() {
        return $("input[id='description']");
    }
    
    // Getters for Edit Blacklist
    get blacklistTypeEdit () {
        return $("select[name='blacklist_type'] option[value='1']");
    }
    
    // Getters for Delete Blacklist
    get deleteBtn () {
        return $("svg[class='lucide lucide-trash2']");
    }

    // Getters for view Deleted/Active Blacklists
    get viewBlacklists () {
        return $("button[class='btn btn-outline-warning ']");
    }

    // Getters for Restore Blacklists
    get restore () {
        return $("svg[class='lucide lucide-rotate-ccw']");
    }
   
    // Getters for Reusable locators for all methods
    get description() {
        return $("input[name='description']");
    }
    get searchBar () {
        return $("input[placeholder='Search...']");
    }
    get createBtn () {
        return $("//button[contains(@class, 'btn') and text()='Create']");
    }
    get saveBtn () {
        return $("//button[contains(@class, 'btn') and text()='Save']");
    }
    get opneEditSideview () {
        return $('tr[class="m_4e7aa4fd mantine-Table-tr mantine-datatable-row"]');
    }
    get closeSwal2 () {
        return $("button[class='swal2-close']");
    }
    get notifyMessage() {
        return $('#swal2-title');
    }
    get yesButton () {
        return $("//button[contains(@class, 'btn') and text()='Yes']");
    }
    
    // Async methods to wait until a specific element on the page is visible or present
    async waitForPageLoad() {
        await browser.waitUntil(async () => {
            return await this.table.waitForDisplayed();
        });
    }

    // Async methods to encapsule automation code to interact with the page
    // Create new Status
    async createBlacklist (phone, desc) { 
        await this.addBlacklist.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.country.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.countrySelect.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.phoneNumber.setValue(phone);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.description.setValue(desc);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.execute((el) => el.click(), await this.createBtn);
    }

    async createBlacklistWhenItsDeleted (phone, desc, message) { 
        await this.addBlacklist.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.country.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.countrySelect.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.phoneNumber.setValue(phone);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.description.setValue(desc);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.execute((el) => el.click(), await this.createBtn);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.waitForSuccessMessage({ timeout: 40000 });
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.yesButton.click()
    }

    async editBlacklist (search, descEdit) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.opneEditSideview.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.description.doubleClick(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.description.setValue(descEdit);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.blacklistTypeEdit.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.execute((el) => el.click(), await this.saveBtn);
    }

    async deleteBlacklist (search) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.deleteBtn.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.yesButton.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
    }

    async viewDeletedBlacklists () { 
        await this.viewBlacklists.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
    }

    async restoreBlacklists (search) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.restore.click()
    }

    async viewActiveBlacklists () { 
        await this.viewBlacklists.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
    }

    async searchBlacklist (search) {
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
        return super.open('settings/security/blacklist');
    }
}

module.exports = new BlacklistPage();
