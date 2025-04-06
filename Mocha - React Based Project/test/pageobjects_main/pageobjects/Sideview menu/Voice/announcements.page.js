const { $, $$ } = require('@wdio/globals')
const Page = require('../../../page.js');
const assert = require('assert');
const Locators = require('../../../../helpers/locators.js')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AnnouncementPage extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("svg[class='lucide lucide-trash2']");
    }

    // Getters for Create Announcements
    get addAnn () {
        return $("//button[contains(@class, 'btn') and text()='+ Add Announcement']");
    }
    get desc () {
        return $('input[id="description"]');
    }
    get audio () {
        return $('(//div[@class="css-19bb58m"])[1]');
    }
    get audioSelect () {
        return $('span[child-key="default1"]');
    }
    get destination () {
        return $('(//input[@role="combobox" and @type="text" and @autocomplete="off"])[2]');
    }
    get destinationSelect () {
        return $('(//input[@role="combobox" and @type="text" and @autocomplete="off"])[3]');
    }
    

    // Getters for Edit Announcements
    get opneEditSideview () {
        return $('tr[class="m_4e7aa4fd mantine-Table-tr mantine-datatable-row"]');
    }
    get descEdit () {
        return $('input[id="description"]');
    }
   
    // Getters for Delete Announcements
    get delete () {
        return $('svg[class="lucide lucide-trash2"]');
    }
    get deleteConfirm () {
        return $('button[class="btn btn-primary btn-confirm ltr:ml-4 rtl:mr-4"]');
    }

    // Reusible getters for all 
    get createBtn () {
        return $("//button[contains(@class, 'btn') and text()='Create']");
    }
    get saveBtn () {
        return $("//button[contains(@class, 'btn') and text()='Save']");
    }
    get searchBar () {
        return $('input[placeholder="Search..."]');
    }
    get closeSwal2 () {
        return $("button[class='swal2-close']");
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
    async createAnn (desc, input, inputTwo) {
        await this.addAnn.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.desc.setValue(desc)
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.audio.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.audioSelect.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.destination.setValue(input);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.keys(['Enter']);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.destinationSelect.setValue(inputTwo);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.keys(['Enter']);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.createBtn.waitForClickable();
        await this.createBtn.click();
    }

    async editAnn (search, desc) {
        await this.searchBar.setValue(search);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.opneEditSideview.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.descEdit.click(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.descEdit.setValue(desc);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.saveBtn.waitForClickable();
        await this.saveBtn.click();
    }

    async deleteAnn (search) {
        await this.searchBar.setValue(search);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.delete.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.deleteConfirm.click();
    }

    async searchAnn (search) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
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
        return super.open('settings/announcements');
    }
}

module.exports = new AnnouncementPage();