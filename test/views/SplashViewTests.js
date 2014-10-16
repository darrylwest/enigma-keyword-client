/**
 * @class SplashViewTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/6/14 5:06 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    MockApplicationFactory = require('../mocks/MockApplicationFactory'),
    SplashView = require('../../app/views/SplashView');

describe('SplashView', function() {
    'use strict';

    // just need to create an instance for browser and component builder
    new MockApplicationFactory();

    var createOptions = function() {
        var opts = {};

        opts.log = MockLogger.createLogger('SplashView');
        opts.viewName = SplashView.VIEW_NAME;
        opts.viewId = 'splash-view';

        return opts;
    };

    describe('#instance', function() {
        var view = new SplashView( createOptions() ),
            methods = [
                'getElement',
                'setMessage',
                // inherited
                'show',
                'hide',
                'isHidden',
                'getViewName',
                'getViewId'
            ];

        it('should create an instance of SplashView', function() {
            should.exist( view );
            view.should.be.instanceof( SplashView );

            view.getViewName().should.equal( SplashView.VIEW_NAME );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( view ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                view[ method ].should.be.a( 'function' );
            });
        });
    });

    describe('getElement', function() {
        var view = new SplashView( createOptions() );

        it('should create and get the view container element', function() {
            var div = view.getElement();

            should.exist( div );
        });
    });
});