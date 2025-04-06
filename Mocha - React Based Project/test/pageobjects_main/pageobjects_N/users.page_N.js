const assert = require('assert');
const { $ } = require('@wdio/globals')
const Page = require('../page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class UsersPageN extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("div[class='panel']");
    }

    // Getters for Create User Admin - WEB
    get newUser () {
        return $("button[class='btn btn-outline-info ']");
    }
    get userName () {
        return $("input[id='name']");
    }
    get userEmail () {
        return $("input[id='email']");
    }
    get userPhone () {
        return $("input[id='phone']");
    }
    get activeToggle () {
        return $("input.custom_switch");
    }
    get extTypeWeb () {
        return $("select[name='type'] option[value='0']");
    }
    get extTypeSip () {
        return $("select[name='type'] option[value='1']");
    }
    get extension () {
        return $("div[class=' css-19bb58m']");
    }
    get extensionValueWeb () {
        return $("span[child-key='111']");
    }
    get extensionValueSip () {
        return $("span[child-key='113']");
    }
    get levelAdmin () {
        return $("select[name='level_id'] option[value='2']"); // Admin
    }
    get roleAdmin () {
        return $("//select[@name='role_id']/option[normalize-space(text())='Default Admin']"); // Default Admin
    }
    
    // Getters for empty Fields
    get extType () {
        return $("select[name='type']");
    }
    get level() {
        return $("select[name='level_id']"); 
    }
    get role () {
        return $("select[name='role_id']"); 
    }
    get pageClick () {
        return $("div[class='space-y-5 p-5']"); 
    }

    // Getters for Delete User 
    get searchBar () {
        return $("(//input[@placeholder='Search...'])[2]");
    }
    get deleteBtn () {
        return $("svg[class='lucide lucide-trash2']"); 
    }
    get confirmBtn () {
        return $("button[class='btn btn-primary btn-confirm ltr:ml-4 rtl:mr-4']"); 
    }

    // Getters for Reusable locators for all methods
    get createBtn () {
        return $("button[class='btn btn-outline-success ']");
    }
    
    // Getters for inner assertions
    get errorFields () {
        return $$("div[class='has-error input-group']"); // For All other fields
    }
    get errorTextName () {
        return $("(//div[@class='text-danger !mt-1'])[1]"); 
    }
    get errorTextEmail () {
        return $("(//div[@class='text-danger !mt-1'])[2]"); 
    }
    get errorTextExtType () {
        return $("(//div[@class='text-danger'])[1]"); 
    }
    get errorTextExtension () {
        return $("(//div[@class='text-danger mt-1'])[1]"); 
    }
    get errorTextLevel () {
        return $("(//div[@class='text-danger'])[2]"); 
    }
    get errorTextRole () {
        return $("(//div[@class='text-danger'])[3]"); 
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
    // Create new User
    async createUserBefore (name, email, phone) { 
        await this.newUser.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.userName.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.userEmail.setValue(email);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.userPhone.setValue(phone);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.activeToggle.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extTypeSip.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extension.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extensionValueSip.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.levelAdmin.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.roleAdmin.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.createBtn.doubleClick();
    }

    async createUserWithMissingFields () { 
        await this.newUser.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.userName.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.userEmail.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extType.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.level.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.role.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.pageClick.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        // Assertion: Check that the alert Icon is present in the 'Name' field and 'Email' field
        const errorIcon = await this.alertIcon;  
            console.log('Alert icon displayed:', errorIcon.length); 
        for (const field of errorIcon) {
            await expect(field).toBeDisplayed(); 
        }
        // Assertion: Check that each empty field element is present in the DOM
        const emptyFields = await this.errorFields;  
            console.log('Number of empty fields:', emptyFields.length); 
        for (const field of emptyFields) {
            await expect(field).toBeDisplayed(); 
        }
        // Assertion: Check that the error text is present under 'Name' field
        const errorTextName = await this.errorTextName;  
            console.log('"Name is required" fields under Name:', errorTextName)  
        await expect(errorTextName).toBeDisplayed(); 
        await expect(errorTextName).toHaveText('Name is required');
        // Assertion: Check that the error text is present under 'Email' field
        const errorTextEmail = await this.errorTextEmail;  
            console.log('"Email is required" fields under Email:', errorTextEmail)  
        await expect(errorTextEmail).toBeDisplayed(); 
        await expect(errorTextEmail).toHaveText('Email is required');
        // Assertion: Check that the error text is present under 'Ext.Type' field
        const errorTextExtType = await this.errorTextExtType;  
            console.log('"Ext. Type is required" fields under Ext.Type:', errorTextExtType)  
        await expect(errorTextExtType).toBeDisplayed(); 
        await expect(errorTextExtType).toHaveText('Ext. Type is required');
        // Assertion: Check that the error text is present under 'Level' field
        const errorTextLevel = await this.errorTextLevel;  
            console.log('"Level is required" fields under Level:', errorTextLevel)  
        await expect(errorTextLevel).toBeDisplayed(); 
        await expect(errorTextLevel).toHaveText('Level is required');
        // Assertion: Check that the error text is present under 'Role' field
        const errorTextRole = await this.errorTextRole;  
            console.log('"Role is required" fields under Role:', errorTextRole)  
        await expect(errorTextRole).toBeDisplayed(); 
        await expect(errorTextRole).toHaveText('Role is required');
        await this.extTypeWeb.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extension.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.pageClick.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        // Assertion: Check that the error text is present under 'Extension' field
        const errorTextExtension = await this.errorTextExtension;  
            console.log('"Extension is required" fields under Extension:', errorTextExtension)  
        await expect(errorTextExtension).toBeDisplayed(); 
        await expect(errorTextExtension).toHaveText('Extension is required');
        // Assertion: Check that the Create Btn is dissabled 
        const isDisabled = await this.createBtn.getAttribute('disabled'); 
            console.log('Dissabled Btn:', isDisabled); 
        assert.ok(isDisabled, 'The button is not disabled as expected');
    }
    
    async createUserWithExistingNameAndEmail (name, email, phone) {
        await this.newUser.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.userName.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.userEmail.setValue(email);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.userPhone.setValue(phone);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.activeToggle.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extTypeWeb.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extension.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.extensionValueWeb.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.levelAdmin.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.roleAdmin.click()
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.createBtn.moveTo();
        await browser.execute((el) => el.click(), await this.createBtn);
        // Assertion: Check that each empty field element is present in the DOM
        const emptyFields = await this.errorFields;  
            console.log('Number of error fields:', emptyFields.length); 
        for (const field of emptyFields) {
            await expect(field).toBeDisplayed(); 
        }
        // Assertion: Check that the alert Icen is present in the 'Name' field and 'Email' field
        const errorIcon = await this.alertIcon;  
            console.log('Alert icon displayed:', errorIcon.length); 
        for (const field of errorIcon) {
            await expect(field).toBeDisplayed(); 
        }
        // To change тхем after the fix!!
        // Assertion: Check that the error text is present under 'Name' field
        const errorTextName = await this.errorTextName;  
            console.log('"Name is required" fields under Name:', errorTextName)  
        await expect(errorTextName).toBeDisplayed(); 
        await expect(errorTextName).toHaveText('The name already exists');
        // Assertion: Check that the error text is present under 'Email' field
        const errorTextEmail = await this.errorTextEmail;  
            console.log('"Email is required" fields under Email:', errorTextEmail)  
        await expect(errorTextEmail).toBeDisplayed(); 
        await expect(errorTextEmail).toHaveText('The email address already exists');
    }

    async deleteUser (search) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.deleteBtn.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.confirmBtn.waitForDisplayed();
        await this.confirmBtn.click();
    }

    // Overwrite specific options to adapt it to page object
    open () {
        return super.open('settings/users');
    }
}

module.exports = new UsersPageN();