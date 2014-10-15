/**
 * External configuration file with read functions to enable logger and ip/agent filters
 */

'use strict';

var extconfig = require( __dirname + '/../config.json');

module.exports.readConfig = function() {
    var config = extconfig;

    // startPage:'<!DOCTYPE html><html><head><title>Demo App</title><meta HTTP-EQUIV="Refresh" content="0;url=/app/index.html"></head><body></body></html>\n',
    config.daemon = true;

    return config;
};

module.exports.readLoggerConfig = function() {
    var opts = {
        logDirectory: process.env.HOME + '/logs',
        fileNamePattern: [ extconfig.logname, '-', extconfig.port, '-<date>.log' ].join(''),
        dateFormat: 'YYYY.MM.DD'
    };

    return opts;
};

module.exports.readFilters = function() {
    var filters = {};

    filters.ip = {
        accept:[ ],
        reject:[ ]
    };

    filters.agent = {
        accept:[ ],
        reject:[ ]
    };

    return filters;
};

