/**
 * @class ChallengeView
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/15/14 8:20 AM
 */
var AbstractView = require('./AbstractView' ),
    util = require('util' ),
    events = require('events');

var ChallengeView = function(options) {
    'use strict';

    var view = this,
        log = options.log,
        container,
        codeInput,
        keyInput,
        loginButton;

    this.getElement = function() {
        var builder = browser.builder;

        if (!container) {
            log.info('create the challenge view');

            container = builder.createElement('div');
            container.id = view.getViewId();

            var challengeContainer = builder.createElement('div', 'challenge-container');
            // create the user login input
            codeInput = builder.createElement('input', 'code-input');
            codeInput.placeholder = 'enter user code';
            codeInput.onblur = function() {
                keyInput.classList.remove('disabled');
            };

            keyInput = builder.createElement('input', 'code-input disabled');
            keyInput.placeholder = 'enter access code';
            keyInput.onblur = function() {
                loginButton.classList.remove('disabled');
            };

            // create the login button
            loginButton = builder.createElement('div', 'button-input disabled');
            loginButton.innerHTML = 'open';

            loginButton.onclick = function() {
                log.info('login clicked, fire event: ', ChallengeView.LOGIN_REQUEST);
                view.emit( ChallengeView.LOGIN_REQUEST );
            };

            challengeContainer.appendChild( codeInput );
            challengeContainer.appendChild( keyInput );
            challengeContainer.appendChild( loginButton );

            container.appendChild( challengeContainer );
        }

        return container;
    };

    AbstractView.extend( this, options );
    events.EventEmitter.call( this );
};

util.inherits( ChallengeView, events.EventEmitter );

ChallengeView.LOGIN_REQUEST = 'loginRequestEvent';
ChallengeView.VIEW_NAME = 'ChallengeView';

module.exports = ChallengeView;
