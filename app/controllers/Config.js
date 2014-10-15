/**
 * @class Config
 *
 * @author: darryl.west@roundpeg.com
 * @created: 9/11/14 7:28 PM
 */
var VERSION = require( '../../package.json' ).version,
    extconfig = require('../../config.json');

var Config = function(env) {
    'use strict';

    var loc = browser.getLocation();

    this.environment = env || 'development';
    this.version = VERSION;

    // use the global browser object to point to the origin
    this.origin = loc.href.replace('index.html', '');

    // standard data host and data URI
    this.dataHostURL = [ loc.protocol, '//', loc.hostname, ':', loc.port ].join('');
    this.dataURI = '/EnigmaService';

    // the standard websocket messaging host
    this.socketClientURL = this.dataHostURL + '/enigma';

    // the appkey is used for x-api-key and id unique for each application
    this.appkey = extconfig.appkey;
    this.usekey = true;

    // single wrapper id
    this.parentContainerId = 'content-wrapper';

    // disable the remote logger
    this.enableLogMessagePublisher = false;
};

Config.development = function() {
    'use strict';

    var config = new Config();
    config.usekey = false;

    return config;
};

Config.test = function() {
    'use strict';

    var config = new Config('test');

    return config;
};

Config.staging = function() {
    'use strict';

    var config = new Config('staging');

    return config;
};

Config.production = function() {
    'use strict';

    var config = new Config('production');

    return config;
};

module.exports = Config;
