const { $, $$ } = require('@wdio/globals')
const Page = require('../../../page');
const assert = require('assert');
const Locators = require('../../../../helpers/locators.js')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class IVRPage extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("svg[class='lucide lucide-trash2']");
    }

    // Getters for Create IVR
    // Global settings tab
    get addIVR () {
        return $("//button[contains(@class, 'btn') and text()='+ Add IVR']");
    }
    get name () {
        return $('input[id="name"]');
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
    get timeout () {
        return $('(//div[@class="css-19bb58m"])[2]');
    }
    get timeoutSelect () {
        return $('span[child-key="1"]');
    }
    get timeoutRec () {
        return $('(//div[@class="css-19bb58m"])[3]');
    }
    get timeoutRecSelect () {
        return $('span[child-key="baki_baki_ni_ore"]');
    }
    get timeoutDest () {
        return $('(//div[@class="css-19bb58m"])[4]');
    }
    get timeoutDestSelect () {
        return $('span[child-key="macro-hangupcall"]');
    }
    get timeoutDestTwo () {
        return $('(//div[@class="css-19bb58m"])[5]');
    }
    get timeoutDestSelectTwo () {
        return $('span[child-key="hangup"]');
    }
    get invalid () {
        return $('(//div[@class="css-19bb58m"])[6]');
    }
    get invalidSelect () {
        return $('span[child-key="7"]');
    }
    get invalidRec () {
        return $('(//div[@class="css-19bb58m"])[7]');
    }
    get invalidRecSelect () {
        return $('span[child-key="erika"]');
    }
    get invalidDest () {
        return $('(//input[@role="combobox" and @type="text" and @autocomplete="off"])[8]');
    }
    get invalidDestTwo () {
        return $('(//input[@role="combobox" and @type="text" and @autocomplete="off"])[9]');
    }
    // Menu Option tab
    get addDest () {
        return $('button[class="btn btn-primary"]');
    }
    get number () {
        return $('select[name="entries.1.selection"] option[value="2"]');
    }
    get dest () {
        return $('(//div[@class="css-19bb58m"])[1]');
    }
    get destSelect () {
        return $('span[child-key="macro-hangupcall"]');
    }
    get destOption () {
        return $('(//div[@class="css-19bb58m"])[2]');
    }
    get destOptionSelect () {
        return $('span[child-key="hangup"]');
    }
    get destTwo () {
        return $('(//input[@role="combobox" and @type="text" and @autocomplete="off"])[3]'); 
    }
    get destOptionTwo () {
        return $('(//input[@role="combobox" and @type="text" and @autocomplete="off"])[4]');
    }

    // Getters for Edit IVR
    // Global settings tab
    get opneEditSideview () {
        return $('tr[class="m_4e7aa4fd mantine-Table-tr mantine-datatable-row"]');
    }
    get nameEdit () {
        return $('input[name="name"]');
    }
    get descEdit () {
        return $('input[id="description"]');
    }
    get toggle () {
        return $('input[name="directdial"]');
    }
    // Menu Option tab
    get removeDest () {
        return $("(//form[@action='#']//*[name()='svg'])[6]");
    }

    // Getters for Copy IVR
    get copy () {
        return $('svg[class="lucide lucide-copy"]');
    }
    get nameCopy () {
        return $('input[name="name"]');
    }

    // Getters for Delete IVR
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
    get menuTab () {
        return $('//button[contains(@class, "block") and @role="tab" and text()="Menu Options"]');
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
    async createIVR (name, desc, input, inputTwo, inputThree, inputFour) {
        await this.addIVR.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        // Global settings tab
        await this.name.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.desc.setValue(desc);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.audio.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.audioSelect.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.timeout.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.timeoutSelect.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.timeoutRec.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.timeoutRecSelect.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.timeoutDest.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.timeoutDestSelect.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.timeoutDestTwo.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.timeoutDestSelectTwo.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.invalid.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.invalidSelect.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.invalidRec.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.invalidRecSelect.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.invalidDest.setValue(input);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.keys(['Enter']);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.invalidDestTwo.setValue(inputTwo);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.keys(['Enter']);
        // Menu Option tab
        await this.menuTab.click();
        await browser.pause(500); // Pause for 0,3 seconds to observe
        await this.addDest.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.number.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.dest.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.destSelect.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.destOption.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.destOptionSelect.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.destTwo.setValue(inputThree);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.keys(['Enter']);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.destOptionTwo.setValue(inputFour);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.keys(['Enter']);
        await this.createBtn.waitForClickable();
        await this.createBtn.click();
    }

    async editIVR (search, name, desc) {
        await this.searchBar.setValue(search);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.opneEditSideview.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        // Global settings tab
        await this.nameEdit.click(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.nameEdit.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.descEdit.click(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.descEdit.setValue(desc);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle = await this.toggle;
        await browser.execute((el) => el.click(), activeToggle);
        // Menu Option tab
        await this.menuTab.click();
        await browser.pause(500); // Pause for 0,3 seconds to observe
        await this.removeDest.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.saveBtn.waitForClickable();
        await this.saveBtn.click();
    }

    async copyIVR (search, name_copy,) {
        await this.searchBar.setValue(search);
        await this.copy.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.nameCopy.click(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.nameCopy.setValue(name_copy);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.createBtn.waitForClickable();
        await this.createBtn.click();
    }

    async deleteIVR (search) {
        await this.searchBar.setValue(search);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.delete.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.deleteConfirm.click();
    }

    async searchIVR (search) {
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
        return super.open('settings/ivr');
    }
}

module.exports = new IVRPage();