/**
 * @class ComponentBuilder
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/9/14 9:27 AM
 */
var dash = require('lodash' );

var ComponentBuilder = function(options) {
    'use strict';

    var builder = this,
        log = options.log,
        createLogger = options.createLogger,
        doc = browser.getDocument();

    this.createElement = function(tag, className, id) {
        var el = doc.createElement( tag );

        if (typeof className === 'string') {
            el.className =  className;
        } else if (dash.isArray( className )) {
            className.forEach(function(cn) {
                el.classList.add( cn );
            });
        }

        if (typeof id === 'string') {
            log.debug('set the id: ', id);
            el.id = id;
        }

        return el;
    };

    // constructor validations
    if (!log) throw new Error('view must be created with a log');
    if (!createLogger) throw new Error('view must be created with a createLogger method');
    if (!doc) throw new Error('view must be created with a DOM document');
};

module.exports = ComponentBuilder;