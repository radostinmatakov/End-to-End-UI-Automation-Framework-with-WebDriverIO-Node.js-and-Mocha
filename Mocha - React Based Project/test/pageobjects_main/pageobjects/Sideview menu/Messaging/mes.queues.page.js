const { $, $$ } = require('@wdio/globals')
const Page = require('../../../page');
const Locators = require('../../../../helpers/locators.js')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MessQueuesPage extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("svg[class='lucide lucide-copy']");
    }

    // Getter for scroll into View
    get header () {
        return $("div[class*='bg-white'][class*='justify-between']");
    }
    
    // Getters for Create Messaging Queues
    // General tab
    get addQueue () {
        return $("//button[contains(@class, 'btn') and text()='+ New Queue']");
    }
    get generalTab () {
        return $('(//button[@role="tab"])[1]');
    }
    get number () {
        return $('input[id="id"]');
    }
    get name () {
        return $('input[id="queue_name"]');
    }
    get maxWaitingTime () {
        return $('select[name="max_wait_time"] option[value="1"]');
    }
    get agentTimeout () {
        return $('select[name="agent_timeout"] option[value="1"]');
    }
    get serviceLevel () {
        return $('select[name="sla"] option[value="2"]');
    }
    get chatDestribution () {
        return $('(//div[@class="css-19bb58m"])[1]');
    }
    get chatDestributionSelect () {
        return $('span[child-key="all"]');
    }
    get autoFill () {
        return $('select[name="autofill"] option[value="1"]');
    }

    // Users tab
    get usersTab () {
        return $('button[role="tab"]:nth-of-type(2)');
    }
    get addExt () {
        return $('svg[class="lucide lucide-plus cursor-pointer "]');
    }
    get searchBarAllUsers () {
        return $('(//input[@placeholder="Search..."])[2]');
    }

    // Getters for Edit Messaging Queue
    // General tab
    get opneEditSideview () {
        return $('tr[class="m_4e7aa4fd mantine-Table-tr mantine-datatable-row"]');
    }
    get nameEdit () {
        return $('input[id="queue_name"]');
    }
    get maxWaitingTimeEdit () {
        return $('select[name="max_wait_time"] option[value="10"]');
    }
    get agentTimeoutEdit () {
        return $('select[name="agent_timeout"] option[value="8"]');
    }
    get serviceLevelEdit () {
        return $('select[name="sla"] option[value="6"]');
    }
    get chatDestributionSelectEdit () {
        return $('span[child-key="random"]');
    }
    get autoFillEdit () {
        return $('select[name="autofill"] option[value="0"]');
    }
    // Users tab
    get removeExt () {
        return $('svg[class="lucide lucide-x cursor-pointer"]');
    }

    // Getters for Copy Messaging Queue
    get copy () {
        return $('svg[class="lucide lucide-copy"]');
    }
    get nameCopy () {
        return $('input[name="queue_name"]');
    }
    get numberCopy () {
        return $('input[id="id"]');
    }
  
    // Getters for Disable Messaging Queue
    get disable () {
        return $('svg[class="lucide lucide-circle-x"]');
    }

    // Getters for Enable Messaging Queue
    get enable () {
        return $('svg[class="lucide lucide-power"]');
    }
    
    // Getters for Delete Messaging Queue
    get delete () {
        return $('svg[class="lucide lucide-trash2"]');
    }
    get deleteConfirm () {
        return $('button[class="btn btn-primary ltr:ml-4 rtl:mr-4"]');
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
    get disableEnableConfirm () {
        return $('button[class="btn btn-primary btn-confirm ltr:ml-4 rtl:mr-4"]');
    }
    get closeSwal2 () {
        return $("button[class='swal2-close']");
    }
    get notifyMessage() {
        return $('#swal2-title');
    }
    get statusToggle () {
        return $('input[name="active"]');
    }
    get closeSideview () {
        return $("(//*[name()='svg'][@class='lucide lucide-x'])[3]");
    }

    // Getters for inner assettions 
    get agentElement() {
        return $$("(//div[contains(@class, 'space-y-2')])[2]//div[contains(@class, 'cursor-move')]");
    }

    // Async methods to wait until a specific element on the page is visible or present
    async waitForPageLoad() {
        await browser.waitUntil(async () => {
            return await this.table.waitForDisplayed();
        });
    }
   
    // Async methods to encapsule automation code to interact with the page
    async createMesQueue (name, number, agent) {
        await this.addQueue.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        // General tab
        await this.name.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.number.setValue(number);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle = await this.statusToggle;
        await browser.execute((el) => el.click(), activeToggle);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.maxWaitingTime.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.agentTimeout.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.serviceLevel.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.chatDestribution.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.chatDestributionSelect.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.autoFill.click();                   
        await browser.pause(500); // Pause for 0,3 seconds to observe
        // User tab
        const headerHeight = await this.header.getSize('height');
        // Use the agentTab getter to perform the scroll
        await browser.execute((headerHeight, selector) => {
            const element = document.querySelector(selector);
            if (element) {
                const rect = element.getBoundingClientRect();
                const elementPosition = rect.top + window.scrollY; // Get element's position
                const scrollPosition = elementPosition - headerHeight; // Adjust for header height
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth' // Smooth scroll
                });
            }
        }, headerHeight, 'button[role="tab"]:nth-of-type(2)'); // Use the CSS selector directly here
        await this.usersTab.waitForClickable({ timeout: 5000 });
        await this.usersTab.click();
        await browser.pause(500); // Pause for 0,3 seconds to observe
        await this.addExt.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.addExt.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.searchBarAllUsers.setValue(agent);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.addExt.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.createBtn.waitForClickable();
        await this.createBtn.click();
    }

    async editMesQueue (search, name_edit) {
        await this.searchBar.setValue(search);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.opneEditSideview.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        // General tab
        await this.nameEdit.click(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.nameEdit.setValue(name_edit);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle = await this.statusToggle;
        await browser.execute((el) => el.click(), activeToggle);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.maxWaitingTimeEdit.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.agentTimeoutEdit.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.serviceLevelEdit.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.chatDestribution.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.chatDestributionSelectEdit.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.autoFillEdit.click();              
        await browser.pause(500); // Pause for 0,3 seconds to observe
        // Agent tab
        const headerHeight = await this.header.getSize('height');
        // Use the agentTab getter to perform the scroll
        await browser.execute((headerHeight, selector) => {
            const element = document.querySelector(selector);
            if (element) {
                const rect = element.getBoundingClientRect();
                const elementPosition = rect.top + window.scrollY; // Get element's position
                const scrollPosition = elementPosition - headerHeight; // Adjust for header height
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth' // Smooth scroll
                });
            }
        }, headerHeight, 'button[role="tab"]:nth-of-type(2)'); // Use the CSS selector directly here
        await this.usersTab.waitForClickable({ timeout: 5000 });
        await this.usersTab.click();
        await browser.pause(500); // Pause for 0,3 seconds to observe
        await this.removeExt.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        // Assertion: Verify that an element in the Agent tab is displayed
        const agentElements = await this.agentElement; 
            console.log('Mes. Queues Number(edit) of Agents:', agentElements.length);
        for (const element of agentElements) {
            await expect(element).toBeDisplayed(); // Assert each element is visible
        }
        await this.saveBtn.waitForClickable();
        await this.saveBtn.click();
    }

    async copyQueue (search, name_copy, number) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.copy.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        // General tab
        await this.nameCopy.click(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.nameCopy.setValue(name_copy);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.numberCopy.setValue(number);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle = await this.statusToggle;
        await browser.execute((el) => el.click(), activeToggle);
        await this.autoFill.click();                   
        await browser.pause(500); // Pause for 0,3 seconds to observe
        // Agent tab
        const headerHeight = await this.header.getSize('height');
        // Use the agentTab getter to perform the scroll
        await browser.execute((headerHeight, selector) => {
            const element = document.querySelector(selector);
            if (element) {
                const rect = element.getBoundingClientRect();
                const elementPosition = rect.top + window.scrollY; // Get element's position
                const scrollPosition = elementPosition - headerHeight; // Adjust for header height
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth' // Smooth scroll
                });
            }
        }, headerHeight, 'button[role="tab"]:nth-of-type(2)'); // Use the CSS selector directly here
        await this.usersTab.waitForClickable({ timeout: 5000 });
        await this.usersTab.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        // Assertion: Verify that an element in the Agent tab is displayed
        const agentElements = await this.agentElement; 
            console.log('Mes. Queues Number(Copy) of Agents:', agentElements.length);
        for (const element of agentElements) {
            await expect(element).toBeDisplayed(); // Assert each element is visible
        }
        await this.saveBtn.waitForClickable();
        await this.saveBtn.click();
    }

    async searchQueue (search) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
    }

    async clearSearch () {
        await this.searchBar.click(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
    }

    async disableMesQueue (search) {
        await this.searchBar.setValue(search);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.disable.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.disableEnableConfirm.click();
    }

    async enableQueue (search) {
        await this.searchBar.setValue(search);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.enable.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.disableEnableConfirm.click();
    }

    async deleteQueue (search) {
        await this.searchBar.setValue(search);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.delete.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.deleteConfirm.click();
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

    async closeSideviewMenu () {
        await this.closeSideview.click(); 
    }

    // Used in before hooks
    async disableDeleteMesQueue (search, message) {
        await this.searchBar.setValue(search);
        await this.disable.click();
        await this.disableEnableConfirm.click();
        await this.notifyMessage.waitForDisplayed();
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
        await this.closeSwal2.click();
        await this.delete.click();
        await this.deleteConfirm.click();
    }

    async isQueuePresent(queueNum) {
        const noDataElem = await $("//div[contains(@class, 'mantine-Text-root') and text()='No data available']");
        const isNoDataDisplayed = await noDataElem.isDisplayed().catch(() => false);
        return !isNoDataDisplayed;  // If the "No data available" message is not displayed, queue exists
    }

    // Overwrite specific options to adapt it to page object
    open () {
        return super.open('settings/messaging/queues');
    }
}

module.exports = new MessQueuesPage();