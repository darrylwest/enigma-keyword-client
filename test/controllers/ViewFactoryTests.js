/**
 * @class ViewFactoryTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/6/14 5:18 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    superagent = require('superagent' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    MockComponentBuilder = require('../mocks/MockComponentBuilder' ),
    ViewFactory = require('../../app/controllers/ViewFactory');

describe('ViewFactory', function() {
    'use strict';

    var createOptions = function() {
        var opts = {};

        opts.log = MockLogger.createLogger('ViewFactory');
        opts.createLogger = MockLogger.createLogger;
        opts.componentBuilder = MockComponentBuilder.createInstance();

        return opts;
    };

    describe('#instance', function() {
        var factory = new ViewFactory( createOptions() ),
            methods = [
                'createSplashView',
                'createChallengeView',
                'createHomeView',
                'createAboutView',
                'createNavView',
                'getViews'
            ];

        it('should create an instance of ViewFactory', function() {
            should.exist( factory );
            factory.should.be.instanceof( ViewFactory );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( factory ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                factory[ method ].should.be.a( 'function' );
            });
        });
    });

    describe('createSplashView', function() {
        var factory = new ViewFactory( createOptions() );

        it('should create a splash view', function() {
            var view = factory.createSplashView();

            should.exist( view );
        });
    });
});