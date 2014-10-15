/**
 * @class MockComponentBuilder
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/9/14 10:03 AM
 */
var ComponentBuilder = require('../../app/delegates/ComponentBuilder' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    MockBrowser = require('mock-browser' ).mocks.MockBrowser;

var MockComponentBuilder = function() {
    'use strict';
};

MockComponentBuilder.createInstance = function() {
    'use strict';

    var opts = {};

    opts.log = MockLogger.createLogger('MockComponentBuilder');
    opts.createLogger = MockLogger.createLogger;

    return new ComponentBuilder( opts );
};

module.exports = MockComponentBuilder;