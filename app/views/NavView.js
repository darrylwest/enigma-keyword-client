/**
 * @class NavView - the nav view is a container for title and navigation buttons.  Screen switching
 * is not controlled here, just the button clicks and emitted viewchange events.  The listening
 * controller (view controller, nav controller, etc) does view change arbitration and probably
 * sets the hash.
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

            var title = builder.createElement('span', 'title');
            title.innerHTML = 'My Application';

            home = builder.createElement('span', 'nav-link');
            home.innerHTML = 'home';

            about = builder.createElement('span', 'nav-link');
            about.innerHTML = 'about';

            logout = builder.createElement('span', 'nav-link');
            logout.innerHTML = 'logout';

            navContainer.appendChild( title );
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
            view.emit('viewchange', 'home');
        };

        about.onclick = function() {
            view.emit('viewchange', 'about');
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