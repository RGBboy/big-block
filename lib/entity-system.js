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
    Family = require('./family'),
    FamilyCollection = require('./family-collection'),
    Entity = require('./entity');

/**
 * Entity System
 *
 * @return {EntitySystem}
 * @api public
 */
EntitySystem = function (Family, Entity) {

  var self = new EventEmitter(),
      entities = [],
      families = new FamilyCollection();

  /**
   * .create
   *
   * @param {Function} type
   * @return {Entity} entity
   * @api public
   */
  self.create = function (type) {

    var entity = new Entity()
    type(entity);
    entities.push(entity);
    return entity;

  };

  /**
   * .forEach
   *
   * @param {Function} fn
   * @return {undefined}
   * @api public
   */
  self.forEach = function (fn) {
    entities.forEach(fn);
  };

  /**
   * .getFamily
   *
   * @param {...} component tokens
   * @return {Family}
   * @api public
   */
  self.getFamily = function () {
    var tokens = Array.prototype.slice.call(arguments),
        family = families.get(tokens);

    if (!family) {
      family = new Family(tokens, self);
      families.set(tokens, family);
    };

    return family;

  };

  return self;

};

/**
 * Dependency Annotation
 */

di.annotate(EntitySystem, new di.InjectAnnotation(Family, Entity));

/**
 * Module Exports
 */
exports = module.exports = EntitySystem;