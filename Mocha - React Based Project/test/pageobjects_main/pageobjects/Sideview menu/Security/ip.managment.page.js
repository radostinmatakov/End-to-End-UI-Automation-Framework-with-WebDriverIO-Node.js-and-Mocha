const { $ } = require('@wdio/globals')
const Page = require('../../../page');
const assert = require('assert');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class IPManagementPage extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad
    get table () {
        return $("svg[class='lucide lucide-pause']");
    }

    // Getters for Create IP
    get ip() {
        return $("input[id='ip']");
    }
    get dateFrom () {
        return $('input[placeholder="firewall.form.validity_date_from"]');
    }
    get dateFromSelect () {
        return $('span[class="flatpickr-day today selected"]');
    }
    get dateFromHour () {
        return $('(//input[@class="numInput flatpickr-hour"])[1]');
    }
    get dateTo () {
        return $('input[placeholder="firewall.form.validity_date_to"]');
    }
    get dateToSelect () {
        return $('span[class="flatpickr-day selected"]');
    }
    get dateToHour () {
        return $('(//input[@class="numInput flatpickr-hour"])[2]');
    }
    get accessLevelIp () {
        return $('div[class="css-19bb58m"]');
    }
    get accessLevelSelectIp () {
        return $("//div[contains(@class, 'css-d7l1ni-option') and text()='Web']");
    }
    
    // Getters for Create GEO IP
    get geoIp() {
        return $("select[name='type'] option[value='GEOIP']");
    }
    get country() {
        return $('(//div[@class="css-19bb58m"])[1]');
    }
    get countrySelect() {
        return $("//div[contains(@class, 'css-10wo9uf-option')]//span[text()='Bulgaria']");
    }
    get dateFrom () {
        return $('input[placeholder="firewall.form.validity_date_from"]');
    }
    get dateTo () {
        return $('input[placeholder="firewall.form.validity_date_to"]');
    }
    get datesSelect () {
        return $('span[class="flatpickr-day today selected"]');
    }
    get accessLevelGeo () {
        return $('(//div[@class="css-19bb58m"])[2]');
    }
    get accessLevelSelectGeo () {
        return $("//div[contains(@class, 'css-10wo9uf-option') and text()='All']");
    }
    
    // Getters for Edit IP
    get accessLevelDelete () {
        return $("(//*[name()='svg'][@class='css-8mmkcg'])[2]");
    }
    get accessLevelIpEdit () {
        return $('div[class="css-19bb58m"]');
    }
    get accessLevelSelectIpEdit () {
        return $("//div[contains(@class, 'css-10wo9uf-option') and text()='Phone']");
    }
    
    // Getters for Edit GEO IP
    get accessLevelGeoEdit () {
        return $('(//div[@class="css-19bb58m"])[2]');
    }
    get accessLevelSelectGeoEdit () {
        return $("//div[contains(@class, 'css-10wo9uf-option') and text()='Ping']");
    }

    // Getters for Deactivate IPs
    get deactivateIps () {
        return $("svg[class='lucide lucide-pause']");
    }

    // Getters for view Inactive/Active IPs
    get viewIps () {
        return $("button[class='btn btn-outline-warning ']");
    }

    // Getters for Restore IPs
    get restore () {
        return $("svg[class='lucide lucide-rotate-ccw']");
    }
   
    // Getters for Reusable locators for all methods
    get addIp() {
        return $("//button[contains(@class, 'btn') and text()='+ Add IP Rule']");
    }
    get description () {
        return $('input[id="description"]');
    }
    get descriptionEdit () {
        return $('input[id="description"]');
    }
    get ingnoreList () {
        return $("select[name='in_ignore_list'] option[value='1']");
    }
    get okayBtn () {
        return $("//button[contains(@class, 'btn') and text()='Okay']");
    }
    get searchBar () {
        return $("input[placeholder='Search...']");
    }
    get createBtn () {
        return $("//button[contains(@class, 'btn') and text()='Create']");
    }
    get saveBtn () {
        return $("//button[contains(@class, 'btn') and text()='Save']");
    }
    get opneEditSideview () {
        return $('tr[class="m_4e7aa4fd mantine-Table-tr mantine-datatable-row"]');
    }
    get closeSwal2 () {
        return $("button[class='swal2-close']");
    }
    get notifyMessage() {
        return $('#swal2-title');
    }
    get yesButton () {
        return $("//button[contains(@class, 'btn') and text()='Yes']");
    }
    
    // Async methods to wait until a specific element on the page is visible or present
    async waitForPageLoad() {
        await browser.waitUntil(async () => {
            return await this.table.waitForDisplayed();
        });
    }

    // Async methods to encapsule automation code to interact with the page
    // Create new Status
    async createIP (ip, desc) { 
        await this.addIp.click();
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.ip.setValue(ip);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.dateFrom.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.dateFromSelect.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.dateFromHour.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.dateTo.click()
        await browser.keys(['Enter']);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.dateToSelect.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.dateToHour.click()
        await browser.keys(['Enter']);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.accessLevelIp.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.accessLevelSelectIp.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.description.setValue(desc);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.execute((el) => el.click(), await this.createBtn);
    }

    async createGeoIP (desc) { 
        await this.addIp.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.geoIp.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.country.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.countrySelect.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.dateFrom.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.dateFromSelect.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.dateFromHour.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.dateTo.click()
        await browser.keys(['Enter']);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.dateToSelect.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.dateToHour.click()
        await browser.keys(['Enter']);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.accessLevelGeo.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.accessLevelSelectGeo.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.description.setValue(desc);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.execute((el) => el.click(), await this.createBtn);
    }

    async editIP (search, descEdit) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.opneEditSideview.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.accessLevelDelete.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.accessLevelIpEdit.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.accessLevelSelectIpEdit.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.ingnoreList.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.okayBtn.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.descriptionEdit.doubleClick(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.descriptionEdit.setValue(descEdit);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.execute((el) => el.click(), await this.saveBtn);
    }

    async editGeoIP (search, descEdit) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.opneEditSideview.click();
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.accessLevelGeoEdit.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.accessLevelSelectGeoEdit.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.ingnoreList.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.okayBtn.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.descriptionEdit.doubleClick(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.descriptionEdit.setValue(descEdit);
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await browser.execute((el) => el.click(), await this.saveBtn);
    }

    async deactivateIp (search) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.deactivateIps.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
        await this.yesButton.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
    }

    async viewDisabledIps () { 
        await this.viewIps.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
    }

    async restoreIps (search) { 
        await this.searchBar.setValue(search);
        await browser.pause(500); // Pause for 0,5 seconds to observe
        await this.restore.click()
    }

    async viewActiveIps () { 
        await this.viewIps.click()
        await browser.pause(300); // Pause for 0,3 seconds to observe
    }

    async searchIps (search) {
        await this.searchBar.setValue(search);
    }

    async clearSearch () {
        await this.searchBar.click(); // Focus the input
        await browser.keys(['Control', 'a']); // Select all text
        await browser.keys('Backspace'); // Clear the selected text
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
    

    // Overwrite specific options to adapt it to page object
    open () {
        return super.open('settings/security/firewall');
    }
}

module.exports = new IPManagementPage();
