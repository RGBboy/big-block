/*!
 * Big Block unit tests
 */

/**
 * Module Dependencies
 */

var test = require('tape'),
    sinon = require('sinon'),
    di = require('di'),
    BigBlock = require('../index');

/**
 * Setup
 */

var setup = function (t) {
  
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

test('BigBlock.EntitySystem', function (t) {
    t.plan(1);
    t.ok(BigBlock.EntitySystem, 'class should exist');
});

/**
 * bigBlock.get
 */

test('bigBlock.get should be a function', function (t) {
  var game = BigBlock();
  t.plan(1);
  t.equal(typeof game.get, 'function');
});

test('bigBlock.get should return a instantiated singleton', function (t) {
  var game,
      testSystem;

  function TestSystem (entitySystem) {
    this.entitySystem = entitySystem;
  };

  t.plan(3);
  di.annotate(TestSystem, new di.InjectAnnotation(BigBlock.EntitySystem));
  game = BigBlock([TestSystem]);
  testSystem = game.get(TestSystem);
  t.ok(testSystem instanceof TestSystem, 'testSystem is an instance of TestSystem');
  t.ok(testSystem.entitySystem instanceof BigBlock.EntitySystem, 'Injected System is correct instance')
  t.pass();
});