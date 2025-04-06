const { $ } = require('@wdio/globals')
const Page = require('../../page');
const assert = require('assert');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class StatusPage extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("div[class='panel']");
    }

    // Getters for Create Status
    get newStatus() {
        return $("button[class='btn btn-outline-outline-primary ltr:ml-auto mr-10']");
    }
    get name() {
        return $("input[id='name']");
    }
    get icon() {
        return $("div[class='flex items-center gap-2 w-full']");
    }
    get iconSelect() {
        return $("svg[class='lucide lucide-aarrow-down shrink-0  undefined']");
    }
    
    // Getters for Edit Status
    get editBtn () {
        return $("svg[class='lucide lucide-pencil']");
    }
    get editBtnQucikView () {
        return $("svg[class='lucide lucide-pencil ml-2 w-5 h-5 text-primary']");
    }
    get iconSelectEdit() {
        return $("svg[class='lucide lucide-air-vent shrink-0  undefined']");
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
    get closeQuickView () {
        return $("button.mantine-Drawer-close[data-variant='subtle']");
    }

    // Getters for Delete Status
    get deleteBtn () {
        return $("svg[class='lucide lucide-trash2']");
    }
    get yesButton () {
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
    get quickViewRowInactive() {
        return $("tr[class='m_4e7aa4fd mantine-Table-tr mantine-datatable-row disabled']"); 
    }
    
    // Async methods to wait until a specific element on the page is visible or present
    async waitForPageLoad() {
        await browser.waitUntil(async () => {
            return await this.table.waitForDisplayed();
        });
    }

    // Async methods to encapsule automation code to interact with the page
    // Create new Status
    async createStatus (name) { 
        await this.newStatus.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.name.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.icon.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.iconSelect.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.createBtn.scrollIntoView({ block: 'center', behavior: 'smooth' });
        await this.createBtn.waitForClickable();
        await this.createBtn.click();
    }

    async editStatusQuickView (name) { 
        await this.editBtnQucikView.click(); 
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.name.click(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.name.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.icon.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.iconSelectEdit.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.type.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.callPermissuions.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.activeToggle.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.createBtn.scrollIntoView({ block: 'center', behavior: 'smooth' });
        await this.createBtn.waitForClickable();
        await this.createBtn.click();
    }

    async editStatus () { 
        await this.closeQuickView.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.editBtn.click(); 
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.activeToggle.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.createBtn.scrollIntoView({ block: 'center', behavior: 'smooth' });
        await this.createBtn.waitForClickable();
        await this.createBtn.click();
    }

    async deleteStatus () { 
        await this.deleteBtn.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.yesButton.click(); 
        await browser.pause(500); // Pause for 0,5 seconds to observe
    }

    async searchStatus (search) {
        await this.searchBar.setValue(search);
    }

    async openQeickView () {
        await this.quickViewRow.click(); 
    }

    async openQeickViewInactive () {
        await this.quickViewRowInactive.click(); 
    }

    // Overwrite specific options to adapt it to page object
    open () {
        return super.open('settings/general/status');
    }
}

module.exports = new StatusPage();
