/*!
 * Big Block unit tests
 */

/**
 * Module Dependencies
 */

var test = require('tape'),
    sinon = require('sinon'),
    BigBlock = require('../index'),
    game;

/**
 * Setup
 */

var setup = function (t) {
  game = BigBlock();
};

/**
 * Teardown
 */

var teardown = function (t) {
};

/**
 * BigBlock Class
 */

test('BigBlock', function (t) {
    t.plan(1);
    t.ok(BigBlock, 'class should exist');
});