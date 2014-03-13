'use strict';
/*!
 * Family e2e tests
 */

/**
 * Module Dependencies
 */

var test = require('tape'),
    sinon = require('sinon'),
    sandbox,
    FamilyProvider = require('../lib/family'),
    ComponentProvider = require('../lib/component'),
    ComponentSystem = require('../lib/component-system'),
    EntityProvider = require('../lib/entity'),
    EntitySystem = require('../lib/entity-system'),
    Family,
    Component,
    componentSystem,
    Entity,
    entitySystem,
    CustomEntity;

/**
 * Setup
 */

var setup = function (t) {
  sandbox = sinon.sandbox.create();
  Family = FamilyProvider();
  Component = ComponentProvider();
  componentSystem = ComponentSystem(Component);
  Entity = EntityProvider(componentSystem);
  entitySystem = EntitySystem(Family, Entity);
  CustomEntity = function () {};
};

/**
 * Teardown
 */

var teardown = function (t) {
  sandbox.restore();
};

/**
 * family.hasEntity
 */

test('family.hasEntity should return a family', function (t) {
  var customEntity1,
      customEntity2,
      customEntity3,
      CustomComponent1,
      CustomComponent2,
      CustomComponent3,
      familyTokens,
      family;

  setup(t);
  t.plan(4);

  CustomComponent1 = function () {};
  CustomComponent2 = function () {};
  CustomComponent3 = function () {};

  familyTokens = [CustomComponent1, CustomComponent2];

  customEntity1 = entitySystem.create(CustomEntity);
  customEntity2 = entitySystem.create(CustomEntity);
  customEntity3 = entitySystem.create(CustomEntity);

  customEntity1.addComponent(CustomComponent1);
  customEntity1.addComponent(CustomComponent2);
  
  customEntity2.addComponent(CustomComponent1);
  customEntity2.addComponent(CustomComponent2);
  customEntity2.addComponent(CustomComponent3);

  customEntity3.addComponent(CustomComponent1);
  customEntity3.addComponent(CustomComponent3);

  family = entitySystem.getFamily(familyTokens);

  t.ok(family, 'Family should exist');
  t.ok(family.hasEntity(customEntity1), 'Family contains customEntity1');
  t.ok(family.hasEntity(customEntity2), 'Family contains customEntity2');
  t.ok(!family.hasEntity(customEntity3), 'Family does not contains customEntity3');

  teardown(t);
});

/**
 * family.forEach
 */

test('family.forEach should callback with the correct entities', function (t) {
  var customEntity1,
      customEntity2,
      customEntity3,
      CustomComponent1,
      CustomComponent2,
      CustomComponent3,
      familyTokens,
      family,
      testCount = 0,
      expectedFamilyEntities,
      entities = [];

  setup(t);
  t.plan(3);

  CustomComponent1 = function () {};
  CustomComponent2 = function () {};
  CustomComponent3 = function () {};

  familyTokens = [CustomComponent1, CustomComponent2];

  customEntity1 = entitySystem.create(CustomEntity);
  customEntity2 = entitySystem.create(CustomEntity);
  customEntity3 = entitySystem.create(CustomEntity);

  customEntity1.addComponent(CustomComponent1);
  customEntity1.addComponent(CustomComponent2);
  
  customEntity2.addComponent(CustomComponent1);
  customEntity2.addComponent(CustomComponent2);
  customEntity2.addComponent(CustomComponent3);

  customEntity3.addComponent(CustomComponent1);
  customEntity3.addComponent(CustomComponent3);

  expectedFamilyEntities = [customEntity1, customEntity2];

  family = entitySystem.getFamily(familyTokens);

  family.forEach(function (entity) {
    testCount += 1;
    var index = expectedFamilyEntities.indexOf(entity);
    t.ok(index !== -1, 'Entity exists in family');
    expectedFamilyEntities.splice(index, 1);
    if (expectedFamilyEntities.length === 0) {
      t.equal(testCount, 2);
      teardown(t);
    };
  });

});

