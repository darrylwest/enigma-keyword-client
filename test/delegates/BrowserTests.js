/**
 * @class BrowserTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/10/14 9:32 AM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    MockBrowser = require('mock-browser' ).mocks.MockBrowser,
    Browser = require('../../app/delegates/Browser');

describe('Browser', function() {
    'use strict';

    var createOptions = function() {
        var opts = {};

        opts.window = MockBrowser.createWindow();

        return opts;
    };

    describe('#instance', function() {
        var browser = new Browser( createOptions() ),
            methods = [
                // inherited
                'getDocument',
                'getWindow',
                'getHistory',
                'getLocation',
                'getLocalStorage',
                'getSessionStorage'
            ];

        it('should create an instance of Browser', function() {
            should.exist( browser );
            browser.should.be.instanceof( Browser );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( browser ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                browser[ method ].should.be.a( 'function' );
            });
        });
    });
});