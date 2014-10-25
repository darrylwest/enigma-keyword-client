/**
 *
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/25/14 1:51 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    MockApplicationFactory = require('../mocks/MockApplicationFactory'),
    AboutView = require('../../app/views/AboutView');

describe('AboutView', function() {
    'use strict';

    // just need to create an instance for browser and component builder
    new MockApplicationFactory();

    var createOptions = function() {
        var opts = {};

        opts.log = MockLogger.createLogger('AboutView');
        opts.viewName = AboutView.VIEW_NAME;
        opts.viewId = 'about-view';

        return opts;
    };

    describe('#instance', function() {
        var view = new AboutView( createOptions() ),
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

        it('should create an instance of AboutView', function() {
            should.exist( view );
            view.should.be.instanceof( AboutView );

            view.getViewName().should.equal( AboutView.VIEW_NAME );
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
        var view = new AboutView( createOptions() );

        it('should create and get the view container element', function() {
            var div = view.getElement();

            should.exist( div );
            div.children.length.should.equal( 1 );
        });
    });
});
