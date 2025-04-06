const { $ } = require('@wdio/globals')
const Page = require('../../page');
const assert = require('assert');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class BlacklistPage extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("div[class='panel']");
    }

    // Getters for Create Blacklist
    get newBlacklist() {
        return $("(//button[@class='btn btn-outline-primary '])[2]");
    }
    get country() {
        return $("div[class=' css-hlgwow']");
    }
    get countrySelect() {
        return $("span[child-key='BG']");
    }
    get phoneNumber() {
        return $("input[name='phone_number']");
    }
    get blacklistType () {
        return $("select[name='blacklist_type'] option[value='2']");
    }
    
    // Getters for Edit Blacklist
    get editBtn () {
        return $("svg[class='lucide lucide-pencil']");
    }
    get blacklistTypeEdit () {
        return $("select[name='blacklist_type'] option[value='1']");
    }

    // Getters for Delete Blacklist
    get deleteBtn () {
        return $("svg[class='lucide lucide-trash2']");
    }
    get yesButton () {
        return $("(//button[@class='btn btn-outline-primary '])[3]");
    }

    // Getters for view Deleted Blacklists
    get viewDeleted () {
        return $("button[class='btn btn-outline-warning ']");
    }
    get yesButton () {
        return $("(//button[@class='btn btn-outline-primary '])[3]");
    }
   
    // Getters for Reusable locators for all methods
    get description() {
        return $("input[name='description']");
    }
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
    async createBlacklist (name) { 
     
    }

    async editBlacklistQuickView (name) { 
       
    }

    async editStatus () { 
        
    }

    async deleteBlacklist () { 
    
    }

    async viewDeletedBlacklists () { 
    
    }

    async searchBlacklist (search) {
        await this.searchBar.setValue(search);
    }

    async openQeickView () {
        await this.quickViewRow.click(); 
    }

    

    // Overwrite specific options to adapt it to page object
    open () {
        return super.open('settings/security/blacklist');
    }
}

module.exports = new BlacklistPage();
