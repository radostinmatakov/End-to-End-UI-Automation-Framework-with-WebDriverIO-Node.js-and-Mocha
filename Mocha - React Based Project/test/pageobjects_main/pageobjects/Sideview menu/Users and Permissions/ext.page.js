const { $ } = require('@wdio/globals')
const Page = require('../../../page');
const assert = require('assert');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ExtPage extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("svg[class='lucide lucide-trash2']");
    }

    // Getters for Ext - WEB
    get addExt () {
        return $("//button[contains(@class, 'btn') and text()='+ Add Extension']");
    }
    get name () {
        return $("input[id='name']");
    }
    get number () {
        return $("input[id='id']");
    }
    get extTypeWeb () {
        return $("select[name='type'] option[value='0']");
    }
    get callWaitingWeb () {
        return $("select[name='call_waiting'] option[value='enabled']");
    }
    get advanceToggle () {
        return $('input[name="advanced_options"]');
    }
    get inboundExternalWeb () {
        return $("select[name='rec_type_inb_ext'] option[value='dontcare']");
    }
    get outboundExternalWeb () {
        return $("select[name='rec_type_out_ext'] option[value='dontcare']");
    }

    // Getters for adding Ext to a Group
    get addAgent () {
        return $("svg[class='lucide lucide-plus cursor-pointer ']");
    }

    // Getters for adding Ext to a User
    get extension () {
        return $(".css-19bb58m");
    }
    get extensionValue () {
        return $("span[child-key='1000']");
    }

    // Getters for remove Ext from a User
    get extension () {
        return $(".css-19bb58m");
    }
    get extensionValueRemove () {
        return $("span[child-key='522']");
    }

    // Getters for Ext - SIP
    get extTypeSip () {
        return $("select[name='type'] option[value='1']");
    }
    get callWaitingSip () {
        return $("select[name='call_waiting'] option[value='disabled']");
    }
    get inboundExternalSip () {
        return $("select[name='rec_type_inb_ext'] option[value='never']");
    }
    get outboundExternalSip () {
        return $("select[name='rec_type_out_ext'] option[value='never']");
    }

    // Getters for Edit Web Ext
    get inboundExternalEdit () {
        return $("select[name='rec_type_inb_ext'] option[value='yes']");
    }
    get outboundExternalEdit () {
        return $("select[name='rec_type_out_ext'] option[value='yes']");
    }

    // Getters for Edit Sip Ext
    get viewSecret () {
        return $("svg[class='lucide lucide-eye h-5 w-5']");
    }
    get refreshPass () {
        return $("svg[class='lucide lucide-refresh-cw h-5 w-5']");
    }
    get copyPass () {
        return $("svg[class='lucide lucide-copy h-5 w-5']");
    }

    // Getters for Delete Ext
    get deleteBtn () {
        return $("svg[class='lucide lucide-trash2']");
    }
    get confirm () {
        return $("button[class='btn btn-primary btn-confirm ltr:ml-4 rtl:mr-4']");
    }

    // Reusible getters for all 
    get searchBar () {
        return $("input[placeholder='Search...']");
    }
    get searchBarTwo () {
        return $("(//input[@placeholder='Search...'])[2]");
    }
    get opneEditSideview () {
        return $('tr[class="m_4e7aa4fd mantine-Table-tr mantine-datatable-row"]');
    }
    get createBtn () {
        return $("//button[contains(@class, 'btn') and text()='Create']");
    }
    get saveBtn () {
        return $("//button[contains(@class, 'btn') and text()='Save']");
    }
    get callerId () {
        return $("div[class='css-19bb58m']");
    }
    get callerIdSelect () {
        return $("span[child-key='447441910836']");
    }
    get closeSwal2 () {
        return $("button[class='swal2-close']");
    }
    get notifyMessage() {
        return $('#swal2-title');
    }

    // Getters for inner assertions
    get passwordField() {
        return $('input[name="secret"]'); 
    }
    
    // Async methods to wait until a specific element on the page is visible or present
    async waitForPageLoad() {
        await browser.waitUntil(async () => {
            return await this.table.waitForDisplayed();
        });
    }
    
    // Async methods to encapsule automation code to interact with the page
    // Create new Group
    async createExtWeb (name, number) { 
        await this.addExt.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.name.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.number.setValue(number);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extTypeWeb.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.callWaitingWeb.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle = await this.advanceToggle;
        await browser.execute((el) => el.click(), activeToggle);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.inboundExternalWeb.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.outboundExternalWeb.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await browser.execute((el) => el.click(), await this.createBtn);
    }      
    
    async addExtToAGroup (search, searchTwo) { 
        await this.searchBar.setValue(search);
        await browser.pause(1000); // Pause for 1 second to observe
        await this.opneEditSideview.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.searchBarTwo.setValue(searchTwo);
        await this.addAgent.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await browser.execute((el) => el.click(), await this.saveBtn);
    } 

    async addExtToAUser (search) { 
        await this.searchBar.setValue(search);
        await browser.pause(2000); // Pause for 2 seconds to observe
        await this.opneEditSideview.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.extension.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extensionValue.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await browser.execute((el) => el.click(), await this.saveBtn);
    } 

    async createExtSip (name, number) { 
        await this.addExt.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.name.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.number.setValue(number);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extTypeSip.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.callWaitingSip.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.callerId.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.callerIdSelect.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle = await this.advanceToggle;
        await browser.execute((el) => el.click(), activeToggle);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.inboundExternalSip.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.outboundExternalSip.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await browser.execute((el) => el.click(), await this.createBtn); 
    } 

    async editWebExt (search, name_edit) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.opneEditSideview.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.name.doubleClick(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.name.setValue(name_edit);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.callerId.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.callerIdSelect.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.inboundExternalEdit.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.outboundExternalEdit.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await browser.execute((el) => el.click(), await this.saveBtn);
    }  

    async editSipExt (search, name_edit) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.opneEditSideview.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.name.doubleClick(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.name.setValue(name_edit);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const passwordType = await this.passwordField.getAttribute('type');
        expect(passwordType).toBe('password');
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.viewSecret.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const passwordTypeTwo = await this.passwordField.getAttribute('type');
        expect(passwordTypeTwo).toBe('text');
        await browser.pause(300); // Pause for 0,3 seconds to observe
        // Get the initial value of the input field (whatever it is)
        const initialValue = await passwordField.getValue();
        console.log(`Initial Value: ${initialValue}`);  // Log the initial value
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.refreshPass.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        // Wait for the value to change
        await browser.waitUntil(
            async () => (await inputField.getValue()) !== initialValue,
            {
            timeout: 5000,
            timeoutMsg: 'Input value did not change within the expected time.'
            }
        );
        // Get the new value after clicking
        const newValue = await inputField.getValue();
        console.log(`New Value: ${newValue}`);  // Log the new value
        // Assert that the new value is different from the initial value
        assert.notStrictEqual(newValue, initialValue, 'The new value should be different from the initial value.');
        await this.callerId.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.callerIdSelect.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.inboundExternalEdit.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.outboundExternalEdit.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await browser.execute((el) => el.click(), await this.saveBtn);
    }  

    async removeExtFromUser (search) { 
        await this.searchBar.setValue(search);
        const userCell = await $(`td.mantine-Table-td=${global.usersNameExt}`);
        await userCell.waitForDisplayed();
        await this.opneEditSideview.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.extension.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extensionValueRemove.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await browser.execute((el) => el.click(), await this.saveBtn);
    }  

    async deleteExt (search) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.deleteBtn.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.confirm.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
    }  

    async searchExt (search) { 
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

    // Used in before hooks
    async deleteExtBefore (search) { 
        await this.searchBar.setValue(search);
        await this.deleteBtn.click();
        await this.confirm.click();
    }  
    async isExtPresent() {
        const noDataElem = await $("//div[contains(@class, 'mantine-Text-root') and text()='No data available']");
        const isDisplayed = await noDataElem.isDisplayed().catch(() => false);
        return !isDisplayed;
    }

    // Overwrite specific options to adapt it to page object
    open () {
        return super.open('settings/extensions');
    }
}

module.exports = new ExtPage();