const { $ } = require('@wdio/globals')
const Page = require('./page');
const assert = require('assert');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class IVRPage extends Page {
    // Define selectors using getter methods
    // Getter for method waitForPageLoad

    // Getters for Create IVR
    // General tab
    get newIVR () {
        return $('mat-icon[class="mat-icon notranslate icon-size-13 material-icons mat-ligature-font mat-icon-no-color"]');
    }
    get name () {
        return $('input[name="name"]');
    }
    get audio () {
        return $('div[class="mat-mdc-select-trigger ng-tns-c41-38"]');
    }
   
    // Async methods to encapsule automation code to interact with the page
    // Create new Extention
    async manageGroups (agent) {
        await this.manageGroup.click();
        await browser.pause(1000); // Pause for 1,0 second to observe
        await this.searchAgent.setValue(agent);
  
    }

    // Assertions 
    
    // Overwrite specific options to adapt it to page object
    open () {
        return super.open('');
    }
}

module.exports = new IVRPage();