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
    entitySystem;

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

test('family.hasEntity should return true for entities in family', function (t) {
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

  customEntity1 = entitySystem.create();
  customEntity2 = entitySystem.create();
  customEntity3 = entitySystem.create();

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

  customEntity1 = entitySystem.create();
  customEntity2 = entitySystem.create();
  customEntity3 = entitySystem.create();

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

test('family.forEach should callback with entity, index, family and correct context', function (t) {
  var customEntity,
      CustomComponent,
      familyTokens,
      family,
      entities = [],
      context = {};

  setup(t);
  t.plan(4);

  CustomComponent = function () {};

  familyTokens = [CustomComponent];

  customEntity = entitySystem.create();
  customEntity.addComponent(CustomComponent);

  family = entitySystem.getFamily(familyTokens);

  family.forEach(function (aEntity, aIndex, aFamily) {
    t.equal(aEntity, customEntity)
    t.equal(aIndex, 0);
    t.equal(aFamily, family);
    t.equal(this, context);
  }, context);

});

test('family.forEach should callback with the correct entities when they are added in the entity function and the family is instantiated before the entities are created', function (t) {
  var CustomEntity,
      customEntity1,
      customEntity2,
      customEntity3,
      CustomComponent1,
      CustomComponent2,
      familyTokens,
      family,
      testCount = 0,
      expectedFamilyEntities,
      entities = [];

  setup(t);
  t.plan(3);

  CustomComponent1 = function () {};
  CustomComponent2 = function () {};

  CustomEntity = function (scope) {
    scope.addComponent(CustomComponent1);
    scope.addComponent(CustomComponent2);
  };

  familyTokens = [CustomComponent1, CustomComponent2];
  family = entitySystem.getFamily(familyTokens);

  customEntity1 = entitySystem.create(CustomEntity);
  customEntity2 = entitySystem.create(CustomEntity);
  customEntity3 = entitySystem.create(CustomEntity);

  customEntity3.removeComponent(CustomComponent1);

  expectedFamilyEntities = [customEntity1, customEntity2];

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

  customEntity1 = entitySystem.create();
  customEntity2 = entitySystem.create();
  customEntity3 = entitySystem.create();

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

  customEntity1 = entitySystem.create();
  customEntity2 = entitySystem.create();

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

  customEntity1 = entitySystem.create();
  customEntity2 = entitySystem.create();

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

/**
 * family.compare
 */

test('family.compare should callback with the correct entities', function (t) {
  var customEntity1,
      customEntity2,
      customEntity3,
      CustomComponent,
      familyTokens,
      family,
      called = 0;

  setup(t);
  t.plan(19);

  CustomComponent = function () {};

  familyTokens = [CustomComponent];

  customEntity1 = entitySystem.create();
  customEntity2 = entitySystem.create();
  customEntity3 = entitySystem.create();

  customEntity1.addComponent(CustomComponent);
  customEntity2.addComponent(CustomComponent);
  customEntity3.addComponent(CustomComponent);

  family = entitySystem.getFamily(familyTokens);

  family.compare(function (entityA, entityB) {
    called += 1;
    t.ok(entityA === customEntity1 || entityA === customEntity2 || entityA === customEntity3, 'entityA equals one of the families entities');
    t.ok(entityB === customEntity1 || entityB === customEntity2 || entityB === customEntity3, 'entityB equals one of the families entities');
  });

  t.equal(called, 9);

});

test('family.compare should callback with entityA, entityB and correct context', function (t) {
  var customEntity,
      CustomComponent,
      familyTokens,
      family,
      context = {};

  setup(t);
  t.plan(3);

  CustomComponent = function () {};

  familyTokens = [CustomComponent];

  customEntity = entitySystem.create();
  customEntity.addComponent(CustomComponent);

  family = entitySystem.getFamily(familyTokens);

  family.compare(function (entityA, entityB) {
    t.equal(entityA, customEntity);
    t.equal(entityB, customEntity);
    t.equal(this, context);
  }, context);

});

/**
 * family.compareTo
 */

test('family.compareTo should callback with the correct entities', function (t) {
  var customEntityA1,
      customEntityA2,
      customEntityB1,
      customEntityB2,
      CustomComponentA,
      CustomComponentB,
      familyATokens,
      familyBTokens,
      familyA,
      familyB,
      called = 0;

  setup(t);
  t.plan(9);

  CustomComponentA = function () {};
  customEntityA1 = entitySystem.create();
  customEntityA2 = entitySystem.create();
  customEntityA1.addComponent(CustomComponentA);
  customEntityA2.addComponent(CustomComponentA);
  familyATokens = [CustomComponentA];
  familyA = entitySystem.getFamily(familyATokens);

  CustomComponentB = function () {};
  customEntityB1 = entitySystem.create();
  customEntityB2 = entitySystem.create();
  customEntityB1.addComponent(CustomComponentB);
  customEntityB2.addComponent(CustomComponentB);
  familyBTokens = [CustomComponentB];
  familyB = entitySystem.getFamily(familyBTokens);

  familyA.compareTo(familyB, function (entityA, entityB) {
    called += 1;
    t.ok(entityA === customEntityA1 || entityA === customEntityA2, 'entityA equals one of the families entities');
    t.ok(entityB === customEntityB1 || entityB === customEntityB2, 'entityB equals one of the families entities');
  });

  t.equal(called, 4);

});

test('family.compareTo should callback with entityA, entityB and correct context', function (t) {
  var customEntityA,
      customEntityB,
      CustomComponentA,
      CustomComponentB,
      familyATokens,
      familyBTokens,
      familyA,
      familyB,
      context = {};

  setup(t);
  t.plan(3);

  CustomComponentA = function () {};
  familyATokens = [CustomComponentA];
  customEntityA = entitySystem.create();
  customEntityA.addComponent(CustomComponentA);
  familyA = entitySystem.getFamily(familyATokens);

  CustomComponentB = function () {};
  familyBTokens = [CustomComponentB];
  customEntityB = entitySystem.create();
  customEntityB.addComponent(CustomComponentB);
  familyB = entitySystem.getFamily(familyBTokens);

  familyA.compareTo(familyB, function (entityA, entityB) {
    t.equal(entityA, customEntityA);
    t.equal(entityB, customEntityB);
    t.equal(this, context);
  }, context);

});

/**
 * family.compareUnique
 */

test('family.compareUnique should callback with the correct entities', function (t) {
  var customEntity1,
      customEntity2,
      customEntity3,
      CustomComponent,
      familyTokens,
      family,
      called = 0;

  setup(t);
  t.plan(10);

  CustomComponent = function () {};

  familyTokens = [CustomComponent];

  customEntity1 = entitySystem.create();
  customEntity2 = entitySystem.create();
  customEntity3 = entitySystem.create();

  customEntity1.addComponent(CustomComponent);
  customEntity2.addComponent(CustomComponent);
  customEntity3.addComponent(CustomComponent);

  family = entitySystem.getFamily(familyTokens);

  family.compareUnique(function (entityA, entityB) {
    called += 1;
    t.ok(entityA === customEntity1 || entityA === customEntity2 || entityA === customEntity3, 'entityA equals one of the families entities');
    t.ok(entityB === customEntity1 || entityB === customEntity2 || entityB === customEntity3, 'entityB equals one of the families entities');
    t.ok(entityA !== entityB, 'entityA should not equal entityB');
  });

  t.equal(called, 3);

});

test('family.compareUnique should callback with entityA, entityB and correct context', function (t) {
  var customEntity1,
      customEntity2,
      CustomComponent,
      familyTokens,
      family,
      context = {};

  setup(t);
  t.plan(3);

  CustomComponent = function () {};

  familyTokens = [CustomComponent];

  customEntity1 = entitySystem.create();
  customEntity1.addComponent(CustomComponent);

  customEntity2 = entitySystem.create();
  customEntity2.addComponent(CustomComponent);

  family = entitySystem.getFamily(familyTokens);

  family.compareUnique(function (entityA, entityB) {
    t.equal(entityA, customEntity1);
    t.equal(entityB, customEntity2);
    t.equal(this, context);
  }, context);

});

/**
 * family added event
 */

test('family should emit an added event when entities are added', function (t) {
  var customEntity,
      CustomComponent,
      family,
      eventEntity,
      fired = false;

  setup(t);
  t.plan(2);

  CustomComponent = function () {};

  family = entitySystem.getFamily([CustomComponent]);

  family.on('added', function (entity) {
    fired = true;
    eventEntity = entity;
  });

  customEntity = entitySystem.create();
  customEntity.addComponent(CustomComponent);

  t.ok(fired, 'added fired');
  t.equal(eventEntity, customEntity);
  teardown(t);

});


/**
 * family removed event
 */
test('family should emit a removed event when entities are removed', function (t) {
  var customEntity,
      CustomComponent,
      family,
      eventEntity,
      fired = false;

  setup(t);
  t.plan(2);

  CustomComponent = function () {};

  family = entitySystem.getFamily([CustomComponent]);

  customEntity = entitySystem.create();
  customEntity.addComponent(CustomComponent);

  family.on('removed', function (entity) {
    fired = true;
    eventEntity = entity;
  });

  customEntity.removeComponent(CustomComponent);

  t.ok(fired, 'removed fired');
  t.equal(eventEntity, customEntity);
  teardown(t);
});