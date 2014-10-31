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

var mockBrowser = Browser.getInstance( new MockBrowser() ),
    factory;

var MockApplicationFactory = function(options) {
    'use strict';

    return factory;
};

MockApplicationFactory.createInstance = function() {
    'use strict';

    if (!factory) {
        // start with a new mock browser instance each time
        var config = Config.test(),
            div = mockBrowser.getDocument().createElement( 'div' );

        div.id = config.parentContainerId;

        config.createLogger = MockLogger.createLogger;
        config.agent = new MockAgent();

        factory = new ApplicationFactory( config );

        factory.initBrowser();
    }

    return factory;
};

factory = MockApplicationFactory.createInstance();

module.exports = MockApplicationFactory;