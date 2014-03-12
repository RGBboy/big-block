/*!
 * Entity System unit tests
 */

/**
 * Module Dependencies
 */

var test = require('tape'),
    sinon = require('sinon'),
    sandbox,
    EntitySystem = require('../lib/entity-system'),
    entitySystem,
    EntityMock;

/**
 * Setup
 */

var setup = function (t) {
  sandbox = sinon.sandbox.create();
  EntityMock = sandbox.stub();
  CustomEntity = sandbox.stub();
  entitySystem = new EntitySystem(EntityMock);
};

/**
 * Teardown
 */

var teardown = function (t) {
  sandbox.restore();
};

/**
 * Entity System Class
 */

test('Entity System', function (t) {
  t.plan(1);
  t.ok(EntitySystem, 'class should exist');
});

/**
 * entitySystem.create
 */

test('entitySystem.create should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof entitySystem.create, 'function');
  teardown(t);
});

test('entitySystem.create should return an instance of a registered entity class', function (t) {
  var customEntity;

  setup(t);
  t.plan(3);

  customEntity = entitySystem.create(CustomEntity);

  t.ok(customEntity instanceof EntityMock, 'return value should be instance of Entity');
  t.ok(CustomEntity.calledOnce, 'CustomEntity should be called once');
  t.ok(CustomEntity.firstCall.args[0] instanceof EntityMock, 'CustomEntity should be called with instance of Entity');

  teardown(t);
});

/**
 * entitySystem.forEach
 */

test('entitySystem.forEach should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof entitySystem.forEach, 'function');
  teardown(t);
});

test('entitySystem.forEach should call passed function with each entity', function (t) {
  var entities = [];

  setup(t);
  t.plan(2);

  entities.push(entitySystem.create(CustomEntity));
  entities.push(entitySystem.create(CustomEntity));

  entitySystem.forEach(function (entity) {
    var index = entities.indexOf(entity);
    t.ok(index !== -1, 'Entity exists in created entities');
    entities.splice(index, 1);
    if (entities.length === 0) {
      teardown(t);
    };
  });
});

/**
 * entitySystem.getFamily
 */

test('entitySystem.getFamily should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof entitySystem.getFamily, 'function');
  teardown(t);
});