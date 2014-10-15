/**
 * @class HidableComponent
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/8/14 8:52 AM
 */
var dash = require('lodash');

var HidableComponent = function(options) {
    'use strict';

    var getElement = options.getElement;

    this.hide = function() {
        getElement().classList.add( HidableComponent.HIDE_CLASS );
    };

    this.show = function() {
        getElement().classList.remove( HidableComponent.HIDE_CLASS );
    };

    this.isHidden = function() {
        return getElement().classList.contains( HidableComponent.HIDE_CLASS );
    };

    if (typeof getElement !== 'function') {
        throw new Error('HidableComponent must be constructed with a getElement method');
    }
};

HidableComponent.HIDE_CLASS = 'hide';

HidableComponent.extend = function(child, options) {
    'use strict';

    var parent = new HidableComponent( options );

    dash.methods( parent ).forEach(function(method) {
        child[ method ] = parent[ method ];
    });

    return parent;
};

module.exports = HidableComponent;