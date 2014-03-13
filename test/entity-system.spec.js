'use strict';
/*!
 * Entity System unit tests
 */

/**
 * Module Dependencies
 */

var test = require('tape'),
    sinon = require('sinon'),
    sandbox,
    helpers = require('./helpers'),
    EntitySystem = require('../lib/entity-system'),
    entitySystem,
    CustomEntity,
    EntityMock,
    FamilyMock,
    createdEntities;

/**
 * Setup
 */

var setup = function (t) {
  sandbox = sinon.sandbox.create();
  createdEntities = [];
  EntityMock = function () {
    var entity = helpers.Entity(sandbox);
    createdEntities.push(entity);
    return entity;
  };
  FamilyMock = sandbox.stub();
  CustomEntity = sandbox.stub();
  entitySystem = new EntitySystem(FamilyMock, EntityMock);
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

test('entitySystem.create should return the value returned by calling Entity', function (t) {
  var entity;

  setup(t);
  t.plan(1);

  entity = entitySystem.create();

  t.equal(entity, createdEntities[0]);

  teardown(t);
});

test('entitySystem.create should call the passed function with the created Entity', function (t) {
  var entity;

  setup(t);
  t.plan(2);

  entity = entitySystem.create(CustomEntity);

  t.ok(CustomEntity.calledOnce, 'CustomEntity should be called once');
  t.equal(CustomEntity.firstCall.args[0], createdEntities[0]);

  teardown(t);
});


test('entitySystem.create should trigger an added event', function (t) {
  var entity,
      eventEntity;
  setup(t);
  t.plan(2);
  entitySystem.on('added', function (entity) {
    t.pass('entitySystem added event fired.');
    eventEntity = entity;
  });
  entity = entitySystem.create();
  t.equal(eventEntity, entity);
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

  entities.push(entitySystem.create());
  entities.push(entitySystem.create());

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

test('entitySystem.getFamily should return a family', function (t) {
  var family,
      Component1 = function () {},
      Component2 = function () {};
  setup(t);
  t.plan(6);
  family = entitySystem.getFamily([Component1, Component2]);
  t.ok(family instanceof FamilyMock, 'return value should be instance of Family');
  t.ok(FamilyMock.calledOnce, 'Family should be called once');
  t.ok(FamilyMock.calledWithNew, 'Family should be called with new');
  t.equal(FamilyMock.firstCall.args[0][0], Component1);
  t.equal(FamilyMock.firstCall.args[0][1], Component2);
  t.equal(FamilyMock.firstCall.args[1], entitySystem);
  teardown(t);
});

test('entitySystem.getFamily should return the same family if it exists', function (t) {
  var family1,
      family2,
      Component1 = function () {},
      Component2 = function () {};
  setup(t);
  t.plan(1);
  family1 = entitySystem.getFamily([Component1, Component2]);
  family2 = entitySystem.getFamily([Component2, Component1]);
  t.equal(family1, family2);
  teardown(t);
});

/**
 * entitySystem removed event
 */

test('entitySystem should emit a removed event when an entity emits destroy', function (t) {
  var entity,
      eventEntity;
  setup(t);
  t.plan(2);
  entitySystem.on('removed', function (entity) {
    t.pass('entitySystem removed event fired.');
    eventEntity = entity;
  });
  entity = entitySystem.create();
  entity.emit('destroy', entity);
  t.equal(eventEntity, entity);
  teardown(t);
});
