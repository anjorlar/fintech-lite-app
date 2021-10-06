/**
 * Utils object.
 * contains various helper function
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const settings = require('../config/settings');

const Utils = {
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(settings.salt);
        const hash = await bcrypt.hash(password, salt);
        return hash
    },

    async validatePassword(password, passwordHash) {
        const isMatch = await bcrypt.compare(password, passwordHash)
        if (!isMatch) {
            return false
        };
        return true
    },


    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, settings.jwt.SECRETKEY, {
                subject: settings.appName,
                algorithms: [settings.jwt.alg],
                issuer: settings.jwt.issuer
            });
            return decoded;
        } catch (err) {
            console.log('error err', err)
            throw new Error(`${err.name}:${err.message}`)
        }
    },
}

module.exports = Utils
