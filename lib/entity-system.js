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
function EntitySystem (Entity) {

  var self = this;

  EventEmitter.call(self);

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

util.inherits(EntitySystem, EventEmitter);

/**
 * Dependency Annotation
 */

di.annotate(EntitySystem, new di.InjectAnnotation(Entity));

/**
 * Module Exports
 */
exports = module.exports = EntitySystem;