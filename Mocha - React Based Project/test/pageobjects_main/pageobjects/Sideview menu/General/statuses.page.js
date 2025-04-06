const { $ } = require('@wdio/globals')
const Page = require('../../../page');
const assert = require('assert');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class StatusPage extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("svg[class='lucide lucide-trash2']");
    }

    // Getters for Create Status
    get newStatus() {
        return $("//button[contains(@class, 'btn') and text()='+ Add Status']");
    }
    get name() {
        return $("input[id='name']");
    }
    get icon() {
        return $("div[class='flex items-center gap-2 w-full']");
    }
    get iconSelect() {
        return $("//div[contains(@class, 'cursor-pointer') and @title='AArrowDown']");
    }
    
    // Getters for Edit Status
    get nameEdit() {
        return $("input[id='name']");
    }
    get iconSelectEdit() {
        return $("//div[contains(@class, 'cursor-pointer') and @title='AirVent']");
    }
    get type() {
        return $("//select[@name='type']/option[normalize-space(text())='Work']");
    }
    get callPermissuions() {
        return $("//select[@name='calls_permission']/option[normalize-space(text())='Inbound and Outbound']");
    }
    get activeToggle () {
        return $("input.custom_switch");
    }

    // Getters for Delete Status
    get deleteBtn () {
        return $("svg[class='lucide lucide-trash2']");
    }
    get yesButton () {
        return $("//button[contains(@class, 'btn') and text()='Yes']");
    }

    // Getters for Status header(assertions that is present in the header)
    get header () {
        return $("//span[contains(@class, 'font-semibold') and text()='Available']");
    }

    // Getters for Reusable locators for all methods
    get searchBar () {
        return $("//input[@placeholder='Search...']");
    }
    get searchBarIcon () {
        return $("(//input[contains(@class, 'w-full')])[4]");
    }
    get createBtn () {
        return $("//button[contains(@class, 'btn') and text()='Create']");
    }
    get saveBtn () {
        return $("//button[contains(@class, 'btn') and text()='Save']");
    }
    get closeSwal2 () {
        return $("button[class='swal2-close']");
    }
    get notifyMessage() {
        return $('#swal2-title');
    }
    get opneEditSideview () {
        return $('tr[class="m_4e7aa4fd mantine-Table-tr mantine-datatable-row"]');
    }
    
    // Async methods to wait until a specific element on the page is visible or present
    async waitForPageLoad() {
        await browser.waitUntil(async () => {
            return await this.table.waitForDisplayed();
        });
    }

    // Async methods to encapsule automation code to interact with the page
    // Create new Status
    async createStatus (name, searchIcon) { 
        await this.newStatus.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.name.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.icon.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.searchBarIcon.setValue(searchIcon);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.iconSelect.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.createBtn.waitForClickable();
        await this.createBtn.click();
    }

    async openHeader () { 
        await this.header.waitForClickable();
        await this.header.click();
    }

    async editStatus (search, nameEdit, searchIcon) { 
        await this.searchBar.setValue(search);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.opneEditSideview.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.nameEdit.doubleClick(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.nameEdit.setValue(nameEdit);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.icon.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.searchBarIcon.setValue(searchIcon);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.iconSelectEdit.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.type.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.callPermissuions.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.activeToggle.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        //await this.createBtn.scrollIntoView({ block: 'center', behavior: 'smooth' });
        await this.saveBtn.waitForClickable();
        await this.saveBtn.click();
    }

    async deleteStatus (search) { 
        await this.searchBar.setValue(search);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.deleteBtn.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.yesButton.click(); 
        await browser.pause(500); // Pause for 0,5 seconds to observe
    }

    async searchStatus (search) {
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
        return super.open('settings/general/status');
    }
}

module.exports = new StatusPage();
