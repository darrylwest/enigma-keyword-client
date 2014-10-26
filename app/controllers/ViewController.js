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
        aboutView = options.aboutView,
        navView = options.navView,
        session,
        activeView;

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
            var id = dash.last( event.newURL.split('#') ),
                view;

            log.info('search for view id: ', id);

            view = dash.find( [ homeView, aboutView ], function(view) {
                return view.getViewId().indexOf( id ) >= 0;
            });

            if (view) {
                log.debug('view found from id: ', id);
                if (activeView) {
                    log.info('hide the active view: ', activeView.getViewId());
                    activeView.hide();
                }

                controller.showView( view );
                activeView = view;
            } else {
                log.error('view not found for id: ', id);
            }
        });
    };

    this.configurationHandler = function(conf) {
        log.info('configuration: ', conf);

        navView.configure( conf.navigation );
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
            if (!session) {
                controller.showView( challengeView );
            } else {
                controller.showView( navView );
                controller.showView( homeView );
            }

        }, 2000);
    };

    this.showView = function(view) {
        log.info('show view: ', view.getViewId());

        var doc = browser.getDocument();

        if (doc.getElementById( view.getViewId() )) {
            view.show();
        } else {
            log.info('add view to DOM, id: ', view.getViewId() );
            parentContainer.appendChild( view.getElement() );
        }
    };

    // TODO move all access handlers to the challenge view controller
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
            controller.sessionValidHandler( {} );
        }, 2000);
    };

    this.sessionValidHandler = function(sess) {
        session = sess;

        splashView.hide();

        controller.showView( navView );
        // controller.showView( homeView );
        browser.getLocation().hash = 'home';
    };

    // constructor validations
    if ( !log ) {
        throw new Error( 'controller must be constructed with a logger' );
    }
};

ViewController.CONTROLLER_NAME = 'ViewController';

module.exports = ViewController;