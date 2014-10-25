/**
 * @class AboutView
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/25/14 1:46 PM
 */
var AbstractView = require('./AbstractView'),
    util = require( 'util' ),
    events = require( 'events' );

var AboutView = function(options) {
    'use strict';

    var view = this,
        log = options.log,
        container;

    this.getElement = function() {
        var builder = browser.builder;

        if (!container) {
            log.info('create the about view');

            container = builder.createElement('div');
            container.id = view.getViewId();

            var aboutContainer = builder.createElement('div', 'about-container');

            var message = builder.createElement('h5');
            message.innerHTML = 'About Page';

            aboutContainer.appendChild( message );
            container.appendChild( aboutContainer );

            view.bindEvents();
        }

        return container;
    };

    this.bindEvents = function() {

    };

    AbstractView.extend( this, options );
    events.EventEmitter.call( this );
};

util.inherits( AboutView, events.EventEmitter );

AboutView.VIEW_NAME = 'AboutView';

module.exports = AboutView;
