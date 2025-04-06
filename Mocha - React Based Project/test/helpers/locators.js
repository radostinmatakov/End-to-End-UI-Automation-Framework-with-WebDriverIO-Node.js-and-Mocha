/**
 * sub page containing specific locators that are used across all pages
 */
class Locators {
    // Getter for method waitForPageLoad
    get table () {
        return $("div[class='panel']");
    }
    static async waitForPageLoad() {
        await browser.waitUntil(async () => {
            return await this.table.waitForDisplayed();
        });
    }
  

}

module.exports = Locators;