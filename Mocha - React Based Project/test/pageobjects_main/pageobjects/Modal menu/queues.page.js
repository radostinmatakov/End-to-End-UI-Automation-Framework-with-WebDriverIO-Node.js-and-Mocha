const { $, $$ } = require('@wdio/globals')
const Page = require('../../page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class QueuesPage extends Page {
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
    // General tab
    get createBtn () {
        return $('a[class="btn btn-outline-primary ltr:ml-auto mr-10"]');
    }
    get generalTab () {
        return $('(//button[@role="tab"])[1]');
    }
    get name () {
        return $('input[name="name"]');
    }
    get number () {
        return $('input[name="id"]');
    }
    get callsDistrubution () {
        return $('(//div[@class="  input-group"])[1]');
    }
    get callsDistrubutionValue () {
        return $('span[child-key="ringall"]');
    }
    get maxWaitTime () {
        return $('(//div[@class="  input-group"])[2]');
    }
    get maxWaitTimeValue () {
        return $('span[child-key="1"]');
    }
    get agentTimeout () {
        return $('(//div[@class="  input-group"])[3]');
    }
    get agentTimeoutValue () {
        return $('span[child-key="0"]');
    }
    get retryTime () {
        return $('(//div[@class="  input-group"])[4]');
    }
    get retryTimeValue () {
        return $('span[child-key="none"]');
    }
    get autoFill () {
        return $('(//div[@class="  input-group"])[5]');
    }
    get autoFillValue () {
        return $('span[child-key="yes"]');
    }
    get destinationNoPickUp () {
        return $('(//div[@class="  input-group"])[6]');
    }
    get destinationNoPickUpValue () {
        return $('span[child-key="macro-hangupcall"]');
    }
    get destinationNoPickUpTwo () {
        return $('(//div[@class=" css-19bb58m"])[7]');
    }
    get destinationNoPickUpTwoValue () {
        return $('span[child-key="hangup"]');
    }
    get musicOnHold () {
        return $('(//div[@class="  input-group"])[8]');
    }
    get musicOnHoldValue () {
        return $('span[child-key="Alien"]');
    }
    get closePlayer () {
        return $('svg[class="lucide lucide-x m-2 cursor-pointer"]');
    }

    // Agents tab
    get agentTab () {
        return $('button[role="tab"]:nth-of-type(2)');
    }
    get addExt () {
        return $('div[class="user-profile"]');
    }
    get searchBarAllExt () {
        return $('(//input[@placeholder="Filter Extensions"])[1]');
    }

    // Getters for Edit Queue
    get edit () {
        return $('svg[class="lucide lucide-pencil"]');
    }

    //General tab
    get nameEdit () {
        return $('input[name="name"]');
    }
    get callsDistrubutionEdit () {
        return $('(//div[@class="  input-group"])[1]');
    }
    get callsDistrubutionValueEdit () {
        return $('span[child-key="linear"]');
    }
    get maxWaitTimeEdit () {
        return $('(//div[@class="  input-group"])[2]');
    }
    get maxWaitTimeValueEdit () {
        return $('span[child-key="12"]');
    }
    get agentTimeoutEdit () {
        return $('(//div[@class="  input-group"])[3]');
    }
    get agentTimeoutValueEdit () {
        return $('span[child-key="9"]');
    }
    get removeMusicOnHold () {
        return $('svg[class="lucide lucide-delete m-2 mt-4 cursor-pointer"]');
    }
    get musicOnHoldEditValue () {
        return $('span[child-key="Blue_Birds"]');
    }

    // Advance tab
    get advanceTab () {
        return $('button[role="tab"]:nth-of-type(3)');
    }
    get agentTimeoutRestart () {
        return $('(//div[@class="  input-group"])[1]');
    }
    get agentTimeoutRestartValue () {
        return $('span[child-key="yes"]');
    }
    get wrapupTime () {
        return $('(//div[@class="  input-group"])[2]');
    }
    get wrapupTimeValue () {
        return $('span[child-key="1"]');
    }
    get skipBusyAgents () {
        return $('(//div[@class="  input-group"])[3]');
    }
    get skipBusyAgentsValue () {
        return $('span[child-key="3"]');
    }
    get announceToggle () {
        return $('input[name="annPos"]');
    }
    get announceQueue () {
        return $('(//input[@autocapitalize="none"])[6]');
    }
    get announceQueueValue () {
        return $('span[child-key="15"]');
    }
    get announceToggle2 () {
        return $('input[name="annHoldTime"]');
    }

    // Getters for Copy Queue
    get copy () {
        return $('svg[class="lucide lucide-copy"]');
    }
    get nameCopy () {
        return $('input[name="name"]');
    }

    // Getters for Disable Queue
    get disable () {
        return $('svg[class="lucide lucide-circle-x"]');
    }

    // Getters for Enable Queue
    get enable () {
        return $('svg[class="lucide lucide-power"]');
    }
    
    // Getters for Delete Queue
    get delete () {
        return $('svg[class="lucide lucide-trash2"]');
    }
    get deleteConfirm () {
        return $('button[class="btn btn-primary ltr:ml-4 rtl:mr-4"]');
    }

    // Reusible getters for all 
    get saveBtn () {
        return $('button[class="btn btn-outline-primary "]');
    }
    get searchBar () {
        return $('(//input[@placeholder="Search..."])[2]');
    }
    get disableEnableConfirm () {
        return $('button[class="btn btn-primary btn-confirm ltr:ml-4 rtl:mr-4"]');
    }

    // Getters for inner assettions 
    get agentElement() {
        return $$('div.mt-4');
    }

    // Async methods to wait until a specific element on the page is visible or present
    async waitForPageLoad() {
        await browser.waitUntil(async () => {
            return await this.table.waitForDisplayed();
        });
    }
   
   // Async methods to encapsule automation code to interact with the page
    async createQueue (name, number, agent) {
        await this.createBtn.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        // General tab
        await this.generalTab.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.name.setValue(name);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.number.setValue(number);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.callsDistrubution.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.callsDistrubutionValue.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.maxWaitTime.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.maxWaitTimeValue.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.agentTimeout.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.agentTimeoutValue.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.retryTime.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.retryTimeValue.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.autoFill.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.autoFillValue.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.destinationNoPickUp.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.destinationNoPickUpValue.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.destinationNoPickUpTwo.click();                    // в момента, понеже има бъг не го намира 19.12 (БЪГ - като цъкнеш в полето за Teminate call системата го отчита все едно е празно и затова не намира локаторите, което пак е бъг)
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.destinationNoPickUpTwoValue.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.musicOnHold.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.musicOnHoldValue.click();
        //await browser.pause(300); // Pause for 0,3 seconds to observe
        //await this.closePlayer.waitForClickable();
        //await this.closePlayer.click();
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
        await this.agentTab.waitForClickable({ timeout: 5000 });
        await this.agentTab.click();
        await browser.pause(500); // Pause for 0,3 seconds to observe
        await this.addExt.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.addExt.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.searchBarAllExt.setValue(agent);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.addExt.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.saveBtn.waitForClickable();
        await this.saveBtn.click();
    }

    async searchCreatedQueue (search) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
    }

    async editQueue (search, name_edit) {
        await this.searchBar.setValue(search);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.edit.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        // General tab
        await this.nameEdit.click(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.nameEdit.setValue(name_edit);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.callsDistrubutionEdit.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.callsDistrubutionValueEdit.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.maxWaitTimeEdit.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.maxWaitTimeValueEdit.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.agentTimeoutEdit.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.agentTimeoutValueEdit.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.removeMusicOnHold.click();                        // в момента, понеже има бъг не го намира 19.12 (БЪГ - не се запаметява music on hold)
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.musicOnHold.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.musicOnHoldEditValue.click();
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
        await this.agentTab.waitForClickable({ timeout: 5000 });
        await this.agentTab.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        // Assertion: Verify that an element in the Agent tab is displayed
        const agentElements = await this.agentElement; 
            console.log('Number(edit) of Agents:', agentElements.length);
        for (const element of agentElements) {
            await expect(element).toBeDisplayed(); // Assert each element is visible
        }
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
        await this.advanceTab.waitForClickable({ timeout: 5000 });
        await this.advanceTab.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.agentTimeoutRestart.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.agentTimeoutRestartValue.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.wrapupTime.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.wrapupTimeValue.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.skipBusyAgents.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.skipBusyAgentsValue.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle = await this.announceToggle;
        await browser.execute((el) => el.click(), activeToggle);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.announceQueue.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.announceQueueValue.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        const activeToggle2 = await this.announceToggle2;
        await browser.execute((el) => el.click(), activeToggle2);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.saveBtn.waitForClickable();
        await this.saveBtn.click();
    }

    async searchEditedQueue (search) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
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
        await this.number.setValue(number);
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
        await this.agentTab.waitForClickable({ timeout: 5000 });
        await this.agentTab.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        // Assertion: Verify that an element in the Agent tab is displayed
        const agentElements = await this.agentElement; 
            console.log('Number(Copy) of Agents:', agentElements.length);
        for (const element of agentElements) {
            await expect(element).toBeDisplayed(); // Assert each element is visible
        }
        await this.saveBtn.waitForClickable();
        await this.saveBtn.click();
    }

    async searchCopiedQueue (search) {
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
    }

    async disableQueue (search, searchTwo) {
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

    // Overwrite specific options to adapt it to page object
    open () {
        return super.open('settings/voice/queues');
    }
}

module.exports = new QueuesPage();