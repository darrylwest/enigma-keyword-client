/**
 * @class Browser = creates the basic browser object and makes global to node and window; an alternate
 * factory populates the non-standard extensions e.g., dispatcher, builder, etc.
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/10/14 9:31 AM
 */
var dash = require('lodash' ),
    AbstractBrowser = require('mock-browser' ).delegates.AbstractBrowser,
    instance;

var Browser = function(options) {
    'use strict';

    var instance = this;

    if (!options) options = {};

    AbstractBrowser.extend( this, options );

    // component builder

    // binding

    // access LogManager for createLogger and setLogLevels

    // getMessageChannel( channel ) - receive and send messages

    // central dispatcher
};

Browser.getInstance = function(browser) {
    'use strict';

    // enable override for tests
    if (browser) instance = browser;

    if (!instance) {
        instance = new Browser();
    }

    if (typeof global === 'object') {
        global.browser = instance;
    } else if (typeof window === 'object') {
        window.brwoser = instance;
    }

    return instance;
};

module.exports = Browser;
