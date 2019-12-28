const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: async function (password) {
        const passwordHash = await bcrypt.hash(password, 10);

        return passwordHash;
    },
    comparePasswords: async function (password, passwordHash) {
        const resoult = await bcrypt.compare(password, passwordHash);

        return resoult;
    }
}