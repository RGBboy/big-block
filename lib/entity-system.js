'use strict';
/*!
 * Entity System
 */

/**
 * Module Dependencies
 */

var util = require('util'),
    EntitySystem,
    di = require('di'),
    EventEmitter = require('events').EventEmitter,
    Entity = require('./entity');

/**
 * Entity System
 *
 * @return {EntitySystem}
 * @api public
 */
EntitySystem = function (Entity) {

  var self = new EventEmitter();

  /**
   * .create
   *
   * @param {Function} type
   * @return {Entity} entity
   * @api public
   */
  self.create = function (type) {

    return new type(new Entity());;

  };

  return self;

};

/**
 * Dependency Annotation
 */

di.annotate(EntitySystem, new di.InjectAnnotation(Entity));

/**
 * Module Exports
 */
exports = module.exports = EntitySystem;