class NameGenerator {
    // Queues
    static generateRandomQueueName(prefix = 'Test_Queue') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        return `${prefix}${randomString}`;
    }

    // Custom Status
    static generateRandomStatusName(prefix = 'Test_Status') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        return `${prefix}${randomString}`;
    }
    
    // Users
    static generateRandomUserNameWeb(prefix = 'WEB_User') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        return `${prefix}${randomString}`;
    }
    static generateRandomUserNameSip(prefix = 'SIP_User') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        return `${prefix}${randomString}`;
    }
    static generateRandomUserNameExt(prefix = 'EXT_User') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        return `${prefix}${randomString}`;
    }
    static generateRandomUserNameMesQ(prefix = 'Mes.Q_User') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        return `${prefix}${randomString}`;
    }
    static generateRandomUserEmailWeb(prefix = 'webUser') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        // Combine prefix, random string, and domain to create an email
        return `${prefix}${randomString}@example.com`;
    }
    static generateRandomUserEmailSip(prefix = 'sipUser') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        // Combine prefix, random string, and domain to create an email
        return `${prefix}${randomString}@example.com`;
    }
    static generateRandomUserEmailExt(prefix = 'extUser') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        // Combine prefix, random string, and domain to create an email
        return `${prefix}${randomString}@example.com`;
    }
    static generateRandomUserEmailMesQ(prefix = 'mesQuser') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        // Combine prefix, random string, and domain to create an email
        return `${prefix}${randomString}@example.com`;
    }
    static generateRandomUserNameRoles(prefix = 'User_Roles') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        return `${prefix}${randomString}`;
    }
    static generateRandomUserRoles(prefix = 'userRoles') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        // Combine prefix, random string, and domain to create an email
        return `${prefix}${randomString}@example.com`;
    }
    static generateRandomUserNameRolesN(prefix = 'User_RolesN') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        return `${prefix}${randomString}`;
    }
    static generateRandomUserRolesN(prefix = 'userRolesN') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        // Combine prefix, random string, and domain to create an email
        return `${prefix}${randomString}@example.com`;
    }

    static generateRandomUserPassword(length = 12) {
        if (length < 1) {
            throw new Error('Password length must be at least 1 character.');
        }
        const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const allCharacters = lowerCaseLetters + numbers;
        // Generate the first character as an uppercase letter
        const firstCharacter = upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)];
        // Generate the remaining characters
        let remainingCharacters = '';
        for (let i = 0; i < length - 1; i++) {
            const randomIndex = Math.floor(Math.random() * allCharacters.length);
            remainingCharacters += allCharacters[randomIndex];
        }
        // Combine the first uppercase letter with the remaining characters
        return firstCharacter + remainingCharacters;
    }

    // Ext
    static generateRandomExtNameWeb(prefix = 'Ext_WEB') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        return `${prefix}${randomString}`;
    }
    static generateRandomExtNameWebRoles(prefix = 'Ext_WEB_Role') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        return `${prefix}${randomString}`;
    }
    static generateRandomExtNameSip(prefix = 'Ext_SIP') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        return `${prefix}${randomString}`;
    }

    // IVR
    static generateRandomIVRName(prefix = 'Test_IVR') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        return `${prefix}${randomString}`;
    }

    // Announcements
    static generateRandomAnnDesc(prefix = 'Test_Announcement') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        return `${prefix}${randomString}`;
    }

    // Time Conditions
    static generateRandomTcName(prefix = 'Test_TimeCond') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        return `${prefix}${randomString}`;
    }
    
    // Groups
    static generateRandomGroupName(prefix = 'Test_Group') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        return `${prefix}${randomString}`;
    }

    static generateRandomGroupNameExt(prefix = 'EXT_Group') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        return `${prefix}${randomString}`;
    }

    // Messaging Queues
    static generateRandomMesQueueName(prefix = 'Test_Mes.Queues') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        return `${prefix}${randomString}`;
    }

    // Blacklists
    static generateRandomBlacklistDesc(prefix = 'Test_Blacklist') {
        const englishChars = Math.random().toString(36).substring(2, 8);
        const hebrewChars = 'אבגדהוזחט'.charAt(Math.floor(Math.random() * 9));
        const bulgarianChars = 'абвгдежзийкл'.charAt(Math.floor(Math.random() * 12));
        return `${prefix}${englishChars}${hebrewChars}${bulgarianChars}`;
    }
    static generateRandomBGPhoneNumber() {
        const prefix = '359';
        const randomDigits = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
        return `${prefix}${randomDigits}`;
    }

    // IP Managements
    static generateRandomIPAddress() {
        const getRandomOctet = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        // Ensure the first octet avoids private IP ranges
        let firstOctet;
        do {
            firstOctet = getRandomOctet(1, 223); // Avoid 224+ (reserved) and 0
        } while ([10, 127, 172, 192].includes(firstOctet));
        const secondOctet = firstOctet === 172 ? getRandomOctet(0, 15) : getRandomOctet(0, 255);
        const thirdOctet = getRandomOctet(0, 255);
        const fourthOctet = getRandomOctet(1, 254); // Avoid .0 and .255 (network/broadcast)
        return `${firstOctet}.${secondOctet}.${thirdOctet}.${fourthOctet}`;
    }
    static generateRandomIpDesc(prefix = 'IP') {
        const englishChars = Math.random().toString(36).substring(2, 8);
        const hebrewChars = 'אבגדהוזחט'.charAt(Math.floor(Math.random() * 9));
        const bulgarianChars = 'абвгдежзийкл'.charAt(Math.floor(Math.random() * 12));
        return `${prefix}${englishChars}${hebrewChars}${bulgarianChars}`;
    }
    static generateRandomGeoIpDesc(prefix = 'GEOIP') {
        const englishChars = Math.random().toString(36).substring(2, 8);
        const hebrewChars = 'אבגדהוזחט'.charAt(Math.floor(Math.random() * 9));
        const bulgarianChars = 'абвгдежзийкл'.charAt(Math.floor(Math.random() * 12));
        return `${prefix}${englishChars}${hebrewChars}${bulgarianChars}`;
    }

    
}

module.exports = NameGenerator;