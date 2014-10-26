/**
 * @class ApplicationFactory - it all starts here, in the factory.  The application factory is
 * responsible for building the entire application.  But like a good manager, many jobs are
 * delegated to experts that really know what they are doing.  So, one of the important jobs
 * is it build and configure these workers to give them the power to do what they do best.
 *
 * @author: darryl.west@roundpeg.com
 * @created: 9/11/14 9:48 AM
 */
var dash = require('lodash' ),
    Browser = require('../../app/delegates/Browser' ),
    ClientLogManager = require('../delegates/ClientLogManager' ),
    CentralDispatcher = require('../delegates/CentralDispatcher' ),
    ComponentBuilder = require('../delegates/ComponentBuilder' ),
    Config = require('./Config'),
    ServiceFactory = require('./ServiceFactory' ),
    ViewFactory = require('./ViewFactory' ),
    ViewController = require( './ViewController' ),
    ApplicationStateEvent = require('../events/ApplicationStateEvent');

var ApplicationFactory = function(options) {
    'use strict';

    var factory = this,
        log = options.log,
        dispatcher = options.dispatcher,
        createLogger = options.createLogger, // client logger
        agent = options.agent,
        serviceFactory = options.serviceFactory,
        viewFactory = options.viewFactory,
        componentBuilder = options.componentBuilder, // replace with delegate factory
        controllers = {};

    if (!log) {
        log = createLogger('ApplicationFactory');
    }

    this.createAgent = function() {
        if (!agent) {
            log.info('create the agent');
            agent = require('superagent');
        }

        return agent;
    };

    this.createCentralDispatcher = function() {
        if (!dispatcher) {
            log.info('create the central dispatcher');

            var opts = dash.clone( options );
            opts.log = createLogger('CentralDispatcher');

            dispatcher = new CentralDispatcher( opts );
        }

        return dispatcher;
    };

    this.createServiceFactory = function() {
        if (!serviceFactory) {
            var opts = dash.clone( options );

            opts.log = createLogger( 'ServiceFactory' );
            opts.createLogger = createLogger;
            opts.agent = factory.createAgent();

            serviceFactory = new ServiceFactory( opts );
        }

        return serviceFactory;
    };

    this.createViewFactory = function() {
        if (!viewFactory) {
            log.info('create the view factory');

            var opts = dash.clone( options );

            opts.log = createLogger('ViewFactory');
            opts.createLogger = createLogger;

            viewFactory = new ViewFactory( opts );
        }

        return viewFactory;
    };

    this.createComponentBuilder = function() {
        if (!componentBuilder) {
            log.info('create component builder');

            var opts = dash.clone( options );
            opts.log = createLogger('ComponentBuilder');
            opts.createLogger = createLogger;

            componentBuilder = new ComponentBuilder( opts );
        }

        return componentBuilder;
    };

    this.createViewController = function() {
        var controller = controllers[ ViewController.CONTROLLER_NAME ];

        if (!controller) {
            log.info('create the view controller');

            var opts = dash.clone( options );

            opts.log = createLogger( ViewController.CONTROLLER_NAME );
            opts.parentContainer = factory.getParentContainer();

            factory.createViewFactory();

            opts.splashView = viewFactory.createSplashView();
            opts.challengeView = viewFactory.createChallengeView();
            opts.homeView = viewFactory.createHomeView();
            opts.aboutView = viewFactory.createAboutView();
            opts.navView = viewFactory.createNavView();

            opts.views = viewFactory.getViews();

            controller = new ViewController( opts );

            controllers[ ViewController.CONTROLLER_NAME ] = controller;
        }

        return controller;
    };

    /**
     * return the application's single parent container
     *
     * @returns parent container
     */
    this.getParentContainer = function() {
        var doc = Browser.getInstance().getDocument(),
            container = doc.getElementById( options.parentContainerId );

        if (!container) {
            log.error( 'parent container is not defined');
        }

        return container;
    };

    /**
     * initialize the singleton browser object
     *
     * @returns browser
     */
    this.initBrowser = function() {
        log.info('initialize the browser object');

        if (typeof browser !== 'object') {
            log.info('create the browser object');
            Browser.getInstance();
        }

        browser.builder = factory.createComponentBuilder();
        browser.dispatcher = factory.createCentralDispatcher();

        return browser;
    };

    /**
     * primary call from index page to execute all factory construction and start the application
     */
    this.initialize = function() {
        log.info('initialize the application factory, version: ', options.version, ', environment: ', options.environment);

        // create the factories
        factory.createServiceFactory();
        factory.createViewFactory();

        // create the view controllers
        factory.createViewController();

        // initialize the listeners
        dash.keys( controllers ).forEach(function(name) {
            var controller = factory[ 'create' + name ]();

            controller.initListeners();
        });

        factory.startApplication();
    };

    /**
     * start the main application; show the splash, fetch the remote configuration
     */
    this.startApplication = function() {
        log.info('start the application by showing the splash page and fetching the external configuration');

        factory.createViewController().showSplashView();

        this.fetchConfiguration();
    };

    /**
     * fetch the remote configuration; on error, use the local config; fire configuration ready
     */
    this.fetchConfiguration = function() {
        log.info('fetch the remote configuration');

        var service = factory.createServiceFactory().createConfigurationService();
        service.find( options.environment, function(err, res) {
            var conf;

            if (err) {
                log.error( err );
            } else if (res) {
                if (res.error) {
                    log.error( 'status: ', res.status, ', error: ', res.error );
                } else if (res.body.status === 'ok') {
                    log.info('configuration: ', res.body.status );
                    conf = res.body.configuration;
                }
            }

            if (!conf) {
                log.warn('default to local configuration');
                conf = options.configuration;
            }

            // fire the application ready event
            browser.dispatcher.emit( ApplicationStateEvent.CONFIGURATION_READY, conf );

            // now let the app/controllers know that the factory is complete and app is ready
            setTimeout(function() {
                browser.dispatcher.emit( ApplicationStateEvent.APPLICATION_READY );
            }, 1000);
        });
    };

    // to enable inspection of original config
    this.config = options;
};

ApplicationFactory.bootApplication = function(env) {
    'use strict';

    // initialize the browser for config logic
    Browser.getInstance();

    if (!env) env = 'development';
    var config = new Config[ env ]();

    config.createLogger = ClientLogManager.createLogger;

    var factory = new ApplicationFactory( config );

    factory.initBrowser();
    factory.initialize();

    if (env !== 'production' && typeof window === 'object') {
        window.factory = factory;
    }

    return factory;
};

// make available to window for start up hook
if (typeof window === 'object') {
    window.ApplicationFactory = ApplicationFactory;
}

module.exports = ApplicationFactory;
