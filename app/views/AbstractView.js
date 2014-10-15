/**
 * @class AbstractView
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/9/14 8:17 AM
 */
var dash = require('lodash' ),
    HidableComponent = require('../components/HidableComponent' );

var AbstractView = function(options) {
    'use strict';

    var view = this,
        log = options.log,
        getElement = options.getElement,
        viewName = options.viewName,
        viewId = options.viewId;

    HidableComponent.extend( this, options );

    this.getViewName = function() {
        log.debug('view name: ', viewName);
        return viewName;
    };

    this.getViewId = function() {
        log.debug('view id: ', viewId);
        return viewId;
    };

    // constructor validations
    if (!log) throw new Error('view must be created with a log');
    if (!viewName) throw new Error('view must be created with a view name');
    if (!viewId) throw new Error('view must be created with a view id');
    if (!getElement) throw new Error('view must be created with a getElement method');
};

AbstractView.extend = function(child, options) {
    'use strict';

    // insure that there is a getElement method
    if (typeof options.getElement !== 'function') {
        options.getElement = child.getElement;
    }

    var parent = new AbstractView( options );

    dash.methods( parent ).forEach(function(method) {
        child[ method ] = parent[ method ];
    });

    return parent;
};

module.exports = AbstractView;