test('family.forEach should callback with the correct entities when matching entities are added after the family is created', function (t) {
  var customEntity1,
      customEntity2,
      customEntity3,
      CustomComponent1,
      CustomComponent2,
      CustomComponent3,
      familyTokens,
      family,
      testCount = 0,
      expectedFamilyEntities,
      entities = [];

  setup(t);
  t.plan(3);

  CustomComponent1 = function () {};
  CustomComponent2 = function () {};
  CustomComponent3 = function () {};

  familyTokens = [CustomComponent1, CustomComponent2];
  family = entitySystem.getFamily(familyTokens);

  customEntity1 = entitySystem.create(CustomEntity);
  customEntity2 = entitySystem.create(CustomEntity);
  customEntity3 = entitySystem.create(CustomEntity);

  customEntity1.addComponent(CustomComponent1);
  customEntity1.addComponent(CustomComponent2);
  
  customEntity2.addComponent(CustomComponent1);
  customEntity2.addComponent(CustomComponent2);
  customEntity2.addComponent(CustomComponent3);

  customEntity3.addComponent(CustomComponent1);
  customEntity3.addComponent(CustomComponent3);

  expectedFamilyEntities = [customEntity1, customEntity2];

  family.forEach(function (entity) {
    testCount += 1;
    var index = expectedFamilyEntities.indexOf(entity);
    t.ok(index !== -1, 'Entity exists in family');
    expectedFamilyEntities.splice(index, 1);
  });

  t.equal(testCount, 2);
  teardown(t);

});

test('family.forEach should callback with the correct entities when entities are destroyed', function (t) {
  var customEntity1,
      customEntity2,
      CustomComponent1,
      CustomComponent2,
      familyTokens,
      family,
      testCount = 0,
      expectedFamilyEntities,
      entities = [];

  setup(t);
  t.plan(2);

  CustomComponent1 = function () {};
  CustomComponent2 = function () {};

  familyTokens = [CustomComponent1];
  family = entitySystem.getFamily(familyTokens);

  customEntity1 = entitySystem.create(CustomEntity);
  customEntity2 = entitySystem.create(CustomEntity);

  customEntity1.addComponent(CustomComponent1);
  customEntity1.addComponent(CustomComponent2);

  customEntity2.addComponent(CustomComponent1);
  customEntity2.addComponent(CustomComponent2);

  customEntity2.destroy();

  expectedFamilyEntities = [customEntity1];

  family.forEach(function (entity) {
    testCount += 1;
    var index = expectedFamilyEntities.indexOf(entity);
    t.ok(index !== -1, 'Entity exists in family');
    expectedFamilyEntities.splice(index, 1);
  });

  t.equal(testCount, 1);
  teardown(t);

});

test('family.forEach should callback with the correct entities when entities have components removed', function (t) {
  var customEntity1,
      customEntity2,
      CustomComponent1,
      CustomComponent2,
      familyTokens,
      family,
      testCount = 0,
      expectedFamilyEntities,
      entities = [];

  setup(t);
  t.plan(2);

  CustomComponent1 = function () {};
  CustomComponent2 = function () {};

  familyTokens = [CustomComponent1];
  family = entitySystem.getFamily(familyTokens);

  customEntity1 = entitySystem.create(CustomEntity);
  customEntity2 = entitySystem.create(CustomEntity);

  customEntity1.addComponent(CustomComponent1);
  customEntity1.addComponent(CustomComponent2);

  customEntity2.addComponent(CustomComponent1);
  customEntity2.addComponent(CustomComponent2);

  customEntity2.removeComponent(CustomComponent1);

  expectedFamilyEntities = [customEntity1];

  family.forEach(function (entity) {
    testCount += 1;
    var index = expectedFamilyEntities.indexOf(entity);
    t.ok(index !== -1, 'Entity exists in family');
    expectedFamilyEntities.splice(index, 1);
  });

  t.equal(testCount, 1);
  teardown(t);

});