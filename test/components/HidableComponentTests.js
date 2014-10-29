/**
 * @class HidableComponentTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/8/14 9:22 AM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockBrowser = require('mock-browser' ).mocks.MockBrowser,
    HidableComponent = require('../../app/components/HidableComponent');

describe( 'HidableComponent', function() {
    'use strict';

    var document = MockBrowser.createDocument(),
        element,
        createOptions;

    createOptions = function() {
        var opts = {};

        element = document.createElement('div');

        opts.getElement = function() {
            return element;
        };

        return opts;
    };

    describe( '#instance', function() {
        var component = new HidableComponent( createOptions() ),
            methods = [
                'hide',
                'show',
                'isHidden'
            ];

        it( 'should create an instance of HidableComponent', function() {
            should.exist( component );
            component.should.be.instanceof( HidableComponent );
        } );

        it( 'should contain all known methods based on method count', function() {
            dash.methods( component ).length.should.equal( methods.length );
        } );

        it( 'should execute all known methods', function() {
            methods.forEach( function( method ) {
                component[ method ]();
            } );
        } );

    } );

    describe( '#showHide', function() {
        var component = new HidableComponent( createOptions() );

        it( 'should not be hidden when created', function() {
            component.isHidden().should.equal( false );
        } );

        it( 'should be hidden when hide called', function() {
            component.hide();
            component.isHidden().should.equal( true );
        } );

        it( 'should be enabled when enable called', function() {
            component.show();
            component.isHidden().should.equal( false );
        } );
    } );
} );
