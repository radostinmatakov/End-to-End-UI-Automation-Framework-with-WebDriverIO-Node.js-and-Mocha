class TestConfig_N {
    // Users's page 
    static userPhone = '359888777';
    static userName = 'TestUserQA';
    static userEmail = 'testQA@example.com';
    static errorMsgU = [
        "The name is already exist",
        "The email address is already exist"
    ];

    // Group's page
    static errorMsgG = 'The name has already been taken.';

    // Queue's page
    static queuesName = '9001';
    static queuesNumber = '9001';

    // Role's page
    static errorMsgR = 'The name has already been taken.';

    // Group's page
    static groupName = 'group1';
    static errorMsgG = 'The name has already been taken.';
}

module.exports = TestConfig_N;
