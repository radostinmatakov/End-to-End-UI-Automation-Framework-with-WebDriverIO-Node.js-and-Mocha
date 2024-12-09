class TestConfig {
    // Reusuble for all pages
    static emptyTable = 'No records';

    // Login page - Admin credentials 
    static emailAdmin = 'axiom@squaretalk.com';
    static passwordAdmin = 'axioma@squaretalk.com';

    // Queue's page 
    static queuesNum = '9998';
    static copyQueuesNum = '9997';
    static successMsgQ = 'Queue created successfully';
    static updateMsgQ = 'Queue updated successfully';
    static disableMsg = 'Queue disabled successfully';
    static enableMsg = 'Queue enabled successfully';
    static deleteMsgQ = 'Queue deleted successfully';
    
    // Role's page 
    static roleName = 'TestQA';
    static roleNameBefore = 'TestUser';
    static roleNameEdit = 'TestQAedit';
    static rolenameCopy = 'TestQACopy';
    static roleLevelAdmin = 'Admin';
    static roleLevelManager = 'Manager';
    static roleLevelAgent = 'Agent';
    static successMsgR = 'Role created successfully';
    static updateMsgR = 'Role updated successfully';
    static deleteMsgR = 'Role deleted successfully';
    static assignMsg = 'Role assigned successfully';
    static preDeleteMsg = 'No members found';

    // Users's page 
    static userPhone = '359888777';
    static successMsgU = "User created successfully Email with password reset link sent to user"
    static updateMsgU = 'User updated successfully';
    static resetPassMsgU = 'Email with password reset link sent to user';
    static deleteMsgU = 'User deleted successfully';
    static extWeb = '111';
    static extTypeWeb = 'Web';
    static extSip = '112';
    static extTypeSip = 'Sip';
    static groupsWeb = 'All';
    static groupsSip = 'group1';
    static statusActive = 'Active';
    static statusInactive = 'Inactive';
    static userLevelAdmin = 'Admin';
    static userRoleAdmin = 'Default Admin';
    static userLevelManager = 'Manager';
    static userRoleManager = 'Default Manager';
    static forceLogin = 'No';

    // Groups's page 
    static grName = 'Test_QA';
    static grNameEdit = 'Test_QA/Edit';
    static descName = 'Testing Group';
    static descNameEdit = 'Testing Group Edit';
    static ext = '5998';
    static extTwo = 'squaretalk';
    static members = '3';
    static membersEdit = '2';
    static successMsgG = 'Group created successfully';
    static updateMsgG = 'Group updated successfully';
    static deleteMsgG = 'Group deleted successfully';

    // Statuses page 
    static activeStatus = 'Active';
    static inactiveStatus = 'Inactive';
    static permisions = 'Disabled';
    static permisionsEdit = 'Inbound and Outbound';
    static typeStatus = 'PAUSE';
    static typeStatusEdit = 'WORK';
    static successMsgS = 'Status created successfully';
    static updateMsgS = 'Status updated successfully';
    static deleteMsgS = 'Status deleted successfully';
    static duplicationMsgS = 'Status with this name already exists';
    


   




    
}

module.exports = TestConfig;