/**
 * @class HomeViewTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/16/14 1:56 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    MockApplicationFactory = require('../mocks/MockApplicationFactory'),
    HomeView = require('../../app/views/HomeView');

describe('HomeView', function() {
    'use strict';

    var createOptions = function() {
        var opts = {};

        opts.log = MockLogger.createLogger('HomeView');
        opts.viewName = HomeView.VIEW_NAME;
        opts.viewId = 'home-view';

        return opts;
    };

    describe('#instance', function() {
        var view = new HomeView( createOptions() ),
            methods = [
                'getElement',
                'bindEvents',
                // inherited
                'show',
                'hide',
                'isHidden',
                'getViewName',
                'getViewId',
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

        it('should create an instance of HomeView', function() {
            should.exist( view );
            view.should.be.instanceof( HomeView );

            view.getViewName().should.equal( HomeView.VIEW_NAME );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( view ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                view[ method ].should.be.a( 'function' );
            });
        });

        it('should have known event definitions', function() {
            // should.exist( view.WHATEVER );
        });
    });

    describe('#get', function() {
        var view = new HomeView( createOptions() );

        it('should create and get the view container element', function() {
            var div = view.getElement();

            should.exist( div );
            div.children.length.should.equal( 1 );
        });
    });
});
