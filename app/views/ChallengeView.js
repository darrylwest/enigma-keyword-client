/**
 * @class ChallengeView
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/15/14 8:20 AM
 */
var AbstractView = require('./AbstractView');

var ChallengeView = function(options) {
    'use strict';

    var view = this,
        log = options.log,
        container;

    this.getElement = function() {

        var builder = browser.builder;

        if (!container) {
            log.info('create the challenge view');

            container = builder.createElement('div');
            container.id = view.getViewId();

            // create the user login input

            // create the challenge input

            // create the login button
        }

        return container;
    };

    AbstractView.extend( this, options );
};

ChallengeView.VIEW_NAME = 'ChallengeView';

module.exports = ChallengeView;
