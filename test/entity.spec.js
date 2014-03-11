/*!
 * Entity unit tests
 */

/**
 * Module Dependencies
 */

var test = require('tape'),
    sinon = require('sinon'),
    sandbox,
    EntityProvider = require('../lib/entity'),
    Entity,
    entity,
    helpers = require('./helpers'),
    ComponentMock = helpers.Component,
    component,
    ComponentSystemMock = helpers.ComponentSystem,
    componentSystem;

/**
 * Setup
 */

var setup = function (t) {
  sandbox = sinon.sandbox.create();
  componentMock = ComponentMock(sandbox);
  componentSystemMock = ComponentSystemMock(sandbox);
  componentSystemMock.create.returns(componentMock);
  Entity = EntityProvider(componentSystemMock);
  entity = Entity();
};

/**
 * Teardown
 */

var teardown = function (t) {
  sandbox.restore();
};

/**
 * Entity Class
 */

test('Entity', function (t) {
  setup(t);
  t.plan(1);
  t.ok(Entity, 'class should exist');
  teardown(t);
});

/**
 * entity.addComponent
 */

test('entity.addComponent should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof entity.addComponent, 'function');
  teardown(t);
});

test('entity.addComponent should return the value from ComponentSystem.create(type)', function (t) {
  var CustomComponent = function () {},
      returnedComponent;
  setup(t);
  t.plan(2);
  returnedComponent = entity.addComponent(CustomComponent);
  t.ok(componentSystemMock.create.calledWith(CustomComponent), 'ComponentSystem called with type');
  t.equal(returnedComponent, componentMock);
  teardown(t);
});

test('entity.addComponent should throw if component has been already added', function (t) {
  var CustomComponent = function () {};
  setup(t);
  t.plan(1);
  entity.addComponent(CustomComponent);
  t.throws(function () {
    entity.addComponent(CustomComponent);
  });
  teardown(t);
});

test('entity.addComponent should not throw if 2 components with equal toString values are added', function (t) {
  var CustomComponent1 = function () {},
      CustomComponent2 = function () {};
  setup(t);
  t.plan(2);
  t.equal(CustomComponent1.toString(), CustomComponent2.toString());
  entity.addComponent(CustomComponent1);
  t.doesNotThrow(function () {
    entity.addComponent(CustomComponent2);
  });
  teardown(t);
});

/**
 * entity.hasComponent
 */

test('entity.hasComponent should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof entity.hasComponent, 'function');
  teardown(t);
});

test('entity.hasComponent should return the true if entity has the component', function (t) {
  var CustomComponent = function () {};
  setup(t);
  t.plan(1);
  entity.addComponent(CustomComponent);
  t.equal(entity.hasComponent(CustomComponent), true);
  teardown(t);
});

test('entity.hasComponent should return the false if entity does not have the component', function (t) {
  var CustomComponent = function () {};
  setup(t);
  t.plan(1);
  t.equal(entity.hasComponent(CustomComponent), false);
  teardown(t);
});

/**
 * entity.getComponent
 */

test('entity.getComponent should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof entity.getComponent, 'function');
  teardown(t);
});

test('entity.getComponent should return the correct component', function (t) {
  var CustomComponent = function () {},
      returnedComponent;
  setup(t);
  t.plan(1);
  returnedComponent = entity.addComponent(CustomComponent);
  t.equal(entity.getComponent(CustomComponent), returnedComponent);
  teardown(t);
});

test('entity.getComponent should throw if the component has not been added', function (t) {
  var CustomComponent = function () {};
  setup(t);
  t.plan(1);
  t.throws(function () {
    entity.getComponent(CustomComponent);
  });
  teardown(t);
});

/**
 * entity.removeComponent
 */

test('entity.removeComponent should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof entity.removeComponent, 'function');
  teardown(t);
});

test('entity.removeComponent should remove the component', function (t) {
  var CustomComponent = function () {},
      returnedComponent;
  setup(t);
  t.plan(2);
  returnedComponent = entity.addComponent(CustomComponent);
  t.equal(entity.getComponent(CustomComponent), returnedComponent);
  entity.removeComponent(CustomComponent);
  t.throws(function () {
    entity.getComponent(CustomComponent);
  });
  teardown(t);
});

test('entity.removeComponent should call component.destroy', function (t) {
  var CustomComponent = function () {},
      returnedComponent;
  setup(t);
  t.plan(1);
  returnedComponent = entity.addComponent(CustomComponent);
  entity.removeComponent(CustomComponent);
  t.ok(returnedComponent.destroy.calledOnce, 'component.destroy called once');
  teardown(t);
});

/**
 * entity.destroy
 */

test('entity.destroy should be a function', function (t) {
    setup(t);
    t.plan(1);
    t.equal(typeof entity.destroy, 'function');
    teardown(t);
});

test('entity.destroy should emit a destroy event', function (t) {
    setup(t);
    t.plan(2);
    entity.on('destroy', function (data) {
      t.pass('fire destroy');
      t.equal(entity, data);
    });
    entity.destroy();
    teardown(t);
});

test('entity.destroy should call destroy on all components', function (t) {
    var CustomComponent1 = function () {},
        CustomComponent2 = function () {},
        componentMock1 = ComponentMock(sandbox),
        componentMock2 = ComponentMock(sandbox),
        returnedComponent1,
        returnedComponent2;
    setup(t);
    t.plan(2);

    componentSystemMock.create.returns(componentMock1);
    returnedComponent1 = entity.addComponent(CustomComponent1);
    componentSystemMock.create.returns(componentMock2);
    returnedComponent2 = entity.addComponent(CustomComponent2);
    entity.destroy();

    t.ok(returnedComponent1.destroy.calledOnce, 'component.destroy is called once');
    t.ok(returnedComponent2.destroy.calledOnce, 'component.destroy is called once');

    teardown(t);
});