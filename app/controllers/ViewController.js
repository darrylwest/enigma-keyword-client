/**
 * @class ViewController
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/6/14 8:55 AM
 */
var dash = require('lodash' ),
    ApplicationStateEvent = require('../events/ApplicationStateEvent' );

var ViewController = function(options) {
    'use strict';

    var controller = this,
        log = options.log,
        parentContainer = options.parentContainer,
        splashView = options.splashView,
        challengeView = options.challengeView,
        views = options.views;

    this.initListeners = function() {
        log.info('initialize event listeners');

        var dispatcher = browser.dispatcher;

        // configuration, ready, and start
        dispatcher.on( ApplicationStateEvent.CONFIGURATION_READY, controller.configurationHandler );

        challengeView.on( challengeView.CODE_REQUEST, controller.codeRequestHandler );
        challengeView.on( challengeView.ACCESS_REQUEST, controller.accessRequestHandler );
    };

    this.configurationHandler = function(conf) {
        log.info('configuration: ', conf);

    };

    this.codeRequestHandler = function() {
        log.info('code validation request');
    };

    this.accessRequestHandler = function() {
        log.info('access validation requested');

        challengeView.hide();
        splashView.setMessage('validating, please wait...');
        splashView.show();

        // now show the home view...
        setTimeout(function() {
            splashView.hide();
            controller.showChallengeView();
        }, 3000);
    };

    this.hideViews = function() {
        dash.values( views ).forEach(function(view) {
            view.hide();
        });
    };

    this.showSplashView = function() {
        log.info('show the splash view');

        var doc = browser.getDocument();

        // controller.hideViews();

        // show it or build/append/show if it doesn't exist
        if (doc.getElementById( splashView.getViewId() )) {
            splashView.show();
        } else {
            log.info('add splash view to DOM, id: ', splashView.getViewId() );
            parentContainer.appendChild( splashView.getElement() );
        }

        setTimeout(function() {
            splashView.hide();
            controller.showChallengeView();
        }, 2000);
    };

    this.showChallengeView = function() {
        log.info('show the challenge view');

        var doc = browser.getDocument();

        if (doc.getElementById( challengeView.getViewId() )) {
            challengeView.show();
        } else {
            log.info('add challenge view to DOM, id: ', challengeView.getViewId() );
            parentContainer.appendChild( challengeView.getElement() );
        }
    };

    // constructor validations
    if ( !log ) {
        throw new Error( 'controller must be constructed with a logger' );
    }
};

ViewController.CONTROLLER_NAME = 'ViewController';

module.exports = ViewController;