/**
 * @class ViewController
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/6/14 8:55 AM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockApplicationFactory = require( '../mocks/MockApplicationFactory' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    ViewController = require('../../app/controllers/ViewController');

describe('ViewController', function() {
    'use strict';

    MockApplicationFactory.createInstance();

    var createOptions = function() {
        var opts = {};

        opts.log = MockLogger.createLogger('ViewController');
        opts.createLogger = MockLogger.createLogger;

        return opts;
    };

    describe('#instance', function() {
        var controller = new ViewController( createOptions() ),
            methods = [
                'initListeners',
                'configurationHandler',
                'codeRequestHandler',
                'accessRequestHandler',
                'hideViews',
                'showSplashView',
                'showChallengeView'
            ];

        it('should create an instance of ViewController', function() {
            should.exist( controller );
            controller.should.be.instanceof( ViewController );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( controller ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                controller[ method ].should.be.a( 'function' );
            });
        });
    });
});