/**
 * @class SplashView - a typical view container
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/6/14 3:42 PM
 */
var AbstractView = require('./AbstractView');

var SplashView = function(options) {
    'use strict';

    var view = this,
        log = options.log,
        container,
        message;

    /**
     * lazy create of view container
     *
     * @returns the view container
     */
    this.getElement = function() {
        var builder = browser.builder;

        if (!container) {
            log.info('create the splash view');

            container = builder.createElement('div');
            container.id = view.getViewId();

            var splash = builder.createElement('div', 'splash-container');
            var spinner = builder.createElement('div', 'spinner');

            message = builder.createElement('h5');
            view.setMessage( 'loading, please wait...' );

            // assemble
            splash.appendChild( spinner );
            splash.appendChild( message );

            container.appendChild( splash );
        }

        return container;
    };

    this.setMessage = function(text) {
        if (message) {
            message.innerHTML = text;
        }
    };

    // this needs to run after getElement is defined
    AbstractView.extend( this, options );

};

SplashView.VIEW_NAME = 'SplashView';

module.exports = SplashView;