'use strict';
/*!
 * Entity System
 */

/**
 * Module Dependencies
 */

var EntitySystem,
    di = require('di'),
    EventEmitter = require('events').EventEmitter,
    Family = require('./family'),
    FamilyCollection = require('./family-collection'),
    Entity = require('./entity');

/**
 * Entity System
 *
 * @param {FamilyClass} Family
 * @param {EntityClass} Entity
 * @return {EntitySystem}
 * @api public
 */
EntitySystem = function (Family, Entity) {

  var self = new EventEmitter(),
      entities = [],
      families = new FamilyCollection();

  function removeEntity (entity) {
    var index = entities.indexOf(entity);
    entities.splice(index, 1);
    self.emit('removed', entity);
  };

  /**
   * .create
   *
   * @param {Function} config, optional
   * @return {Entity} entity
   * @api public
   */
  self.create = function (config) {

    var entity = Entity();
    if (config) {
      config(entity);
    };
    entities.push(entity);
    self.emit('added', entity);
    entity.on('destroy', removeEntity);
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
   * @param {Array} tokens
   * @return {Family}
   * @api public
   */
  self.getFamily = function (tokens) {
    var family = families.get(tokens);

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