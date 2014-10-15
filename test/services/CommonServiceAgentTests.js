/**
 * @class CommonServiceAgentTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/13/14 7:42 AM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    Config = require('../../app/controllers/Config' ),
    MockAgent = require( '../mocks/MockAgent' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    CommonServiceAgent = require('../../app/services/CommonServiceAgent');

describe( 'CommonServiceAgent', function() {
    'use strict';

    var createOptions = function() {
        var opts = Config.test();

        opts.log = MockLogger.createLogger('CommonServiceAgent');
        opts.host = 'http://test.host.com';
        opts.agent = new MockAgent();
        opts.resource = '/user';

        return opts;
    };

    describe( '#instance', function() {
        var service = new CommonServiceAgent( createOptions() ),
            methods = [
                'find',
                'query',
                'save'
            ];

        it( 'should create an instance of CommonServiceAgent', function() {
            should.exist( service );
            service.should.be.instanceof( CommonServiceAgent );
        } );

        it( 'should contain all known methods based on method count', function() {
            dash.methods( service ).length.should.equal( methods.length );
        } );

        it( 'should execute all known methods', function() {
            var request = {
                model:{
                    id:'12345'
                }
            };

            methods.forEach( function( method ) {
                var obj = service[ method ]( request );

                should.exist( obj );
            } );
        } );
    } );
} );
