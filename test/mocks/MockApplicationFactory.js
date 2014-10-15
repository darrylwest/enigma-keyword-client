/**
 * @class MockApplicationFactory
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/13/14 3:44 PM
 */
var dash = require('lodash'),
    Browser = require('../../app/delegates/Browser' ),
    MockBrowser = require('mock-browser' ).mocks.MockBrowser,
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    MockAgent = require('./MockAgent' ),
    Config = require('../../app/controllers/Config' ),
    ApplicationFactory = require('../../app/controllers/ApplicationFactory');

var MockApplicationFactory = function(options) {
    'use strict';
};

MockApplicationFactory.createInstance = function() {
    'use strict';

    // start with a new mock browser instance each time
    var config = Config.test(),
        browser = Browser.getInstance( new MockBrowser() ),
        div = browser.getDocument().createElement( 'div' );

    div.id = config.parentContainerId;

    config.createLogger = MockLogger.createLogger;
    config.agent = new MockAgent();

    var factory = new ApplicationFactory( config );

    factory.initBrowser();

    return factory;
};

module.exports = MockApplicationFactory;