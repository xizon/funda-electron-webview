const config = require('../../package.json');
const APP_NAME = config.applicationName;
const APP_VERSION = config.version;
const APP_SLUG = config.name;
const APP_DESC = config.description;
const APP_AUTHOR = config.author;

module.exports = {
    APP_NAME,
    APP_VERSION,
    APP_SLUG,
    APP_DESC,
    APP_AUTHOR
};