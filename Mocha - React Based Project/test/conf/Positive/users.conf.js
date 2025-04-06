const NameGenerator = require('../../helpers/name.generator');
exports.config = {
    runner: 'local',

    specs: [
        '../../specs/Positive_tests/Sideview_menu/test.users.js'
    ],

    capabilities: [  
        // capabilities for local browser web tests
        {  
          'browserName': 'chrome',  // or "firefox", "microsoftedge", "safari"
          'goog:chromeOptions': {  
            args: [
                '--disable-search-engine-choice-screen',
                '--disable-infobars', // Disable "Chrome is being controlled by automated test software." 
            ],   
            prefs: {
                'profile.default_content_setting_values.media_stream_mic': 1, // Allow microphone access
                'credentials_enable_service': false, // Disable Chrome's credential service
                'profile.password_manager_enabled': false // Disable Chrome's password manager
            }
          },
        }
    ],

    logLevel: 'info',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec',
        ['allure', 
            {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            }
        ]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    before: function (capabilities, specs) {
        // Generate the random name and store it in a global variable or property - USERS
        global.usersNameWeb = NameGenerator.generateRandomUserNameWeb(); 
        global.usersEmailWeb = NameGenerator.generateRandomUserEmailWeb(); 
        global.usersNameSip = NameGenerator.generateRandomUserNameSip(); 
        global.usersEmailSip = NameGenerator.generateRandomUserEmailSip();
        global.usersPass = NameGenerator.generateRandomUserPassword();
        global.usersEmailExt = NameGenerator.generateRandomUserEmailExt(); 
        // Generate the edited user's name
        global.editUsersNameWeb = `${global.usersNameWeb}EditWeb`;    
        global.editUsersNameSip = `${global.usersNameSip}EditSip`;
    },

    beforeTest: function (test, context) {
        browser.maximizeWindow();
    },

    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },
}