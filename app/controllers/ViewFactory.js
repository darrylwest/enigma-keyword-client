/**
 * @class ViewFactory
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/6/14 5:14 PM
 */
var dash = require('lodash'),
    SplashView = require('../views/SplashView' ),
    ChallengeView = require('../views/ChallengeView' ),
    HomeView = require('../views/HomeView' ),
    NavView = require('../views/NavView');

var ViewFactory = function(options) {
    'use strict';

    var factory = this,
        log = options.log,
        createLogger = options.createLogger,
        views = {};

    this.createSplashView = function() {
        var view = views[ SplashView.VIEW_NAME ];

        if (!view) {
            log.info('create the splash view');

            var opts = dash.clone( options );

            if (log.isDebug()) {
                log.debug( JSON.stringify( opts ));
            }

            opts.log = createLogger( SplashView.VIEW_NAME );
            opts.viewName = SplashView.VIEW_NAME;
            opts.viewId = 'splash-view';

            view = new SplashView( opts );

            views[ SplashView.VIEW_NAME ] = view;
        }

        return view;
    };

    this.createChallengeView = function() {
        var view = views[ ChallengeView.VIEW_NAME ];

        if (!view) {
            log.info('create challenge view');

            var opts = dash.clone( options );

            if (log.isDebug()) {
                log.debug( JSON.stringify( opts ));
            }

            opts.log = createLogger( ChallengeView.VIEW_NAME );
            opts.viewName = ChallengeView.VIEW_NAME;
            opts.viewId = 'challenge-view';

            view = new ChallengeView( opts );

            views[ ChallengeView.VIEW_NAME ] = view;
        }

        return view;
    };

    this.createHomeView = function() {
        var view = views[ HomeView.VIEW_NAME ];

        if (!view) {
            log.info('create home view');

            var opts = dash.clone( options );

            if (log.isDebug()) {
                log.debug( JSON.stringify( opts ));
            }

            opts.log = createLogger( HomeView.VIEW_NAME );
            opts.viewName = HomeView.VIEW_NAME;
            opts.viewId = 'home-view';

            view = new HomeView( opts );

            views[ HomeView.VIEW_NAME ] = view;
        }

        return view;
    };

    this.createNavView = function() {
        var view = views[ NavView.VIEW_NAME ];

        if (!view) {
            log.info('create the navigation view');

            var opts = dash.clone( options );

            if (log.isDebug()) {
                log.debug( JSON.stringify( opts ));
            }

            opts.log = createLogger( NavView.VIEW_NAME );
            opts.viewName = NavView.VIEW_NAME;
            opts.viewId = 'nav-view';

            view = new NavView( opts );

            views[ NavView.VIEW_NAME ] = view;
        }

        return view;
    };

    this.getViews = function() {
        return views;
    };

    // constructor validations
    if (!log) throw new Error('view must be created with a log');
    if (!createLogger) throw new Error('view must be created with a create logger method');
};

module.exports = ViewFactory;