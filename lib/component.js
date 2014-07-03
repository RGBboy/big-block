'use strict';
/*!
 * Component
 *
 * @todo: pass in EventEmitter instance to make testing easier
 * @todo: write test for removing event listeners
 *
 */

/**
 * Module Dependencies
 */

var Component,
    ComponentProvider,
    EventEmitter = require('events').EventEmitter;

/**
 * Component
 *
 * @param {Entity} aEntity
 * @return {Component}
 * @api public
 */

Component = function (entity) {

  var component = new EventEmitter();

  component.entity = entity;

  /**
   * .getComponent
   *
   * Convenience function to entity.getComponent
   *
   * @param {String} type of component
   * @return {Component} 
   *
   * @api public
   */
  component.getComponent = entity.getComponent;

  /**
   * .destroyImmediate
   *
   * @api public
   */
  component.destroyImmediate = function () {
    component.emit('destroy', component);
    component.removeAllListeners();
  };

  /**
   * .destroy
   *
   * @api public
   */
  component.destroy = function () {
    process.nextTick(component.destroyImmediate);
  };
  

  return component;
};

ComponentProvider = function () {
  return Component;
};

/**
 * Dependency Annotation
 */



/**
 * Module Exports
 */
exports = module.exports = ComponentProvider;