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
    EventEmitter = require('events').EventEmitter,

/**
 * Component
 *
 * @param {Entity} aEntity
 * @return {Component}
 * @api public
 */

Component = function (entity) {

  var component = new EventEmitter();

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
   * .destroy
   *
   * @api public
   */
  component.destroy = function () {
    component.emit('destroy', component);
    component.removeAllListeners();
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