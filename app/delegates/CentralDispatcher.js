/**
 * @class CentralDispatcher
 *
 * @author: darryl.west@roundpeg.com
 * @created: 9/14/14 2:10 PM
 */
var dash = require('lodash' ),
    util = require('util' ),
    events = require('events');

var CentralDispatcher = function(options) {
    'use strict';

    var dispatcher = this,
        log = options.log,
        methods = {};

    /**
     * Add a method/closure to the dispatcher.  Methods may only be added once; subsequent attempts to add the same
     * method will throw an error.
     *
     * @param id - the unique signature for this method
     * @param closure - the implementing function
     * @returns dispatcher to enable chaining
     */
    this.addMethod = function( id, closure ) {
        if (id && typeof closure === 'function') {
            log.info('add the method/closure: ', id );

            if (methods.hasOwnProperty( id )) {
                throw new Error("Method Override Not Allowed: method: " + id + " is already defined...");
            }

            methods[ id ] = closure;
            CentralDispatcher.prototype[ id ] = closure;
        } else {
            throw new Error("addMethod requires closure for id " + id);
        }

        return dispatcher;
    };

    /**
     * Override (or add) an existing method to the dispatcher.
     *
     * @param id - the unique signature for this method
     * @param closure - the implementing function
     * @returns dispatcher to enable chaining
     */
    this.overrideMethod = function( id, closure ) {
        if (id && typeof closure === 'function') {
            log.info('override the method: ', id );

            methods[ id ] = closure;
            CentralDispatcher.prototype[ id ] = closure;
        } else {
            throw new Error('addMethod requires closure for id: ' + id);
        }

        return dispatcher;
    };

    /**
     * remove the method from the dispatcher
     *
     * @param id
     */
    this.removeMethod = function( id ) {
        log.info('remove the method: ', id);

        delete methods[ id ];
        delete CentralDispatcher.prototype[ id ];
    };

    /**
     * return true if the method exists for the given id
     *
     * @param id - the formal signature for this method
     * @returns {boolean}
     */
    this.hasMethod = function( id ) {
        return typeof methods[ id ] === 'function';
    };

    /**
     * execute takes the function name, a request object, success and fail callbacks.  it returns
     * whatever the function returns (usually undefined) but is intended for asynchronous use. e.g.,
     * it could invoke an ajax service and handle the success and failure response events.
     *
     * see the unit tests for examples of use...
     */
    this.execute = function( id, request, callback ) {
        var method = methods[ id ];
        if (method) {
            log.info('invoke the method: ', id);

            return method( request, callback );
        } else {
            throw new Error('method not found: ' + id);
        }
    };

    /**
     * return the list of method definitions
     */
    this.getMethods = function() {
        return methods;
    };

    /**
     * return a list (array) of all registered methods
     */
    this.listMethodNames = function() {
        var list = [];
        for (var key in methods) {
            list.push( key );
        }

        return list;
    };

    // constructor validations
    if (!log) throw new Error('dispatcher must be created with a log');

    events.EventEmitter.call( this );
};

util.inherits( CentralDispatcher, events.EventEmitter );

module.exports = CentralDispatcher;