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
  var componentType = 'test',
      returnedComponent;
  setup(t);
  t.plan(2);
  returnedComponent = entity.addComponent(componentType);
  t.ok(componentSystemMock.create.calledWith(componentType), 'ComponentSystem called with type');
  t.equal(returnedComponent, componentMock);
  teardown(t);
});

test('entity.addComponent should throw if component has been already added', function (t) {
  var componentType = 'test';
  setup(t);
  t.plan(1);
  entity.addComponent(componentType);
  t.throws(function () {
    entity.addComponent(componentType);
  });
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
  var componentType = 'test',
      returnedComponent;
  setup(t);
  t.plan(1);
  returnedComponent = entity.addComponent(componentType);
  t.equal(entity.getComponent(componentType), returnedComponent);
  teardown(t);
});

test('entity.getComponent should throw if the component has not been added', function (t) {
  setup(t);
  t.plan(1);
  t.throws(function () {
    entity.getComponent('test');
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
  var componentType = 'test',
      returnedComponent;
  setup(t);
  t.plan(2);
  returnedComponent = entity.addComponent(componentType);
  t.equal(entity.getComponent(componentType), returnedComponent);
  entity.removeComponent(componentType);
  t.throws(function () {
    entity.getComponent(componentType);
  });
  teardown(t);
});

test('entity.removeComponent should call component.destroy', function (t) {
  var componentType = 'test',
      returnedComponent;
  setup(t);
  t.plan(1);
  returnedComponent = entity.addComponent(componentType);
  entity.removeComponent(componentType);
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
    var componentType1 = 'test1',
        componentType2 = 'test2',
        componentMock1 = ComponentMock(sandbox),
        componentMock2 = ComponentMock(sandbox),
        returnedComponent1,
        returnedComponent2;
    setup(t);
    t.plan(2);

    componentSystemMock.create.returns(componentMock1);
    returnedComponent1 = entity.addComponent(componentType1);
    componentSystemMock.create.returns(componentMock2);
    returnedComponent2 = entity.addComponent(componentType2);
    entity.destroy();

    t.ok(returnedComponent1.destroy.calledOnce, 'component.destroy is called once');
    t.ok(returnedComponent2.destroy.calledOnce, 'component.destroy is called once');

    teardown(t);
});