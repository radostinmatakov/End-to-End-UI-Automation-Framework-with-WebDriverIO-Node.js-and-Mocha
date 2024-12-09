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
    static generateRandomUserEmailWeb(prefix = 'userWeb') {
        const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string
        // Combine prefix, random string, and domain to create an email
        return `${prefix}${randomString}@example.com`;
    }
    static generateRandomUserEmailSip(prefix = 'userSip') {
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
}

module.exports = NameGenerator;