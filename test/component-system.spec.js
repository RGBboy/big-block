/*!
 * Component System unit tests
 */

/**
 * Module Dependencies
 */

var test = require('tape'),
    sinon = require('sinon'),
    sandbox,
    helpers = require('./helpers'),
    ComponentSystem = require('../lib/component-system'),
    componentSystem,
    EntityMock = helpers.Entity,
    entityMock,
    ComponentMock,
    CustomComponent,
    createdComponents;

/**
 * Setup
 */

var setup = function (t) {
  sandbox = sinon.sandbox.create();
  createdComponents = [];
  ComponentMock = function () {
    var component = helpers.Component(sandbox);
    createdComponents.push(component);
    return component;
  };
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

test('componentSystem.create should return the value returned by calling Component', function (t) {
  var customComponent;

  setup(t);
  t.plan(3);

  customComponent = componentSystem.create(CustomComponent, entityMock);

  t.equal(customComponent, createdComponents[0]);
  t.ok(CustomComponent.calledOnce, 'CustomComponent should be called once');
  t.equal(CustomComponent.firstCall.args[0], createdComponents[0]);

  teardown(t);
});

test('componentSystem.create should pass the entity to the new Component', function (t) {

  setup(t);
  t.plan(2);

  ComponentMock = sandbox.stub();
  componentSystem = ComponentSystem(ComponentMock);

  componentSystem.create(CustomComponent, entityMock);

  t.ok(ComponentMock.calledOnce, 'Component should be called once');
  t.ok(ComponentMock.calledWith(entityMock), 'Component should be called with entity');

  teardown(t);
});