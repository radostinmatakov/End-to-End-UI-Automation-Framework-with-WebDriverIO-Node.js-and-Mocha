const assert = require('assert');
const { $ } = require('@wdio/globals')
const Page = require('../page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class StatusPageN extends Page {
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
    
    // Reusible getters for all 
    get createBtn () {
        return $("button[class='btn btn-outline-success ']");
    }
    
    // Getters for inner assettions 
    get errorName () {
        return $("div[class='has-error input-group']"); 
    }
    get errorIcon () {
        return $("div[class='has-error input-group w-full']"); 
    }
    get errorTextName () {
        return $("div[class='text-danger !mt-1']"); 
    }
    get errorTextsIcon () {
        return $("div[class='text-danger mt-1']");
    }
    get alertIcon () {
        return $("svg.lucide-circle-alert.text-danger");
    }

    // Async methods to wait until a specific element on the page is visible or present
    async waitForPageLoad() {
        await browser.waitUntil(async () => {
            return await this.table.waitForDisplayed();
        });
    }
   
    // Async methods to encapsule automation code to interact with the page
    async createStatusWithEmptyFields () { 
        await this.newStatus.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.createBtn.scrollIntoView({ block: 'center', behavior: 'smooth' });
        await this.createBtn.waitForClickable();
        await this.createBtn.click();
        // Assertion: Check that each empty field element is present in the DOM
        const emptyName = await this.errorName;  
            console.log('Name empty field:', emptyName); 
        await expect(emptyName).toBeDisplayed(); 
        const emptyIcon = await this.errorIcon;  
            console.log('Icon empty field:', emptyIcon); 
        await expect(emptyIcon).toBeDisplayed();
        // Assertion: Check that the text Please fill the name field is present under 'Role Name' field
        const requiredTextName = await this.errorTextName;  
            console.log('Text under Name:', requiredTextName)  
        await expect(requiredTextName).toBeDisplayed(); 
        await expect(requiredTextName).toHaveText('Name is required');
        // Assertion: Check that the text Please fill the name field is present under 'Role Name' field
        const requiredTextLevel = await this.errorTextsIcon;  
            console.log('Text under Icon:', requiredTextLevel)  
        await expect(requiredTextLevel).toBeDisplayed(); 
        await expect(requiredTextLevel).toHaveText('Icon is required'); 
    }

    async createStatusWithExistingName (name) { 
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
        // Assertion: Check that each empty field element is present in the DOM
        const emptyName = await this.errorName;  
            console.log('Name empty field:', emptyName); 
        await expect(emptyName).toBeDisplayed(); 
        // Assertion: Check that the text 'Status with this name already exists' is present under 'Role Name' field
        const requiredTextName = await this.errorTextName;  
            console.log('Text under Name:', requiredTextName)  
        await expect(requiredTextName).toBeDisplayed(); 
        await expect(requiredTextName).toHaveText('Status with this name already exists');
    }

    // Overwrite specific options to adapt it to page object
    open () {
        return super.open('settings/general/status');
    }
}

module.exports = new StatusPageN();