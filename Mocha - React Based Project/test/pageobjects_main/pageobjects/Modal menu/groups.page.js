const { $ } = require('@wdio/globals')
const Page = require('../../page');
const assert = require('assert');


/**
 * sub page containing specific selectors and methods for a specific page
 */
class GroupsPage extends Page {
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
    get desc () {
        return $("input[id='descr']");
    }
    get addAgent () {
        return $("svg[class='lucide lucide-plus cursor-pointer text-success']");
    }
    get removeAgent () {
        return $("svg[class='lucide lucide-x cursor-pointer text-danger']");
    }

    // Getters for Edit Groups
    get editBtn () {
        return $("svg[class='lucide lucide-pencil']");
    }

    // Getters for Delete Groups
    get deleteBtn () {
        return $("svg[class='lucide lucide-trash2']");
    }
    get confirm () {
        return $("button[class='btn btn-primary btn-confirm ltr:ml-4 rtl:mr-4']");
    }

    // Reusible getters for all 
    get createBtn () {
        return $("button[class='btn btn-outline-success ']");
    }
    get searchBar () {
        return $("(//input[@placeholder='Search...'])[2]");
    }
    get quickViewRow() {
        return $("tr[class='m_4e7aa4fd mantine-Table-tr mantine-datatable-row']"); 
    }

    // Getters for inner assettions 
    get container() {
        return $("(//div[@class='space-y-2'])[2]");
    }
    get members() {
        return $("span[class='text-base font-light']");
    }

    // Async methods to wait until a specific element on the page is visible or present
    async waitForPageLoad() {
        await browser.waitUntil(async () => {
            return await this.table.waitForDisplayed();
        });
    }
    
    // Async methods to encapsule automation code to interact with the page
    // Create new Group
    async createGroup (name, desc, search, searchTwo) { 
        await this.newGroup.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.name.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.desc.setValue(desc);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.addAgent.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.searchBar.setValue(search);
        await this.addAgent.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.searchBar.setValue(searchTwo);
        await this.addAgent.click()
        const membersCount = await this.members;
        const actualText = await membersCount.getText();
        assert.strictEqual(actualText.trim(), '3', `Expected text to be "3" but got "${actualText.trim()}"`);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await browser.execute((el) => el.click(), await this.createBtn);
    }       


    async editGroup (search, name_edit, desc_edit) { 
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
        await this.desc.doubleClick(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.desc.setValue(desc_edit);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.removeAgent.click()
        const membersCount = await this.members;
        const actualText = await membersCount.getText();
        assert.strictEqual(actualText.trim(), '2', `Expected text to be "2" but got "${actualText.trim()}"`);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await browser.execute((el) => el.click(), await this.createBtn);
    }  

    async deleteGroup (search) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.deleteBtn.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.confirm.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
    }  

    async searchGroup (search) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
    } 

    async editAssert () { 
        await this.editBtn.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.container.waitForDisplayed({
            timeout: 5000, // Wait up to 5 seconds
            timeoutMsg: 'Main container with class="space-y-2" did not appear.',
        });
        const isDisplayed = await this.container.isDisplayed();
        assert(isDisplayed, 'Main container with class="space-y-2" is not present.');
        const childElements = await this.container.$$('div.cursor-move');
        // Assert that at least two child elements are present
        assert(childElements.length >= 2,
            `Expected at least two child elements with class="cursor-move", but found ${childElements.length}.`
        );
            //console.log(`Number of child elements found: ${childElements.length}`);
    } 

    async openQeickView () {
        await this.quickViewRow.click(); 
    }

    // Overwrite specific options to adapt it to page object
    open () {
        return super.open('settings/groups');
    }
}

module.exports = new GroupsPage();