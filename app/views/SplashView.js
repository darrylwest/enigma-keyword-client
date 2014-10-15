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
        container;

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

            var msg = builder.createElement('h5');
            msg.innerHTML = 'loading, please wait...';

            // assemble
            splash.appendChild( spinner );
            splash.appendChild( msg );

            container.appendChild( splash );
        }

        return container;
    };

    // this needs to run after getElement is defined
    AbstractView.extend( this, options );

};

SplashView.VIEW_NAME = 'SplashView';

module.exports = SplashView;