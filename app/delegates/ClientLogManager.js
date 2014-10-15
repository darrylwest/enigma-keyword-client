/**
 * @class ClientLogManager
 *
 * @author: darryl.west@roundpeg.com
 * @created: 9/12/14 2:26 PM
 */
'use strict';

var ClientLogManager = function(category, level) {
    var logger = this;

    this.getCategory = function() {
        return category;
    };

    // public to enable changing at runtime
    this.level = (level === undefined) ? 1 : level;

    // public instance to enable instance override
    this.log = function(level, obj) {
        var msg = [ ClientLogManager.id++, Date.now(), level, category, obj ];

        logger.logToOutput( msg );

        if (typeof logger.send === 'function') {
            logger.send( msg );
        }
    };
};

/**
 * override this at the application level
 *
 * @param msg
 */
ClientLogManager.prototype.send = function() {}; // noop

ClientLogManager.prototype.logToOutput = function(msg) {
    switch (msg[2]) {
        case 'WARN':
        case 'ERROR':
            console.warn( msg.join(' ') );
            break;
        default:
            console.log( msg.join(' ') );
            break;
    }

};

ClientLogManager.prototype.isDebug = function() {
    return (this.level === 0);
};

ClientLogManager.prototype.debug = function(obj) {
    if (this.level === 0) {
        this.log( 'debug', Array.prototype.slice.call( arguments ).join('') );
    }
};

ClientLogManager.prototype.info = function() {
    if (this.level <= 1) {
        this.log( 'INFO', Array.prototype.slice.call( arguments ).join('') );
    }
};

ClientLogManager.prototype.warn = function(obj) {
    if (this.level <= 2) {
        this.log( 'WARN', Array.prototype.slice.call( arguments ).join('') );
    }
};

ClientLogManager.prototype.error = function(obj) {
    if (this.level <= 3) {
        this.log( 'ERROR', Array.prototype.slice.call( arguments ).join('') );
    }
};

// Constants
ClientLogManager.DEBUG = 0;
ClientLogManager.INFO = 1;
ClientLogManager.WARN = 2;
ClientLogManager.ERROR = 3;

// psuedo-static vars
ClientLogManager.id = 100;
ClientLogManager.loggers = [];

/**
 * factory constructor used to create a group of managed loggers
 */
ClientLogManager.createLogger = function(category, level) {
    if (!category) {
        category = 'Unknown-' + ClientLogManager.loggers.length;
    }

    // public to enable changing at runtime
    level = (level === undefined) ? 1 : level;

    var log = new ClientLogManager( category, level );
    ClientLogManager.loggers.push( log );

    return log;
};

/**
 * set the level of specified array of loggers, or if null to all loggers
 */
ClientLogManager.setLevels = function(level, loggers) {
    if (typeof loggers === "undefined") loggers = ClientLogManager.loggers;

    loggers.forEach(function(logger) {
        logger.level = level;
    });
};


module.exports = ClientLogManager;
