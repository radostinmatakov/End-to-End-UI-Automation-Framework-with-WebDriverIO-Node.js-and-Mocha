const assert = require('assert');
const { $ } = require('@wdio/globals')
const Page = require('../page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class GroupsPageN extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("div[class='mantine-datatable mantine-datatable-with-border dark:bg-dark']");
    }

    // Getters for Create Groups
    get newGroup () {
        return $("button[class='btn btn-outline-primary ']");
    }
    get name () {
        return $("input[id='name']");
    }
    get sideClick () {
        return $("div[class='panel w-full']");
    }
    get createBtn () {
        return $("//button[@type='submit' and contains(text(), 'Create')]");
    }
    
    // Getters for inner assertions
    get errorFields () {
        return $("div[class='has-error input-group']"); 
    }
    get errorTextName () {
        return $("div[class='text-danger !mt-1']"); 
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
    async createGroupWithEmptyFields () { 
        await this.newGroup.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.name.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.sideClick.click();
       // Assertion: Check that each empty field element is present in the DOM
        const emptyField = await this.errorFields;  
            //console.log('Text under Name:', emptyField)  
        await expect(emptyField).toBeDisplayed();
        // Assertion: Check that the text Name is required is present under 'Group Name' field
        const requiredTextName = await this.errorTextName;  
            //console.log('Text under Name:', requiredTextName)  
        await expect(requiredTextName).toBeDisplayed(); 
        await expect(requiredTextName).toHaveText('Name is required');
        // Assertion: Check that the alert Icen is present in the 'Name' field
        const errorIcon = await this.alertIcon;  
            console.log('Alert icon displayed:', errorIcon); 
        await expect(errorIcon).toBeDisplayed(); 
        // Assertion: Check that the Create Btn is dissabled 
        const isDisabled = await this.createBtn.getAttribute('disabled'); 
            console.log('Dissabled Btn:', isDisabled); 
        assert.ok(isDisabled, 'The button is not disabled as expected');
    }

    async createGroupWithExistingNameAndEmail (name) {
        await this.newGroup.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.name.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.createBtn.click();
       // Assertion: Check that each empty field element is present in the DOM
        const emptyField = await this.errorFields;  
            //console.log('Text under Name:', emptyField)  
        await expect(emptyField).toBeDisplayed();
        // Assertion: Check that the text 'The name has already been taken.' is present under 'Group Name' field
        const requiredTextName = await this.errorTextName;  
            //console.log('Text under Name:', requiredTextName)  
        await expect(requiredTextName).toBeDisplayed(); 
        await expect(requiredTextName).toHaveText('The name has already been taken.');
        // Assertion: Check that the alert Icen is present in the 'Name' field
        const errorIcon = await this.alertIcon;  
            console.log('Alert icon displayed:', errorIcon); 
        await expect(errorIcon).toBeDisplayed(); 
        // Assertion: Check that the Create Btn is dissabled 
        const isDisabled = await this.createBtn.getAttribute('disabled'); 
            console.log('Dissabled Btn:', isDisabled); 
        assert.ok(isDisabled, 'The button is not disabled as expected');
    }

    // Overwrite specific options to adapt it to page object
    open () {
        return super.open('settings/groups');
    }
}

module.exports = new GroupsPageN();