const { $ } = require('@wdio/globals')
const Page = require('../../page');
const assert = require('assert');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ExtPage extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("div[class='mantine-datatable mantine-datatable-with-border dark:bg-dark']");
    }

    // Getters for Ext - WEB
    get newExt () {
        return $("button[class='btn btn-outline-outline-primary ltr:ml-auto mr-10']");
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
        return $("svg[class='lucide lucide-plus cursor-pointer text-success']");
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
        return $("span[child-key='1011']");
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

    // Getters for Edit Ext
    get editBtn () {
        return $("svg[class='lucide lucide-pencil']");
    }
    get inboundExternalEdit () {
        return $("select[name='rec_type_inb_ext'] option[value='yes']");
    }
    get outboundExternalEdit () {
        return $("select[name='rec_type_out_ext'] option[value='yes']");
    }

    // Getters for Delete Ext
    get deleteBtn () {
        return $("svg[class='lucide lucide-trash2']");
    }
    get confirm () {
        return $("button[class='btn btn-primary btn-confirm ltr:ml-4 rtl:mr-4']");
    }

    // Reusible getters for all 
    get createBtn () {
        return $("button[class='btn btn-outline-primary ']");
    }
    get searchBar () {
        return $("(//input[@placeholder='Search...'])[2]");
    }
    get quickViewRow() {
        return $("tr[class='m_4e7aa4fd mantine-Table-tr mantine-datatable-row']"); 
    }
    get saveBtn () {
        return $("button[class='btn btn-outline-success ']");
    }
    get callerId () {
        return $("div[class=' css-19bb58m']");
    }
    get callerIdSelect () {
        return $("span[child-key='447441910836']");
    }

    // Getters for inner assettions 
    
    // Async methods to wait until a specific element on the page is visible or present
    async waitForPageLoad() {
        await browser.waitUntil(async () => {
            return await this.table.waitForDisplayed();
        });
    }
    
    // Async methods to encapsule automation code to interact with the page
    // Create new Group
    async createExtWeb (name, number) { 
        await this.newExt.click();
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
        await browser.pause(7000); // Pause for Success message to be detected
    }      
    
    async addExtToAGroup (search, searchTwo) { 
        await this.searchBar.setValue(search);
        await browser.pause(1000); // Pause for 1 second to observe
        await this.editBtn.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.searchBar.setValue(searchTwo);
        await this.addAgent.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await browser.execute((el) => el.click(), await this.saveBtn);
    } 

    async addExtToAUser (search) { 
        await this.searchBar.setValue(search);
        await browser.pause(2000); // Pause for 2 seconds to observe
        await this.editBtn.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.extension.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extensionValue.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await browser.execute((el) => el.click(), await this.saveBtn);
    } 

    async createExtSip (name, number) { 
        await this.newExt.click();
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
        await browser.pause(7000); // Pause for Success message to be detected 
    } 

    async editExt (search, name_edit) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.editBtn.click();
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
        const activeToggle = await this.advanceToggle;
        await browser.execute((el) => el.click(), activeToggle);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.inboundExternalEdit.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.outboundExternalEdit.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await browser.execute((el) => el.click(), await this.createBtn);
    }  

    async removeExtFromUser (search) { 
        await this.searchBar.setValue(search);
        await browser.pause(200); // Pause for 2 seconds to observe
        await this.editBtn.click()
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

    async openQeickView () {
        await this.quickViewRow.click(); 
    }

    // Overwrite specific options to adapt it to page object
    open () {
        return super.open('settings/extensions');
    }
}

module.exports = new ExtPage();