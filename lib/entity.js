'use strict';
/*!
 * Entity
 *
 * @note: This could have the componentTypes system swapped for es6 maps.
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
Entity = function (componentSystem) {

  var entity = new EventEmitter(),
      components = [],
      componentTypes = [];

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
    if (componentTypes.indexOf(type) !== -1) {
      throw new Error('Entity already has "' + type + '" Component attached');
    };
    component = componentSystem.create(type, entity);
    componentTypes.push(type);
    components.push(component);
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
    var index = componentTypes.indexOf(type);
    if (index !== -1) {
      return components[index];
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
    var index = componentTypes.indexOf(type);
    if (index !== -1) {
      components[index].destroy();
      components.splice(index, 1);
      componentTypes.splice(index, 1);
    } else {
      throw new error('Entity does not have "' + type + '" Component');
    };
  };

  /**
   * .destroy
   *
   * @api public
   */
  entity.destroy = function () {
    var i;
    entity.emit('destroy', entity);
    for (i = components.length - 1; i >= 0; i -= 1) {
      components[i].destroy();
      components.pop();
      componentTypes.pop();
    };
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