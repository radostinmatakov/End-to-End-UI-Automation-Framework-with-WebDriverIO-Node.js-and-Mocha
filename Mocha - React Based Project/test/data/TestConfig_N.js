class TestConfig_N {
    // Users's page 
    static userPhone = '359888777';
    static userName = 'TestUserQA';
    static userEmail = 'testQA@example.com';
    static errorMsgU = "The name already exists The email address already exists";  

    // Group's page
    static errorMsgG = 'The name has already been taken.';

    // Queue's page
    static queuesName = '9001';
    static queuesNumber = '9001';

    // Role's page
    static errorMsgR = 'The name has already been taken.';
    static roleNameBeforeN = 'TestNRole';

    // Group's page
    static groupName = 'group1';
    static errorMsgG = 'The name has already been taken.';

    // Statuses page
    static statusName = 'TEST';
    static errorMsgS = 'Status with this name already exists';

    // Ext page
    static extName = 'TestNExt';
    static extNumber = '999';
    static errorMsgE = 'Extension is in use by Test Automation User N'; // To make it dinamic for the User 
    static userNameN = 'Test Automation User N';
}

module.exports = TestConfig_N;
