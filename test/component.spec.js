'use strict';
/*!
 * Component unit tests
 */

/**
 * Module Dependencies
 */

var test = require('tape'),
    sinon = require('sinon'),
    EntityMock = require('./helpers').Entity,
    Component = require('../lib/component')(),
    sandbox,
    entity,
    component;

/**
 * Setup
 */

var setup = function (t) {
  sandbox = sinon.sandbox.create();
  entity = EntityMock(sandbox);
  component = Component(entity);
};

/**
 * Teardown
 */

var teardown = function (t) {
  sandbox.restore();
};

/**
 * Component Class
 */

test('Component should exist', function (t) {
  t.plan(1);
  t.ok(Component, 'class should exist');
});

/**
 * component.entity
 */

test('component.entity should be an object', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof component.entity, 'object');
  teardown(t);
});

test('component.entity should be the entity that this component is attached to', function (t) {
  setup(t);
  t.plan(1);
  t.equal(component.entity, entity);
  teardown(t);
});

/**
 * component.getComponent
 */

test('component.getComponent should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof component.getComponent, 'function');
  teardown(t);
});

test('component.getComponent should call entity.getComponent', function (t) {
  setup(t);
  t.plan(1);
  component.getComponent('Test');
  t.ok(entity.getComponent.calledOnce, 'calls entity.getComponent');
  teardown(t);
});

/**
 * component.destroy
 */

test('component.destroy should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof component.destroy, 'function');
  teardown(t);
});

test('component should emit a destroy event when destroy is called', function (t) {
  setup(t);
  t.plan(2);
  component.on('destroy', function (data) {
    t.pass('fire destroy');
    t.equal(component, data);
    teardown(t);
  });
  component.destroy();
});

test('component.destroy should call destroyImmediate at end of current event loop', function (t) {

  setup(t);
  t.plan(2);

  sandbox.spy(component, 'destroyImmediate');

  component.destroy();

  t.false(component.destroyImmediate.calledOnce, 'component.destroyImmediate should not be called');

  // destroyImmediate is called at end of current event loop
  process.nextTick(function () {
    t.true(component.destroyImmediate.calledOnce, 'component.destroyImmediate should be called');
    teardown(t);
  });
  
});

/**
 * component.destroyImmediate
 */

test('component.destroyImmediate should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof component.destroyImmediate, 'function');
  teardown(t);
});

test('component.destroyImmediate should emit a destroy event', function (t) {
  setup(t);
  t.plan(2);
  component.on('destroy', function (data) {
    t.pass('fire destroy');
    t.equal(component, data);
    teardown(t);
  });
  component.destroyImmediate();
});