/*!
 * Family Collection unit tests
 */

/**
 * Module Dependencies
 */

var test = require('tape'),
    FamilyCollection = require('../lib/family-collection'),
    familyCollection;

/**
 * Setup
 */

var setup = function (t) {
  familyCollection = FamilyCollection();
};

/**
 * Teardown
 */

var teardown = function (t) {
};

/**
 * FamilyCollection Class
 */

test('FamilyCollection', function (t) {
  setup(t);
  t.plan(1);
  t.ok(FamilyCollection, 'class should exist');
  teardown(t);
});

/**
 * familyCollection.get
 */

test('familyCollection.get should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof familyCollection.get, 'function');
  teardown(t);
});

test('familyCollection.get should return a stored family', function (t) {
  var key1 = {},
      key2 = {},
      key3 = {},
      value = {};
  setup(t);
  t.plan(1);
  familyCollection.set([key1, key2, key3], value);
  t.equal(familyCollection.get([key1, key2, key3]), value);
  teardown(t);
});

test('familyCollection.get should return a stored family no matter the order of keys', function (t) {
  var key1 = {},
      key2 = {},
      key3 = {},
      value = {};
  setup(t);
  t.plan(1);
  familyCollection.set([key1, key2, key3], value);
  t.equal(familyCollection.get([key2, key1, key3]), value);
  teardown(t);
});

test('familyCollection.get should return undefined when nothing is stored against commutative key', function (t) {
  var key1 = {},
      key2 = {},
      key3 = {};
  setup(t);
  t.plan(1);
  t.equal(familyCollection.get([key2, key1, key3]), undefined);
  teardown(t);
});

/**
 * familyCollection.set
 */

test('familyCollection.set should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof familyCollection.set, 'function');
  teardown(t);
});

test('familyCollection.set should throw if passed an array of 0 length', function (t) {
  setup(t);
  t.plan(1);
  t.throws(function () {
    familyCollection.set([], value);
  });
  teardown(t);
});

test('familyCollection.set should throw if not passed an array of tokens', function (t) {
  setup(t);
  t.plan(2);
  t.throws(function () {
    familyCollection.set({}, value);
  });
  t.throws(function () {
    familyCollection.set('t', value);
  });
  teardown(t);
});