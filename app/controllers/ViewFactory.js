/**
 * @class ViewFactory
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/6/14 5:14 PM
 */
var dash = require('lodash'),
    SplashView = require('../views/SplashView');

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

    // constructor validations
    if (!log) throw new Error('view must be created with a log');
    if (!createLogger) throw new Error('view must be created with a create logger method');
};

module.exports = ViewFactory;