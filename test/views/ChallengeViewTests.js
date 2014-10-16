/**
 * @class ChallengeViewTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/15/14 8:29 AM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    MockBrowser = require('mock-browser' ).mocks.MockBrowser,
    Browser = require('../../app/delegates/Browser' ),
    ChallengeView = require('../../app/views/ChallengeView');

describe('ChallengeView', function() {
    'use strict';

    Browser.getInstance( new MockBrowser() );

    var createOptions = function() {
        var opts = {};

        opts.log = MockLogger.createLogger('ChallengeView');
        opts.viewName = ChallengeView.VIEW_NAME;
        opts.viewId = 'challenge-view';

        return opts;
    };

    describe('#instance', function() {
        var view = new ChallengeView( createOptions() ),
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

        it('should create an instance of ChallengeView', function() {
            should.exist( view );
            view.should.be.instanceof( ChallengeView );

            view.getViewName().should.equal( ChallengeView.VIEW_NAME );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( view ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                view[ method ].should.be.a( 'function' );
            });
        });
    });

    describe('getElement', function() {
        var view = new ChallengeView( createOptions() );

        it('should create and get the view container element', function() {
            var div = view.getElement();

            should.exist( div );


        });
    });
});