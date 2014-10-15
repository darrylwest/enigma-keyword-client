/**
 * @class CentralDispatcherTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 9/14/14 2:14 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    CentralDispatcher = require('../../app/delegates/CentralDispatcher' ),
    ApplicationStateEvent = require('../../app/events/ApplicationStateEvent' ),
    EventEmitter = require('events' ).EventEmitter;

describe('CentralDispatcher', function() {
    'use strict';

    var createOptions = function() {
        var opts = {};

        opts.log = MockLogger.createLogger('CentralDispatcher');

        return opts;
    };

    describe('#instance', function() {
        var dispatcher = new CentralDispatcher( createOptions() ),
            methods = [
                'addMethod',
                'overrideMethod',
                'removeMethod',
                'hasMethod',
                'execute',
                'getMethods',
                'listMethodNames',
                // inherited from event emitter
                'addListener',
                'emit',
                'listeners',
                'on',
                'once',
                'removeAllListeners',
                'removeListener',
                'setMaxListeners'
            ];

        it('should create an instance of CentralDispatcher', function() {
            should.exist( dispatcher );
            dispatcher.should.be.instanceof( CentralDispatcher );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( dispatcher ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                dispatcher[ method ].should.be.a( 'function' );
            });
        });
    });

    describe('addMethod', function() {
        var dispatcher = new CentralDispatcher( createOptions() ),
            func = function() {
                return true;
            };

        it('should add a new unique method', function() {
            dash.size( dispatcher.getMethods() ).should.equal( 0 );

            dispatcher.addMethod('func', func);
            dash.size( dispatcher.getMethods() ).should.equal( 1 );
        });

        it('should reject a non-unique method', function() {
            try {
                dispatcher.addMethod('func', func);
                should.not.exist( func );
            } catch (err) {
                should.exist( func );
            }

            dash.size( dispatcher.getMethods() ).should.equal( 1 );
        });

        it('should allow overrides to be added', function() {
            var alt = function() {};

            dispatcher.overrideMethod('func', alt);
            dash.size( dispatcher.getMethods() ).should.equal( 1 );
        });
    });

    describe('execute', function() {
        var myMethodImpl = function(request, callback) {
                var response = null,
                    err = null;

                if (request && request.hasOwnProperty('name')) {
                    response = request.name;
                } else {
                    response = 'failed';
                    err = 'failed';
                }

                if (callback) {
                    callback( err, response );
                }

                return response;
            };

        it('should execute a dispatch method', function() {
            var dispatcher = new CentralDispatcher( createOptions() );

            dispatcher.addMethod('myTestMethod', myMethodImpl);

            var response = dispatcher.myTestMethod();

            should.exist( response );
            response.should.equal( 'failed' );

            response = dispatcher.myTestMethod({ name:'flarb'});
            response.should.equal( 'flarb' );
        });

        it('should execute a dispatch method with callback', function(done) {
            var dispatcher = new CentralDispatcher( createOptions() ),
                callback;

            dispatcher.addMethod('myTestMethod', myMethodImpl);

            callback = function(err, response) {
                should.not.exist( err );
                should.exist( response );

                response.should.equal('tested');

                done();
            };

            dispatcher.myTestMethod( { name:'tested' }, callback );
        });
    });

    describe('addListener', function() {
        var dispatcher = new CentralDispatcher( createOptions() );

        it('should add an event listener', function() {
            var handler = function(e) { };

            dispatcher.addListener( 'alist', handler );
            dispatcher.listeners( 'alist' ).length.should.equal( 1 );
            EventEmitter.listenerCount( dispatcher, 'alist' ).should.equal( 1 );
        });
    });

    describe('emit', function() {
        var dispatcher = new CentralDispatcher( createOptions() );

        it('should emit a single event', function(done) {
            var handler = function(e) {
                should.exist( e );

                e.obj.should.equal( 'thing' );

                done();
            };

            dispatcher.on( ApplicationStateEvent.CONFIGURATION_READY, handler );
            dispatcher.emit( ApplicationStateEvent.CONFIGURATION_READY, { obj:'thing' } );
        });

    });
});
