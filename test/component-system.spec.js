/*!
 * Component System unit tests
 */

/**
 * Module Dependencies
 */

var test = require('tape'),
    sinon = require('sinon'),
    sandbox,
    ComponentSystem = require('../lib/component-system'),
    componentSystem,
    EntityMock = require('./helpers').Entity,
    entityMock,
    ComponentMock,
    CustomComponent;

/**
 * Setup
 */

var setup = function (t) {
  sandbox = sinon.sandbox.create();
  ComponentMock = sandbox.stub();
  CustomComponent = sandbox.stub();
  componentSystem = ComponentSystem(ComponentMock);
  entityMock = EntityMock(sandbox);
};

/**
 * Teardown
 */

var teardown = function (t) {
  sandbox.restore();
};

/**
 * Component System Class
 */

test('Component System', function (t) {
  t.plan(1);
  t.ok(ComponentSystem, 'class should exist');
});

/**
 * componentSystem.create
 */

test('componentSystem.create should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof componentSystem.create, 'function');
  teardown(t);
});

test('componentSystem.create should return an instance of a registered component class', function (t) {
  var customComponent;

  setup(t);
  t.plan(4);

  customComponent = componentSystem.create(CustomComponent, entityMock);

  t.ok(customComponent instanceof CustomComponent, 'return value should be instance of registered component');
  t.ok(CustomComponent.calledOnce, 'CustomComponent should be called once');
  t.ok(CustomComponent.calledWithNew(), 'CustomComponent should be called with new');
  t.ok(CustomComponent.firstCall.args[0] instanceof ComponentMock, 'CustomComponent should be called with instance of Component');

  teardown(t);
});

test('componentSystem.create should pass the entity to the new Component', function (t) {

  setup(t);
  t.plan(3);

  componentSystem.create(CustomComponent, entityMock);

  t.ok(ComponentMock.calledOnce, 'Component should be called once');
  t.ok(ComponentMock.calledWithNew(), 'Component should be called with new');
  t.ok(ComponentMock.calledWith(entityMock), 'Component should be called with entity');

  teardown(t);
});