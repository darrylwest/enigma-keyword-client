/**
 * @class NavView
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/17/14 9:26 AM
 */
var AbstractView = require('./AbstractView'),
    util = require( 'util' ),
    events = require( 'events' );

var NavView = function(options) {
    'use strict';

    var view = this,
        log = options.log,
        container;

    this.getElement = function() {
        var builder = browser.builder;

        if (!container) {
            log.info('create the nav view');

            container = builder.createElement('div');
            container.id = view.getViewId();

            var navContainer = builder.createElement('div', 'nav-container');

            var message = builder.createElement('h5');
            message.innerHTML = 'Nav Panel';
            navContainer.appendChild( message );

            container.appendChild( navContainer );

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

util.inherits( NavView, events.EventEmitter );

// define event types as object variables

NavView.VIEW_NAME = 'NavView';

module.exports = NavView;