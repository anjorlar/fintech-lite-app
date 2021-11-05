require('dotenv').config();

module.exports = {
    // If using online database
    // development: {
    //   use_env_variable: 'DATABASE_URL'
    // },

    // development: {
    //     database: process.env.DB_NAME,
    //     username: process.env.DB_USERNAME,
    //     password: process.env.DB_PASSWORD,
    //     host: process.env.DB_HOST,
    //     port: process.env.DB_PORT,
    //     dialect: 'mysql',
    // },

    // test: {
    //     database: process.env.TEST_DB_NAME,
    //     username: process.env.TEST_DB_USERNAME,
    //     password: process.env.TEST_DB_PASSWORD,
    //     host: process.env.TEST_DB_HOST,
    //     dialect: 'mysql',
    // },

    // production: {
    //     database: process.env.DB_NAME,
    //     username: process.env.DB_USERNAME,
    //     password: process.env.DB_PASSWORD,
    //     host: process.env.DB_HOST,
    //     dialect: 'mysql',
    // },

    development: {
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
    },

    test: {
        database: process.env.TEST_DB_NAME,
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        host: process.env.TEST_DB_HOST,
        dialect: 'postgres',
    },

    production: {
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: 'postgres',
    },
};
