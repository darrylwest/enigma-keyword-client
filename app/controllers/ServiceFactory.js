/**
 * @class ServiceFactory
 *
 * @author: darryl.west@roundpeg.com
 * @created: 9/11/14 6:43 PM
 */
var dash = require('lodash' ),
    faye = require('faye' ),
    CommonServiceAgent = require('../services/CommonServiceAgent');

var ServiceFactory = function(options) {
    'use strict';

    var factory = this,
        log = options.log,
        createLogger = options.createLogger,
        agent = options.agent,
        services = {},
        messageClient = options.messageClient;

    this.createConfigurationService = function() {
        var name = 'ConfigurationService',
            service = services[ name ];

        if (!service) {
            log.info('create configuration service');

            var opts = dash.clone( options );
            opts.log = createLogger( name );
            opts.host = [ options.dataHostURL, options.dataURI ].join('');
            opts.resource = '/configuration';
            opts.includeXAPIKey = options.usekey;

            service = new CommonServiceAgent( opts );
            services[ name ] = service;
        }

        return service;
    };

    this.createMessageService = function() {
        log.info('create the socket message service');

        if (!messageClient) {
            log.info('create the faye message client');
            messageClient = new faye.Client( options.socketClientURL );
        }

        return messageClient;
    };

    // constructor validations
    if ( !log ) {
        throw new Error( 'factory must be constructed with a logger' );
    }

    if ( !createLogger ) {
        throw new Error( 'factory must be created with a createLogger closure method' );
    }

    if ( !agent ) {
        throw new Error( 'factory must be constructed with an agent' );
    }
};

module.exports = ServiceFactory;
