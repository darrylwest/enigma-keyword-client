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
        container,
        origin = options.origin,
        home,
        about,
        logout;

    this.getElement = function() {
        var builder = browser.builder;

        if (!container) {
            log.info('create the nav view');

            container = builder.createElement('div');
            container.id = view.getViewId();

            var navContainer = builder.createElement('div', 'nav-container');

            home = builder.createElement('a');
            home.innerHTML = 'home';
            home.href = '#home';

            logout = builder.createElement('a');
            logout.innerHTML = 'logout';
            logout.href = '#logout';

            about = builder.createElement('a');
            about.innerHTML = 'about';
            about.href = '#about';

            navContainer.appendChild( home );
            navContainer.appendChild( about );
            navContainer.appendChild( logout );

            container.appendChild( navContainer );

            view.bindEvents();
        }

        return container;
    };

    this.bindEvents = function() {
        log.info('bind events');

        var loc = browser.getLocation();

        home.onclick = function() {
            loc.hash = '#home';
        };

        about.onclick = function() {
            loc.hash = '#about';
        };

        logout.onclick = function() {
            loc.replace( origin );
        };
    };

    AbstractView.extend( this, options );
    events.EventEmitter.call( this );
};

util.inherits( NavView, events.EventEmitter );

// define event types as object variables

NavView.VIEW_NAME = 'NavView';

module.exports = NavView;