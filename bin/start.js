#!/usr/bin/env node

'use strict';

var conf = require( __dirname + '/conf' );

require('web-app-runner').createInstance( { configFile:conf } );
