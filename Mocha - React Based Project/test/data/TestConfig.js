class TestConfig {
    // Reusuble for all pages
    static emptyTable = 'No data available';
    static input = 'Terminate Call';
    static inputTwo = 'Hangup';
    static extTypeWeb = 'Web';
    static extTypeSip = 'Sip';
    static queuesNum = '9998';
    static copyQueuesNum = '9997';

    // Login page - Admin credentials 
    static emailAdmin = 'someUser';
    static passwordAdmin = 'somePass';

    // Queue's page 
    static extAgent = 'WEB EXT AUTOMATION';
    static extAgentNumber = '690';
    static successMsgQ = 'Queue created successfully';
    static updateMsgQ = 'Queue updated successfully';
    static disableMsg = 'Queue disabled successfully';
    static enableMsgQ = 'Queue enabled successfully';
    static deleteMsgQ = 'Queue deleted successfully';

    // IVR's page 
    static desc = 'Automation Test';
    static descEdit = 'Automation Test Edit';
    static successMsgI = 'IVR created successfully';
    static updateMsgI = 'IVR updated successfully';
    static deleteMsgI = 'IVR deleted successfully';

    // Announcement's page 
    static successMsgA = 'Announcement created successfully';
    static updateMsgA = 'Announcement updated successfully';
    static deleteMsgA = 'Announcement deleted successfully';

    // Time Condition's page 
    static timeGr = 'Date Range';
    static from = '01:00';
    static to = '18:00';
    static successMsgT = 'Time Condition created successfully';
    static updateMsgT = 'Time Condition updated successfully';
    static deleteMsgT = 'Time Condition deleted successfully';
    
    // Role's page 
    static roleName = 'TestQA';
    static roleNameBefore = 'TestUser';
    static roleNameEdit = 'TestQAedit';
    static rolenameCopy = 'TestQACopy';
    static roleLevelAdmin = 'Admin';
    static roleLevelManager = 'Manager';
    static roleLevelAgent = 'Agent';
    static roleExtName = 'Roles EXT';
    static roleExtNumber = '524';
    static successMsgR = 'Role created successfully';
    static updateMsgR = 'Role updated successfully';
    static deleteMsgR = 'Role deleted successfully';
    static assignMsg = 'Role assigned successfully';
    static preDeleteMsg = 'No members found';

    // Users's page 
    static successMsgU = "User created successfully Email with password reset link sent to user"
    static updateMsgU = 'User updated successfully';
    static resetPassMsgU = 'Email with password reset link sent to user';
    static deleteMsgU = 'User deleted successfully';
    static statusInactive = 'Inactive'
    static forceLogin = 'No';
    static userPhone = '359888777';
    static userExtWebName = 'Test Automation EXT_WEB';
    static userExtWebNumber = '520';
    static userExtSipName = 'Test Automation EXT_SIP';
    static userExtSipNumber = '521';

    // Groups's page 
    static descName = 'Testing Group';
    static descNameEdit = 'Testing Group Edit';
    static ext = '520';
    //static extTwo = 'Test Automation User'; // deleted - add Before and After to create a User for Groups !!!
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
    static searchIcon = 'AArrowDown';
    static searchIconEdit = 'AirVent';
    static successMsgS = 'Status created successfully';
    static updateMsgS = 'Status updated successfully';
    static deleteMsgS = 'Status deleted successfully';
    static duplicationMsgS = 'Status with this name already exists';
    
    // Extension's page 
    static extWebNumber = '1000';
    static extSipNumber = '1001';
    static successMsgE = 'Extension created successfully';
    static updateMsgE = 'Extension updated successfully';
    static deleteMsgE = 'Extension deleted successfully';
    static groupName = 'Test Automation Group'; // TO BE DELETED AFTER THE GROUP PAGE IS FIXED
    static extUsersName = 'EXT Automation';
    static extUsersNumber = '522';
    
    // Messaging Queue's page 
    static successMsgMq = 'Item created successfully';
    static updateMsgMq = 'Item updated successfully';
    static disableMsMq = 'Queue disabled successfully';
    static enableMsMq = 'Queue enabled successfully';
    static deleteMsgMq = 'Item deleted successfully';
    static userMesQwebName = 'Mes. Queue EXT_WEB';
    static userMesQwebNumber = '523';

    // Blacklist's page 
    static successMsgBl = 'Blacklist number created successfully';
    static updateMsgBl = 'Blacklist number updated successfully';
    static deleteMsgBl = 'Blacklist number deleted successfully';
    static restoreMsBl = 'Blacklist number restored successfully';
    static duplMsgBl = 'This number already exists in the deleted blacklist';

    // IP Management's page 
    static successMsgIp = 'The firewall entry was created successfully.';
    static deleteMsgIp = 'The firewall entry was updated successfully.';
    static restoreMsBl = 'Blacklist number restored successfully';     // TO UPDATE IT AFTER THE FIX
    static duplMsgBl = 'This number already exists in the deleted blacklist';

}

module.exports = TestConfig;

