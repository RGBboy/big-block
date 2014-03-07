'use strict';
/*!
 * Component System
 *
 */

/**
 * Module Dependencies
 */

var di = require('di'),
    ComponentSystem,
    EventEmitter = require('events').EventEmitter,
    Component = require('./component');

/**
 * Component System
 *
 * @return {ComponentSystem}
 * @api public
 */
ComponentSystem = function (Component) {

  var self = new EventEmitter();

  /**
   * .create
   *
   * @param {Function} type
   * @param {Entity} entity
   * @return {Component} instance of constructor
   * @api public
   */
  self.create = function (type, entity) {

    return new type(new Component(entity));

  };

  return self;

};

/**
 * Dependency Annotation
 */

di.annotate(ComponentSystem, new di.InjectAnnotation(Component));

/**
 * Module Exports
 */
exports = module.exports = ComponentSystem;