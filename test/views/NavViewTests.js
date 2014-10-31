/**
 * @class NavViewTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/17/14 9:26 AM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    MockApplicationFactory = require('../mocks/MockApplicationFactory'),
    Dataset = require('../fixtures/TestDataset' ),
    NavView = require('../../app/views/NavView');

describe('NavView', function() {
    'use strict';

    var createOptions = function() {
        var opts = {};

        opts.log = MockLogger.createLogger('NavView');
        opts.viewName = NavView.VIEW_NAME;
        opts.viewId = 'nav-view';

        return opts;
    };

    describe('#instance', function() {
        var view = new NavView( createOptions() ),
            methods = [
                'configure',
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

        it('should create an instance of NavView', function() {
            should.exist( view );
            view.should.be.instanceof( NavView );

            view.getViewName().should.equal( NavView.VIEW_NAME );
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
        var view = new NavView( createOptions() ),
            dataset = new Dataset();

        view.configure( dataset.createNavConfiguration() );

        it('should create and get the view container element', function() {
            var div = view.getElement();

            should.exist( div );
            div.children.length.should.equal( 1 );
        });
    });
});
