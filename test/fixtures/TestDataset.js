/**
 * @class TestDataset
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/25/14 4:46 PM
 */
var dash = require('lodash' ),
    casual = require('casual');

var TestDataset = function() {
    'use strict';

    var dataset = this;

    this.createConfiguration = function() {
        var config = {};
        config.navigation = dataset.createNavConfiguration();

        return config;
    };

    this.createNavConfiguration = function() {
        var navigation = {};

        navigation.appTitle = 'My Application';
        navigation.links = [
            {
                id: 'home',
                label: 'home'
            },
            {
                id: 'about',
                label: 'about'
            },
            {
                id: 'logout',
                label: 'logout'
            }
        ];

        return navigation;
    };
};

module.exports = TestDataset;
