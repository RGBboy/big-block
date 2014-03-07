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

/**
 * Entity
 *
 * @return {Entity}
 * @api public
 */
Entity = function (ComponentSystem) {

  var entity = new EventEmitter(),
      components = {};

  /**
   * .addComponent
   *
   * @param {String} type
   * @return {Component} component
   *
   * @api public
   */
  entity.addComponent = function (type) {
    var component;
    if (components[type]) {
      throw new error('Entity already has "' + type + '" Component attached');
    };
    component = ComponentSystem.create(type, entity);
    components[type] = component;
    return component;
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
    if (components[type]) {
      return components[type];
    } else {
      throw new error('Entity does not have "' + type + '" Component');
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
    var component = components[type];
    component.destroy();
    delete components[type];
  };

  /**
   * .destroy
   *
   * @api public
   */
  entity.destroy = function () {
    entity.emit('destroy', entity);
    Object.keys(components).forEach(entity.removeComponent);
    entity.removeAllListeners('destroy');
  };

  return entity;
};

EntityProvider = function (ComponentSystem) {
  return function () {
    return new Entity(ComponentSystem);
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