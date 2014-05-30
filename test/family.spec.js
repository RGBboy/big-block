'use strict';
/*!
 * Family unit tests
 */

/**
 * Module Dependencies
 */

var test = require('tape'),
    sinon = require('sinon'),
    sandbox,
    helpers = require('./helpers'),
    EntitySystemMock = helpers.EntitySystem,
    entitySystemMock,
    components,
    MockComponent1,
    MockComponent2,
    FamilyProvider = require('../lib/family'),
    Family,
    family;

/**
 * Setup
 */

var setup = function (t) {
  sandbox = sinon.sandbox.create();
  MockComponent1 = sandbox.stub();
  MockComponent2 = sandbox.stub();
  components = [MockComponent1, MockComponent2];
  entitySystemMock = EntitySystemMock(sandbox);
  Family = FamilyProvider();
  family = Family(components, entitySystemMock);
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
 * family.length
 */

test('family.length should be a number', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof family.length, 'number');
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

/**
 * family.compare
 */

test('family.compare should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof family.compare, 'function');
  teardown(t);
});

/**
 * family.compareTo
 */

test('family.compareTo should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof family.compareTo, 'function');
  teardown(t);
});

/**
 * family.compareUnique
 */

test('family.compareUnique should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof family.compareUnique, 'function');
  teardown(t);
});