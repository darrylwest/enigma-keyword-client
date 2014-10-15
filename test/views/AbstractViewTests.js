/**
 * @class AbstractViewTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/9/14 8:18 AM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    AbstractView = require('../../app/views/AbstractView');

describe('AbstractView', function() {
    'use strict';

    var createOptions = function() {
        var opts = {};

        opts.log = MockLogger.createLogger('TestView');
        opts.viewName = 'TestView';
        opts.viewId = 'test-view';
        opts.getElement = function() {
            return {};
        };

        return opts;
    };

    describe('#instance', function() {
        var view = new AbstractView( createOptions() ),
            methods = [
                'show',
                'hide',
                'isHidden',
                'getViewName',
                'getViewId'
            ];

        it('should create an instance of AbstractView', function() {
            should.exist( view );
            view.should.be.instanceof( AbstractView );

            view.getViewName().should.equal( 'TestView' );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( view ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                view[ method ].should.be.a( 'function' );
            });
        });
    });

});