/**
 * @class ClientManagerTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 9/12/14 3:37 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    ClientLogManager = require('../../app/delegates/ClientLogManager');

describe('ClientLogManager', function() {
    'use strict';

    describe('#instance', function() {
        var manager = new ClientLogManager( 'MyCat' ),
            methods = [
                'getCategory',
                'isDebug',
                'debug',
                'info',
                'warn',
                'error',
                'log',
                'logToOutput',
                'send'
            ];

        it('should create an instance of ServiceFactory', function() {
            should.exist( manager );
            manager.should.be.instanceof( ClientLogManager );

            manager.level.should.equal( ClientLogManager.INFO );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( manager ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                manager[ method ].should.be.a( 'function' );
            });
        });
    });

    describe('getCategory', function() {
        var manager = new ClientLogManager( 'MyCat' );

        it('should return the specified category for a specific logger', function() {
            var cat = manager.getCategory();

            should.exist( cat );
            cat.should.equal( 'MyCat' );
        });
    });

    describe('setLevels', function() {
        var log = ClientLogManager.createLogger('MyLogger');

        it('should set all levels for a specific logger', function() {
            log.level.should.equal( ClientLogManager.INFO );

            ClientLogManager.setLevels( ClientLogManager.WARN );

            log.level.should.equal( ClientLogManager.WARN );
        });
    });

    describe('send', function() {
        var sent = false;

        ClientLogManager.prototype.send = function() {
            sent = true;
        };

        it('should send a message when overridden', function() {
            var log = ClientLogManager.createLogger('MyLogger');

            log.info('hi');
            sent.should.equal( true );
        });
    });

});
