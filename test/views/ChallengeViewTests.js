/**
 * @class ChallengeViewTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/15/14 8:29 AM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    MockApplicationFactory = require('../mocks/MockApplicationFactory'),
    ChallengeView = require('../../app/views/ChallengeView');

describe('ChallengeView', function() {
    'use strict';

    // just need to create an instance for browser and component builder
    new MockApplicationFactory();

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
                'getCodeInput',
                'getKeyInput',
                'getLoginButton',
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

        it('should have known event definitions', function() {
            should.exist( view.CODE_REQUEST );
            should.exist( view.ACCESS_REQUEST );
        });
    });

    describe('#get', function() {
        var view = new ChallengeView( createOptions() );

        it('should create and get the view container element', function() {
            var div = view.getElement();

            should.exist( div );
            div.children.length.should.equal( 1 );
        });

        it('code input should be readable and have onblur listener', function() {
            var input = view.getCodeInput();

            should.exist( input );
            input.onblur.should.be.a('function');
        });

        it('key input should be readable and have onblur listener', function() {
            var input = view.getKeyInput();

            should.exist( input );
            input.onblur.should.be.a('function');
        });

        it('login button should be readable and have onclick listener', function() {
            var button = view.getLoginButton();

            should.exist( button );
            button.onclick.should.be.a('function');
        })
    });
});