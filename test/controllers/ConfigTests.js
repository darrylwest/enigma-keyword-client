/**
 * @class ConfigTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 9/11/14 7:34 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockBrowser = require('mock-browser' ).mocks.MockBrowser,
    Browser = require('../../app/delegates/Browser' ),
    Config = require('../../app/controllers/Config');

describe('Config', function() {
    'use strict';

    // initialize the browser global
    Browser.getInstance( new MockBrowser() );

    describe('#instance', function() {
        var config = new Config();

        it('should create an instance of config', function() {
            should.exist( config );

            config.should.be.instanceof( Config );

            config.environment.should.equal( 'development' );
            console.log( 'version: ', config.version );
            should.exist( config.version );
            config.version.should.equal( require( __dirname + '/../../package.json' ).version );
        });
    });

    describe('development', function() {
        it('should create an instance of development config', function() {
            var config = Config.development();

            should.exist( config );
            config.environment.should.equal('development');
        });
    });

    describe('test', function() {
        it('should create an instance of test config', function() {
            var config = Config.test();

            should.exist( config );
            config.environment.should.equal('test');
        });
    });

    describe('staging', function() {
        it('should create an instance of staging config', function() {
            var config = Config.staging();

            should.exist( config );
            config.environment.should.equal('staging');
        });
    });

    describe('production', function() {
        it('should create an instance of production config', function() {
            var config = Config.production();

            should.exist( config );
            config.environment.should.equal('production');
        });
    });
});
