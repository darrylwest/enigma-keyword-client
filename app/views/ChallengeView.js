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

            keyInput = builder.createElement('input', 'code-input disabled');
            keyInput.placeholder = 'enter access code';

            // create the login button
            loginButton = builder.createElement('div', 'button-input disabled');
            loginButton.innerHTML = 'open';

            challengeContainer.appendChild( codeInput );
            challengeContainer.appendChild( keyInput );
            challengeContainer.appendChild( loginButton );

            container.appendChild( challengeContainer );

            view.bindEvents();
        }

        return container;
    };

    this.bindEvents = function() {
        log.info('bind input and button events');

        codeInput.onblur = function() {
            view.emit( view.CODE_REQUEST, codeInput.value );
            keyInput.classList.remove('disabled');
        };

        keyInput.onblur = function() {
            loginButton.classList.remove('disabled');
        };

        loginButton.onclick = function() {
            log.info('login clicked, fire event: ', view.ACCESS_REQUEST);
            view.emit( view.ACCESS_REQUEST, keyInput.value );
        };
    };

    this.getCodeInput = function() {
        return codeInput;
    };

    this.getKeyInput = function() {
        return keyInput;
    };

    this.getLoginButton = function() {
        return loginButton;
    };

    AbstractView.extend( this, options );
    events.EventEmitter.call( this );
};

util.inherits( ChallengeView, events.EventEmitter );

// define event types as object variables
ChallengeView.prototype.CODE_REQUEST = 'codeRequestEvent';
ChallengeView.prototype.ACCESS_REQUEST = 'accessRequestEvent';

ChallengeView.VIEW_NAME = 'ChallengeView';

module.exports = ChallengeView;
