/**
 * @class SplashView - a typical view container
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/6/14 3:42 PM
 */
var HidableComponent = require('../components/HidableComponent' ),
    AbstractView = require('./AbstractView');

var SplashView = function(options) {
    'use strict';

    var view = this,
        log = options.log,
        builder = options.componentBuilder,
        container,
        parent;

    /**
     * lazy create of view container
     *
     * @returns the view container
     */
    this.getElement = function() {
        log.info('create the splash view');

        if (!container) {
            container = builder.createElement('div');
            container.id = view.getViewId();

            var splash = builder.createElement('div');
            splash.className = 'splash-container';

            var spinner = builder.createElement('div');
            spinner.className = 'spinner';

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

    // constructor validations
    if (!builder) throw new Error('view constructor must include a component builder');
};

SplashView.VIEW_NAME = 'SplashView';

module.exports = SplashView;