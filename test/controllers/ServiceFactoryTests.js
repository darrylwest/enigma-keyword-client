/**
 * @class ServiceFactoryTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 9/11/14 6:47 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    superagent = require('superagent' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    ServiceFactory = require('../../app/controllers/ServiceFactory');

describe('ServiceFactory', function() {
    'use strict';

    var createOptions = function() {
        var opts = {};

        opts.log = MockLogger.createLogger('ServiceFactory');
        opts.createLogger = MockLogger.createLogger;
        opts.agent = superagent;

        opts.socketClientURL = 'http://home.com/example';

        return opts;
    };

    describe('#instance', function() {
        var factory = new ServiceFactory( createOptions() ),
            methods = [
                'createConfigurationService',
                'createMessageService'
            ];

        it('should create an instance of ServiceFactory', function() {
            should.exist( factory );
            factory.should.be.instanceof( ServiceFactory );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( factory ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                factory[ method ].should.be.a( 'function' );
            });
        });
    });

    describe('createMessageService', function() {
        var factory = new ServiceFactory( createOptions() );

        it('should create a message socket service', function() {
            var service = factory.createMessageService();

            should.exist( service );
        });
    });
});