const { $, $$ } = require('@wdio/globals')
const Page = require('../../../page.js');
const assert = require('assert');
const Locators = require('../../../../helpers/locators.js');
const { input } = require('../../../../data/TestConfig.js');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class TimeConditionsPage extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("svg[class='lucide lucide-trash2']");
    }

    // Getters for Create Time Conditions
    get addTc () {
        return $("//button[contains(@class, 'btn') and text()='+ Add Time Condition']");
    }
    get name () {
        return $('input[id="displayname"]');
    }
    get audioIfTrue () {
        return $('(//div[@class="css-19bb58m"])[4]');
    }
    get audioIfTrueSelect () {
        return $('span[child-key="macro-hangupcall"]');
    }
    get audioIfTrueTwo () {
        return $('(//div[@class="css-19bb58m"])[5]');
    }
    get audioIfTrueSelectTwo () {
        return $('span[child-key="hangup"]');
    }
    get audioIfFalse () {
        return $('(//input[@role="combobox" and @type="text" and @autocomplete="off"])[6]');
    }
    get audioIfFalseSelect () {
        return $('(//input[@role="combobox" and @type="text" and @autocomplete="off"])[7]');
    }
    get addAdditionalTc () {
        return $('svg[class="lucide lucide-circle-plus"]');
    }
    get timeGroup () {
        return $('(//input[@role="combobox" and @type="text" and @autocomplete="off"])[4]');
    }
    get from () {
        return $('(//input[@role="combobox" and @type="text" and @autocomplete="off"])[5]');
    }
    get to () {
        return $('(//input[@role="combobox" and @type="text" and @autocomplete="off"])[6]');
    }
    get startDate () {
        return $('input[id="start_date"]');
    }
    get startDateSelect () {
        return $('span[class="flatpickr-day today"]');
    }
    get endDate () {
        return $('input[id="end_date"]');
    }
    get endDateSelect () {
        return $('span[class="flatpickr-day today"]');
    }

    // Getters for Edit Time Conditions
    get opneEditSideview () {
        return $('tr[class="m_4e7aa4fd mantine-Table-tr mantine-datatable-row"]');
    }
    get nameEdit () {
        return $('input[id="displayname"]');
    }
   
    // Getters for Delete Time Conditions
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
    async createTc (name, input, inputTwo) { 
        await this.addTc.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.name.setValue(name)
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.audioIfTrue.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.audioIfTrueSelect.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.audioIfTrueTwo.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.audioIfTrueSelectTwo.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.audioIfFalse.setValue(input);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.keys(['Enter']);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.audioIfFalseSelect.setValue(inputTwo);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.keys(['Enter']);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.createBtn.waitForClickable();
        try {
            await this.createBtn.click();
        } catch (error) {
            throw new Error(`Failed to click the save button: ${error.message}`);
        }
    }

    async editTc (search, name, timeGr, range, rangeTwo) { // TO DO 
        await this.searchBar.setValue(search);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.opneEditSideview.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.nameEdit.click(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.nameEdit.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.addAdditionalTc.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.timeGroup.setValue(timeGr);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.keys(['Enter']);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.from.setValue(range);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.keys(['Enter']);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.to.setValue(rangeTwo);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.keys(['Enter']);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.startDate.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.startDateSelect.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.endDate.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.endDateSelect.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.saveBtn.waitForClickable();
        try {
            await this.saveBtn.click();
        } catch (error) {
            throw new Error(`Failed to click the save button: ${error.message}`);
        }
    }

    async deleteTc (search) { // TO DO 
        await this.searchBar.setValue(search);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.delete.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.deleteConfirm.click();
    }

    async searchTc (search) {
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
        return super.open('settings/voice/timecondition');
    }
}

module.exports = new TimeConditionsPage();