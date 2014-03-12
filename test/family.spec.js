/*!
 * Family unit tests
 */

/**
 * Module Dependencies
 */

var test = require('tape'),
    sinon = require('sinon'),
    sandbox,
    FamilyProvider = require('../lib/family'),
    Family,
    family;

/**
 * Setup
 */

var setup = function (t) {
  sandbox = sinon.sandbox.create();
  Family = FamilyProvider();
  family = Family();
};

/**
 * Teardown
 */

var teardown = function (t) {
  sandbox.restore();
};

/**
 * Family Class
 */

test('Family', function (t) {
  setup(t);
  t.plan(1);
  t.ok(Family, 'class should exist');
  teardown(t);
});

/**
 * family.hasEntity
 */

test('family.hasEntity should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof family.hasEntity, 'function');
  teardown(t);
});

/**
 * family.forEach
 */

test('family.forEach should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof family.forEach, 'function');
  teardown(t);
});