/**
 * @class HomeView
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/16/14 1:51 PM
 */
var AbstractView = require('./AbstractView'),
    util = require( 'util' ),
    events = require( 'events' );

var HomeView = function(options) {
    'use strict';

    var view = this,
        log = options.log,
        container;

    this.getElement = function() {
        var builder = browser.builder;

        if (!container) {
            log.info('create the home view');

            container = builder.createElement('div');
            container.id = view.getViewId();

            var homeContainer = builder.createElement('div', 'home-container');

            container.appendChild( homeContainer );

            view.bindEvents();
        }

        return container;
    };

    this.bindEvents = function() {
        log.info('bind events');
    };

    AbstractView.extend( this, options );
    events.EventEmitter.call( this );
};

util.inherits( HomeView, events.EventEmitter );

// define event types as object variables

HomeView.VIEW_NAME = 'HomeView';

module.exports = HomeView;