/**
 * @class ViewController - control startup and session management.  this view controller also
 * controls view navigation by listening for viewchange events from nav view.  For larger projects
 * this logic should be done in a nav view controller.
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
        origin = options.origin,
        parentContainer = options.parentContainer,
        splashView = options.splashView,
        challengeView = options.challengeView,
        homeView = options.homeView,
        navView = options.navView,
        session;

    this.initListeners = function() {
        log.info('initialize event listeners');

        var dispatcher = browser.dispatcher,
            loc = browser.getLocation(),
            win = browser.getWindow();

        // configuration, ready, and start
        dispatcher.on( ApplicationStateEvent.CONFIGURATION_READY, controller.configurationHandler );

        challengeView.on( challengeView.CODE_REQUEST, controller.codeRequestHandler );
        challengeView.on( challengeView.ACCESS_REQUEST, controller.accessRequestHandler );

        navView.on('viewchange', function(id) {
            log.info('change to view: ', id);

            log.info( id === 'logout' );

            if (id === 'logout') {
                log.info('origin: ', origin);
                loc.replace( origin );
            } else {
                loc.hash = id;
            }
        });

        win.addEventListener('hashchange', function(event) {
            log.info('last url: ', event.oldURL );
            log.info('new url: ', event.newURL );

            // show the view
        });
    };

    this.configurationHandler = function(conf) {
        log.info('configuration: ', conf);

        // assign configuration to views
    };

    this.showSplashView = function() {
        log.info('show the splash view: ', splashView.getViewId() );

        var doc = browser.getDocument(),
            loc = browser.getLocation();

        if (!session && loc.hash !== '') {
            log.info('initialize the hash');
            loc.hash = '';
        }

        // show it or build/append/show if it doesn't exist
        if (doc.getElementById( splashView.getViewId() )) {
            splashView.show();
        } else {
            log.info('add splash view to DOM, id: ', splashView.getViewId() );
            parentContainer.appendChild( splashView.getElement() );
        }

        setTimeout(function() {
            splashView.hide();

            // skip the challenge for now
            if (false) {
                controller.showChallengeView();
            } else {
                controller.showNavView();
                controller.showHomeView();
            }

        }, 2000);
    };

    this.showChallengeView = function() {
        log.info('show the challenge view: ', challengeView.getViewId() );

        var doc = browser.getDocument();

        if (doc.getElementById( challengeView.getViewId() )) {
            challengeView.show();
        } else {
            log.info('add challenge view to DOM, id: ', challengeView.getViewId() );
            parentContainer.appendChild( challengeView.getElement() );
        }
    };

    this.showHomeView = function() {
        log.info('show the home view: ', homeView.getViewId());

        var doc = browser.getDocument();

        if (doc.getElementById( homeView.getViewId() )) {
            homeView.show();
        } else {
            log.info('add home view to DOM, id: ', homeView.getViewId() );
            parentContainer.appendChild( homeView.getElement() );
        }
    };

    this.showNavView = function() {
        log.info('show the nav view: ', navView.getViewId() );

        var doc = browser.getDocument();

        if (doc.getElementById( navView.getViewId() )) {
            navView.show();
        } else {
            log.info('add nav view to DOM, id: ', navView.getViewId() );
            parentContainer.appendChild( navView.getElement() );
        }
    };

    // TODO move this to the challenge view controller
    this.codeRequestHandler = function(value) {
        log.info('code validation request: ', value);
    };

    this.accessRequestHandler = function(value) {
        log.info('access validation requested: ', value);

        challengeView.hide();
        splashView.setMessage('validating, please wait...');
        splashView.show();

        // now show the home view...
        setTimeout(function() {
            splashView.hide();
            controller.showNavView();
            controller.showHomeView();
        }, 2000);
    };

    // constructor validations
    if ( !log ) {
        throw new Error( 'controller must be constructed with a logger' );
    }
};

ViewController.CONTROLLER_NAME = 'ViewController';

module.exports = ViewController;