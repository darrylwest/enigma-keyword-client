/**
 * @class ViewController
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/6/14 8:55 AM
 */
var dash = require('lodash' ),
    ApplicationStateEvent = require('../events/ApplicationStateEvent');

var ViewController = function(options) {
    'use strict';

    var controller = this,
        log = options.log,
        parentContainer = options.parentContainer,
        splashView = options.splashView;

    this.initListeners = function() {
        log.info('initialize event listeners');

        var dispatcher = browser.dispatcher;

        // configuration, ready, and start
        dispatcher.on( ApplicationStateEvent.CONFIGURATION_READY, controller.configurationHandler );
    };

    this.configurationHandler = function(conf) {
        log.info('configuration: ', conf);

    };

    this.showSplashView = function() {
        log.info('show the splash view');

        var doc = browser.getDocument();

        // show it or build/append/show if it doesn't exist
        if (doc.getElementById( splashView.getViewId() )) {
            splashView.show();
        } else {
            log.info('add splash view to DOM, id: ', splashView.getViewId() );
            parentContainer.appendChild( splashView.getElement() );
        }
    };

    // constructor validations
    if ( !log ) {
        throw new Error( 'controller must be constructed with a logger' );
    }
};

ViewController.CONTROLLER_NAME = 'ViewController';

module.exports = ViewController;