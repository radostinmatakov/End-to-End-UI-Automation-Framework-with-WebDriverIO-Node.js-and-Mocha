const assert = require('assert');
const { $ } = require('@wdio/globals')
const Page = require('../page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class RolesPageN extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("div[class='panel mt-2.5']");
    }
    
    // Getters for Create Role
    get createBtn () {
        return $("button[class='btn btn-outline-info ']");
    }
    get roleName () {
        return $("input[id='name']");
    }
    get selectLevel () {
        return $("select[name='level_id'] option[value='2']");
    }

    // Getters for Delete Role
    get deleteBtn () {
        return $("svg[class='lucide lucide-trash2']");
    } 
    get selectRole () {
        return $("div[class='css-19bb58m']");
    }
    get selectRoleValue () {
        return $("div[class='css-d7l1ni-option']");
    }
    get moveBtn () {
        return $("button[class='btn btn-outline-primary ']");
    }
    get confirm () {
        return $("button[class='btn btn-primary btn-confirm ltr:ml-4 rtl:mr-4']");
    }
    
    // Reusible getters for all 
    get create () {
        return $("button[class='btn btn-outline-success ']");
    }
    get searchBar () {
        return $("(//input[@placeholder='Search...'])[2]");
    }

    // Getters for inner assettions 
    get errorFields () {
        return $$("div[class='has-error input-group']"); // For All other fields
    }
    get errorField () {
        return $("div[class='has-error input-group']"); // For createRoleWithExistingName
    }
    get errorTextName () {
        return $("div[class='text-danger !mt-1']"); 
    }
    get errorTextsLevel () {
        return $("div[class='text-danger mt-1']");
    }
    get reassignRolePanel () {
        return $("div[class='p-5']");
    }
    get alertIcon () {
        return $("svg.lucide-circle-alert.text-danger");
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
    async createRoleWithEmptyFields () { 
        await this.createBtn.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.create.scrollIntoView({ block: 'center', behavior: 'smooth' });
        await this.create.waitForClickable();
        await this.create.click();
        // Assertion: Check that each empty field element is present in the DOM
        const emptyFields = await this.errorFields;  
            //console.log('Number of empty fields:', emptyFields.length); 
        for (const field of emptyFields) {
            await expect(field).toBeDisplayed(); 
        }
        // Assertion: Check that the text Please fill the name field is present under 'Role Name' field
        const requiredTextName = await this.errorTextName;  
            //console.log('Text under Name:', requiredTextName)  
        await expect(requiredTextName).toBeDisplayed(); 
        await expect(requiredTextName).toHaveText('Please fill the name field');
        // Assertion: Check that the text Please fill the name field is present under 'Role Name' field
        const requiredTextLevel = await this.errorTextsLevel;  
            //console.log('Text under Level:', requiredTextLevel)  
        await expect(requiredTextLevel).toBeDisplayed(); 
        await expect(requiredTextLevel).toHaveText('Level is required'); 
    }

    async createRoleWithExistingName (name) { 
        await this.createBtn.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.roleName.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.selectLevel.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.create.scrollIntoView({ block: 'center', behavior: 'smooth' });
        await this.create.waitForClickable();
        await this.create.click();
        // Assertion: Check that each empty field element is present in the DOM
        const emptyField = await this.errorField;  
            //console.log('Number of empty fields:', emptyField); 
        await expect(emptyField).toBeDisplayed(); 
        // Assertion: Check that the text 'The name has already been taken.' is present under 'Role Name' field
        const requiredTextName = await this.errorTextName;  
            //console.log('Text under Name:', requiredTextName)  
        await expect(requiredTextName).toBeDisplayed(); 
        await expect(requiredTextName).toHaveText('The name has already been taken.');
        // Assertion: Check that the alert Icen is present in the 'Name' field and 'Email' field
        const errorIcon = await this.alertIcon;  
            //console.log('Alert icon displayed:', errorIcon); 
        await expect(errorIcon).toBeDisplayed(); 
    }

    async deleteRoleWhenAssigned_N (search) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.deleteBtn.click(); 
        await browser.pause(300); // Pause for 0,3 seconds to observe
        // Assertion: Check that the panel for reassigning a Role is present
        const reassigning = await this.reassignRolePanel;  
            //console.log('Panel:', reassigning)  
        await expect(reassigning).toBeDisplayed(); 
    }

    async deleteRole_N (search, message) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.deleteBtn.click(); 
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.selectRole.click(); 
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.selectRoleValue.click(); 
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.moveBtn.click(); 
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.notifyMessage.waitForDisplayed();
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
        await this.confirm.waitForDisplayed();
        await this.confirm.click();
    }

    // Overwrite specific options to adapt it to page object
    open () {
        return super.open('settings/roles');
    }
}

module.exports = new RolesPageN();