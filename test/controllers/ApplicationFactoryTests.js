/**
 * @class ApplicationFactoryTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 9/11/14 9:48 AM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    ApplicationFactory = require('../../app/controllers/ApplicationFactory' ),
    ServiceFactory = require('../../app/controllers/ServiceFactory' ),
    Browser = require('../../app/delegates/Browser' ),
    Config = require('../../app/controllers/Config' ),
    MockBrowser = require('mock-browser' ).mocks.MockBrowser,
    MockComponentBuilder = require('../mocks/MockComponentBuilder' ),
    ViewFactory = require('../../app/controllers/ViewFactory' );

describe('ApplicationFactory', function() {
    'use strict';

    Browser.getInstance( new MockBrowser() );

    var createOptions = function() {
        var opts = Config.test();

        opts.createLogger = MockLogger.createLogger;

        return opts;
    };

    describe('#instance', function() {
        var factory = new ApplicationFactory( createOptions() ),
            methods = [
                'createAgent',
                'createCentralDispatcher',
                'createServiceFactory',
                'createViewFactory',
                'createViewController',
                'getParentContainer',
                'startApplication',
                'initBrowser',
                'initialize',
                'createComponentBuilder',
                'fetchConfiguration'
            ];

        it('should create an instance of ApplicationFactory', function() {
            should.exist( factory );
            factory.should.be.instanceof( ApplicationFactory );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( factory ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                factory[ method ].should.be.a( 'function' );
            });
        });
    });

    describe('createAgent', function() {
        var factory = new ApplicationFactory( createOptions() );

        it('should create a valid agent', function() {
            var agent = factory.createAgent();

            should.exist( agent );
            agent.get.should.be.a('function');
        });
    });

    describe('createServiceFactory', function() {
        var factory = new ApplicationFactory( createOptions() );

        it('should create a service factory', function() {
            var sf = factory.createServiceFactory();

            should.exist( sf );
            sf.should.be.instanceof( ServiceFactory );
        });
    });

    describe('createViewFactory', function() {
        var factory = new ApplicationFactory( createOptions() );

        it('should create a view factory', function() {
            var vf = factory.createViewFactory();

            should.exist( vf );
            vf.should.be.instanceof( ViewFactory );
        });
    });

    describe('getParentContainer', function() {
        var opts = createOptions(),
            factory = new ApplicationFactory( opts );

        it('should return the parent container', function() {
            var doc = Browser.getInstance().getDocument(),
                div = doc.createElement('div' ),
                pc;

            div.id = opts.parentContainerId;
            doc.body.appendChild( div );

            pc  = factory.getParentContainer();

            should.exist( pc );
        });
    });

    describe('initBrowser', function() {
        var factory = new ApplicationFactory( createOptions() );

        it('should prepare the browser object with application access', function() {
            factory.initBrowser();

            var browser = Browser.getInstance();

            should.exist( browser );

            browser.builder.should.be.a( 'object' );
            browser.dispatcher.should.be.a( 'object' );
        });
    });

    describe('initialize', function() {
        var factory = new ApplicationFactory( createOptions() );

        it('should initialize all controllers and services and start the app', function(done) {

            // override the start method
            factory.startApplication = function() {
                done();
            };

            factory.initialize();
        });
    });
});