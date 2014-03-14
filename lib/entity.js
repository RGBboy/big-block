'use strict';
/*!
 * Entity
 */

/**
 * Module Dependencies
 */

var Entity,
    EntityProvider,
    di = require('di'),
    EventEmitter = require('events').EventEmitter,
    ComponentSystem = require('./component-system');

// Node.js has to be run with --harmony_collections to support ES6 Map.
// If not defined, include a polyfill.
if (typeof Map === 'undefined') {
  require('es6-shim');
};

/**
 * Entity
 *
 * @return {Entity}
 * @api public
 */
Entity = function (componentSystem) {

  var entity = new EventEmitter(),
      components = new Map();

  /**
   * .addComponent
   *
   * @param {Function} type
   * @return {Component} component
   *
   * @api public
   */
  entity.addComponent = function (type) {
    var component;
    if (components.get(type)) {
      throw new Error('Entity already has "' + type + '" Component attached');
    };
    component = componentSystem.create(type, entity);
    components.set(type, component);
    entity.emit('componentadded', entity);
    return component;
  };

  /**
   * .hasComponent
   *
   * @param: {String} type
   * @return {Boolean}
   *
   * @api public
   */
  entity.hasComponent = function (type) {
    return components.has(type);
  };

  /**
   * .getComponent
   *
   * @param: {String} type
   * @return {Component} component
   *
   * @api public
   */
  entity.getComponent = function (type) {
    if (components.has(type)) {
      return components.get(type);
    } else {
      throw new Error('Entity does not have "' + type + '" Component');
    };
  };

  /**
   * .removeComponent
   *
   * @param: {String} type
   *
   * @api public
   */
  entity.removeComponent = function (type) {
    if (components.has(type)) {
      components.get(type).destroy();
      components.delete(type);
      entity.emit('componentremoved', entity);
    } else {
      throw new Error('Entity does not have "' + type + '" Component');
    };
  };

  /**
   * .removeComponentFromMap
   *
   * @param: {*} value
   * @param: {*} key
   * @api private
   */
  function removeComponentFromMap (value, key) {
    entity.removeComponent(key);
  };

  /**
   * .destroy
   *
   * @api public
   */
  entity.destroy = function () {
    entity.emit('destroy', entity);
    components.forEach(removeComponentFromMap);
    entity.removeAllListeners('destroy');
  };

  return entity;
};

EntityProvider = function (componentSystem) {
  return function () {
    return new Entity(componentSystem);
  }
};

/**
 * Dependency Annotation
 */

di.annotate(EntityProvider, new di.InjectAnnotation(ComponentSystem));

/**
 * Module Exports
 */
exports = module.exports = EntityProvider;