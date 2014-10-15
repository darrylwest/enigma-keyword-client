/**
 * @class ComponentBuilderTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/9/14 7:51 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    MockBrowser = require('mock-browser' ).mocks.MockBrowser,
    Browser = require('../../app/delegates/Browser' ),
    ComponentBuilder = require('../../app/delegates/ComponentBuilder');

describe('ComponentBuilder', function() {
    'use strict';

    // required to make the browser object global
    Browser.getInstance( new MockBrowser() );

    var createOptions = function() {
        var opts = {};

        opts.log = MockLogger.createLogger('TestView');
        opts.createLogger = MockLogger.createLogger;

        return opts;
    };

    describe('#instance', function() {
        var builder = new ComponentBuilder( createOptions() ),
            methods = [
                'createElement'
            ];

        it('should create an instance of ComponentBuilder', function() {
            should.exist( builder );
            builder.should.be.instanceof( ComponentBuilder );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( builder ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                builder[ method ].should.be.a( 'function' );
            });
        });
    });

    describe('createElement', function() {
        var builder = new ComponentBuilder( createOptions() );

        it('should create a dom element with id and class', function() {
            var el = builder.createElement( 'div', 'hide', '12345' );

            should.exist( el );
            el.className.should.equal('hide');
            el.id.should.equal( '12345' );
        });
    });
});