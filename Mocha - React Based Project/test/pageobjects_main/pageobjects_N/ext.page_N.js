const assert = require('assert');
const { $ } = require('@wdio/globals')
const Page = require('../page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ExtPageN extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("div[class='mantine-datatable mantine-datatable-with-border dark:bg-dark']");
    }

    // Getters for Create Ext
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
        return $("select[name='type']");
    }
    get extTypeWebSelect () {
        return $("select[name='type'] option[value='0']");
    }
    get callWaitingWeb () {
        return $("select[name='call_waiting']");
    }
    get callWaitingWebSelect () {
        return $("select[name='call_waiting'] option[value='enabled']");
    }
    get sideClick () {
        return $("div[class='panel w-1/2']");
    }
    get createBtn () {
        return $("//button[@type='submit' and contains(text(), 'Create')]");
    }

    // Getters for adding Ext to a User
    get extension () {
        return $(".css-19bb58m");
    }
    get extensionValue () {
        return $("span[child-key='999']");
    }
    get searchBar () {
        return $("(//input[@placeholder='Search...'])[2]");
    }
    get editBtn () {
        return $("svg[class='lucide lucide-pencil']");
    }
    get saveBtn () {
        return $("button[class='btn btn-outline-success ']");
    }

    // Getters for Delete Ext
    get deleteBtn () {
        return $("svg[class='lucide lucide-trash2']");
    }
    get confirm () {
        return $("button[class='btn btn-primary btn-confirm ltr:ml-4 rtl:mr-4']");
    }


    // Getters for inner assertions
    get errorFields () {
        return $$("div[class='has-error input-group']"); // For All other fields
    }
    get errorTextName () {
        return $("(//div[@class='text-danger !mt-1'])[1]"); 
    }
    get errorTextNumber () {
        return $("(//div[@class='text-danger !mt-1'])[2]"); 
    }
    get errorTextType () {
        return $("(//div[@class='text-danger'])[1]"); 
    }
    get errorTextCall () {
        return $("(//div[@class='text-danger'])[2]"); 
    }
    get alertIcon () {
        return $$("svg.lucide-circle-alert.text-danger");
    }
    
    // Async methods to wait until a specific element on the page is visible or present
    async waitForPageLoad() {
        await browser.waitUntil(async () => {
            return await this.table.waitForDisplayed();
        });
    }
   
    // Async methods to encapsule automation code to interact with the page
    async createExtWebBefore (name, number) { 
        await this.newExt.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.name.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.number.setValue(number);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extTypeWebSelect.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.callWaitingWebSelect.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await browser.execute((el) => el.click(), await this.createBtn);
        await browser.pause(7000); // Pause for 7 seconds to observe
    }      

    async addExtToAUserN (search) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.editBtn.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.extension.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extensionValue.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await browser.execute((el) => el.click(), await this.saveBtn);
    } 

    async createExtWithEmptyFields () { 
        await this.newExt.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.name.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.number.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extTypeWeb.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.sideClick.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.callWaitingWeb.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.sideClick.click();
        // Assertion: Check that each empty field element is present in the DOM
        const emptyFields = await this.errorFields;  
            console.log('Number of empty fields in General tab:', emptyFields.length); 
        for (const field of emptyFields) {
            await expect(field).toBeDisplayed(); 
        }
        // Assertion: Check that the text Name is required is present under 'Ext Name' field
        const requiredTextName = await this.errorTextName;  
            //console.log('Text under Name:', requiredTextName)  
        await expect(requiredTextName).toBeDisplayed(); 
        await expect(requiredTextName).toHaveText('Extension Name is required');
        // Assertion: Check that the text Number is required is present under 'Ext Number' field
        const requiredTextNumber = await this.errorTextNumber;  
            //console.log('Text under Name:', requiredTextName)  
        await expect(requiredTextNumber).toBeDisplayed(); 
        await expect(requiredTextNumber).toHaveText('Extension Number is required');
        // Assertion: Check that the text Type is required is present under 'Type of Ext' field
        const requiredTextType = await this.errorTextType;  
            //console.log('Text under Name:', requiredTextName)  
        await expect(requiredTextType).toBeDisplayed(); 
        await expect(requiredTextType).toHaveText('Type of Extension is required');
        // Assertion: Check that the text Call is required is present under 'Call Waiting' field
        const requiredTextCall = await this.errorTextCall;  
            //console.log('Text under Name:', requiredTextName)  
        await expect(requiredTextCall).toBeDisplayed(); 
        await expect(requiredTextCall).toHaveText('Call Waiting is required');
        // Assertion: Check that the alert Icon is present in the 'Name', 'Number', 'Type' and 'Call Waiting' fields
        const errorIcon = await this.alertIcon;  
            console.log('Alert icon displayed:', errorIcon.length); 
        for (const field of errorIcon) {
            await expect(field).toBeDisplayed(); 
        }
    }

    async createExtWithExistingNameAndNumber (name, number) {
        await this.newGroup.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.name.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.number.setValue(number);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.createBtn.click();
        // Assertion: Check that each empty field element is present in the DOM
        const emptyFields = await this.errorFields;  
            console.log('Number of error fields in General tab:', emptyFields.length); 
        for (const field of emptyFields) {
            await expect(field).toBeDisplayed(); 
        }
        // Assertion: Check that the text 'Extension name is taken' is present under 'Ext Name' field
        const requiredTextName = await this.errorTextName;  
            //console.log('Text under Name:', requiredTextName)  
        await expect(requiredTextName).toBeDisplayed(); 
        await expect(requiredTextName).toHaveText('Extension name is taken');
        // Assertion: Check that the text 'Extension number is taken' is required is present under 'Ext Number' field
        const requiredTextNumber = await this.errorTextNumber;  
            //console.log('Text under Name:', requiredTextName)  
        await expect(requiredTextNumber).toBeDisplayed(); 
        await expect(requiredTextNumber).toHaveText('Extension number is taken');
        // Assertion: Check that the alert Icon is present in the 'Name', 'Number', 'Type' and 'Call Waiting' fields
        const errorIcon = await this.alertIcon;  
            console.log('Alert icon displayed:', errorIcon.length); 
        for (const field of errorIcon) {
            await expect(field).toBeDisplayed(); 
        }
    }

    async deleteAssignExtToAUser (name, number) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.deleteBtn.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.confirm.click();
    }

    // Overwrite specific options to adapt it to page object
    open () {
        return super.open('settings/extension');
    }
}

module.exports = new ExtPageN();