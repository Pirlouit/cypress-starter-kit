/// <reference types="cypress" />

const webpack = require('@cypress/webpack-preprocessor');
const fs = require('fs-extra');
const path = require('path');

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

function getConfigurationFile(config) {
    const file = config.env.configFile || 'development';
    const pathToConfigFile = path.resolve('./', `cypress.${file}.json`);
    if (fs.existsSync(pathToConfigFile)) {
        console.log(`Using config from ${pathToConfigFile}`);
        return fs.readJSONSync(pathToConfigFile);
    }
    return config;
}

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config

    const options = {
        // send in the options from your webpack.config.js, so it works the same
        // as your app's code
        webpackOptions: require('../webpack.config'),
        watchOptions: {},
    };

    on('file:preprocessor', webpack(options));

    on('task', {
        log(message) {
            console.log(message);
            return null;
        },
    });
    return getConfigurationFile(config);
};

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
    //Uncomment to support code coverage
    //require('@cypress/code-coverage/task')(on, config);

    const options = {
        // send in the options from your webpack.config.js, so it works the same
        // as your app's code
        webpackOptions: require('../webpack.config'),
        watchOptions: {},
    };

    on('file:preprocessor', webpack(options));

    on('task', {
        log(message) {
            console.log(message);
            return null;
        },
    });
    return getConfigurationFile(config);
};
