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
        config;

    /**
     * set the navigation configuration for appTitle, links, etc.
     * @param conf
     */
    this.configure = function(conf) {
        if (conf.hasOwnProperty('navigation')) {
            config = conf.navigation;
        } else {
            config = conf;
        }

        log.info('nav configured: ', JSON.stringify( config, true, 2 ));
    };

    this.getElement = function() {
        var builder = browser.builder;

        if (!container) {
            log.info('create the nav view');

            container = builder.createElement('div');
            container.id = view.getViewId();

            var navContainer = builder.createElement('div', 'nav-container');

            var title = builder.createElement('span', 'title');
            title.innerHTML = config.appTitle;

            navContainer.appendChild( title );

            var buttons = [];
            config.links.forEach(function(link) {
                var btn = builder.createElement('span', 'nav-link');
                btn.innerHTML = link.label || link.id;
                btn.link = link;

                buttons.push( btn );
                navContainer.appendChild( btn );
            });

            container.appendChild( navContainer );

            view.bindEvents( buttons );
        }

        return container;
    };

    this.bindEvents = function(buttons) {
        log.info('bind events');

        buttons.forEach(function(btn) {

            var link = btn.link;

            log.info('configure link: ', link.id);

            btn.onclick = function() {
                view.emit('viewchange', link.id );
            };
        });
    };

    AbstractView.extend( this, options );
    events.EventEmitter.call( this );
};

util.inherits( NavView, events.EventEmitter );

// define event types as object variables

NavView.VIEW_NAME = 'NavView';

module.exports = NavView;