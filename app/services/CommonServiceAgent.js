/**
 * @class CommonServiceAgent - the common service object used for all rest calls.  each of
 * the three calls, query, find and save take a single callback with signature err, res.
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/13/14 7:40 AM
 */
var dash = require('lodash' );

var CommonServiceAgent = function(options) {
    'use strict';

    var service = this,
        log = options.log,
        agent = options.agent,
        apikey = options.appkey,
        host = options.host,
        resource = options.resource,
        timeout = dash.isNumber( options.timeout ) ? options.timeout : 16000,
        includeXAPIKey = options.includeXAPIKey;

    /**
     * query a domain to return a list of data models
     *
     * @param params - any object structure recognized by the back end
     * @param callback - standard err, res signature
     * @returns xhr
     */
    this.query = function(params, callback) {
        var url = [ host, resource, '/query' ].join('');

        log.info('query: ', params, ' from url: ', url, ', api: ', apikey);

        var request = agent.get( url );
        if (params) {
            request.query( params );
        }

        return setRequestHeaders( request ).end( callback );
    };

    /**
     * find and return the single data model based on it's id
     *
     * @param id - the domain's unique id
     * @param callback - standard err, res signature
     * @returns xhr
     */
    this.find = function(id, callback) {
        var url = [ host, resource, '/find/', id ].join('' );

        log.info('find by id: ', id, ' from url: ', url, ', api: ', apikey);

        return setRequestHeaders( agent.get( url ) ).end( callback );
    };

    /**
     * save insert/update a single data model.  if a model has an id it will be located and updated.  models
     * without id will be inserted.  the new/updated model is returned with version, date updated, id, etc.
     *
     * @param model - the domain data model
     * @param callback - standard err, res signature
     * @returns xhr
     */
    this.save = function(model, callback) {
        var url,
            post;

        if (model.id) {
            url = [ host, resource, '/save/', model.id ].join('');
        } else {
            url = [ host, resource, '/save' ].join('');
        }

        post = agent.post( url ).send( model );

        return setRequestHeaders( post ).end( callback );
    };

    // set the request headers for accept, content type, x-api-key, etc.  used by all method calls
    var setRequestHeaders = function(request) {
        log.info('set ');

        request.timeout( timeout );

        request.set('Accept', 'application/json' );
        request.set('Content-type', 'application/json' );

        if (includeXAPIKey) {
            log.debug('set the x api key: ', apikey);
            request.set('X-API-Key', apikey );
        } else {
            log.info('skip the x api key...');
        }

        return request;
    };

    if (!log) throw new Error('service must be constructed with a logger');
    if (!agent) throw new Error('service must be constructed with an agent object');
    if (!host) throw new Error('service must be constructed with a host url');
    if (!resource) throw new Error('service must be constructed with a resource end point');
};

module.exports = CommonServiceAgent;
