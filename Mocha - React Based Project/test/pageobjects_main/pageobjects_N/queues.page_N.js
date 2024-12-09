const { $ } = require('@wdio/globals')
const Page = require('../page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class QueuesPageN extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("div[class='panel']");
    }

    // Getter for scroll into View
    get header () {
        return $("div[class*='bg-white'][class*='justify-between']");
    }
    
    // Getters for Create Queues
    get createBtn () {
        return $('a[class="btn btn-outline-primary ltr:ml-auto mr-10"]');
    }
    // General tab
    get name () {
        return $('input[name="name"]');
    }
    get number () {
        return $('input[name="id"]');
    }
    get maxWaitTime () {
        return $('(//div[@class=" input-group"])[4]');
    }
    get maxWaitTimeValue () {
        return $('span[child-key="1"]');
    }
    get agentTimeout () {
        return $('(//div[@class=" input-group"])[5]');
    }
    get agentTimeoutValue () {
        return $('span[child-key="2"]');
    }
    // Callback tab
    get callbackTab () {
        return $('button[role="tab"]:nth-of-type(4)');
    }
    get callbackToggle () {
        return $('input[name="callback_enabled"]');
    }
    
    // Reusible getters for all 
    get saveBtn () {
        return $('button[class="btn btn-outline-primary "]');
    }

    // Getters for inner assettions 
    get errorFields () {
        return $$("div[class='has-error input-group']"); // For All other fields
    }
    get errorSingleFields () {
        return $("div[class='has-error input-group']"); // For Agent Timeout field and Name field 
    }
    get nameFieldError () {
        return $("");
    }
    get numberFieldError () {
        return $("div[class='has-error input-group ']");
    }
    get errorText () {
        return $("div[class='text-danger !mt-1']"); // For Name field
    }
    get textError () {
        return $("div[class='text-danger mt-1']"); // For Number field and Agent Timeout field
    }
    get errorTexts () {
        return $$("div[class='text-danger mt-1']"); // For All other fields
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
   // Create new Queue
    async createQWithEmptyFields () {
        await this.createBtn.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        // General tab
        await this.saveBtn.scrollIntoView({ block: 'center', behavior: 'smooth' });
        await this.saveBtn.waitForClickable();
        await this.saveBtn.click();
        // Assertion: Check that each empty field element is present in the DOM
        const emptyFields = await this.errorFields;  
            //console.log('Number of empty fields in General tab:', emptyFields.length); 
        for (const field of emptyFields) {
            await expect(field).toBeDisplayed(); 
        }
        // Assertion: Check that the text Required is present under 'Name' field
        const requiredText = await this.errorText;  
            //console.log('Required" fields under Name:', requiredText)  
        await expect(requiredText).toBeDisplayed(); 
        await expect(requiredText).toHaveText('Required');
        // Assertion: Check that each empty field element has Required under it
        const requiredTexts = await this.errorTexts;  
            //console.log('Number of "Required" fields:', requiredTexts.length); 
        for (const texts of requiredTexts) {
            await expect(texts).toBeDisplayed(); 
            await expect(texts).toHaveText('Required');
        }
        // Assertion: Check that the alert Icen is present in the 'Name' field
        const alertIcon = await this.alertIcon;   
        await expect(alertIcon).toBeDisplayed();
            //console.log('Alert icon displayed:', alertIcon) 
    }

    async createQWithExistingNameAndNumber (name, number) {
        await this.createBtn.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        // General tab
        await this.name.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.number.setValue(number);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.saveBtn.scrollIntoView({ block: 'center', behavior: 'smooth' });
        await this.saveBtn.waitForClickable();
        await this.saveBtn.click();
        // Assertion: Check that Name field has error message
        const requiredName = await this.errorText;   
        await expect(requiredName).toBeDisplayed(); 
        await expect(requiredName).toHaveText('Queue name is taken');
            //console.log('Name error fields text:', requiredText);
        // Assertion: Check that Name field has error message for field in the DOM
        const errorName = await this.errorSingleFields;  
        await expect(errorName).toBeDisplayed(); 
            //console.log('Number error fields:', errorField);
        // Assertion: Check that Number field has error message
        const requiredNumber = await this.textError;   
        await expect(requiredNumber).toBeDisplayed(); 
        await expect(requiredNumber).toHaveText('Queue number is taken');
            //console.log('Number error fields text:', requiredText);
        // Assertion: Check that Number field has error message for field in the DOM
        const errorField = await this.numberFieldError;  
        await expect(errorField).toBeDisplayed(); 
            //console.log('Number error fields:', errorField);
        // Assertion: Check that the alert Icen is present in the 'Name' field
        const alertIcon = await this.alertIcon;   
        await expect(alertIcon).toBeDisplayed();
            //console.log('Alert icon displayed:', alertIcon)
    }

    async createQCallbackTab () {
        await this.createBtn.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        // General tab
        await this.maxWaitTime.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.maxWaitTimeValue.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.agentTimeout.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.agentTimeoutValue.click();
        // Assertion: Check that Agent Timeout field has error message for field in the DOM
        const errorFields = await this.errorSingleFields;  
            //console.log('Timeout error fields:', errorFields); 
        await expect(errorFields).toBeDisplayed(); 
        // Assertion: Check that Agent Timeout field has error message
        const requiredText = await this.textError;   
        await expect(requiredText).toBeDisplayed(); 
        await expect(requiredText).toHaveText('Agent Timeout must be less or equal than the maximum waiting time');
            //console.log('Timeout error fields text:', requiredText);
        // Advance tab
        const headerHeightTwo = await this.header.getSize('height');
        // Use the advanceTab getter to perform the scroll
        await browser.execute((headerHeightTwo, selector) => {
            const element = document.querySelector(selector);
            if (element) {
                const rect = element.getBoundingClientRect();
                const elementPosition = rect.top + window.scrollY; // Get element's position
                const scrollPosition = elementPosition - headerHeightTwo; // Adjust for header height
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth' // Smooth scroll
                });
            }
        }, headerHeightTwo, 'button[role="tab"]:nth-of-type(3)'); // Use the CSS selector directly here
        await this.callbackTab.waitForClickable({ timeout: 5000 });
        await this.callbackTab.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle = await this.callbackToggle;
        await browser.execute((el) => el.click(), activeToggle);
        await this.saveBtn.scrollIntoView({ block: 'center', behavior: 'smooth' });
        await this.saveBtn.waitForClickable();
        await this.saveBtn.click();
        // Assertion: Check that each empty field element is present in the DOM
        const emptyFieldsCall = await this.errorFields;  
            //console.log('Number of empty fields in callvack:', emptyFieldsCall.length); 
        for (const field of emptyFieldsCall) {
            await expect(field).toBeDisplayed(); 
        }
        // Assertion: Check that each empty field element has Field is required under it
        const requiredTextsCall = await this.errorTexts;  
            //console.log('Number of "Field is required" fields:', requiredTextsCall.length); 
        for (const texts of requiredTextsCall) {
            await expect(texts).toBeDisplayed(); 
            await expect(texts).toHaveText('Field is required');
        }
    }

    // Overwrite specific options to adapt it to page object
    open () {
        return super.open('settings/voice/queues');
    }
}

module.exports = new QueuesPageN();
