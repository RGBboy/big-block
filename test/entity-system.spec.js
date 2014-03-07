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
 * instance
 */

test('entitySystem should be an instanceof EntitySystem', function (t) {
  setup(t);
  t.plan(1);
  t.ok(entitySystem instanceof EntitySystem, 'entitySystem is an instance of EntitySystem');
  teardown(t);
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
  t.plan(4);

  customEntity = entitySystem.create(CustomEntity);

  t.ok(customEntity instanceof CustomEntity, 'return value should be instance of registered component');
  t.ok(CustomEntity.calledOnce, 'CustomEntity should be called once');
  t.ok(CustomEntity.calledWithNew(), 'CustomEntity should be called with new');
  t.ok(CustomEntity.firstCall.args[0] instanceof EntityMock, 'CustomEntity should be called with instance of Entity');

  teardown(t);
});