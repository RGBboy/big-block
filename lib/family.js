'use strict';
/*!
 * Family
 */

/**
 * Module Dependencies
 */

var Family,
    FamilyProvider,
    EventEmitter = require('events').EventEmitter;

/**
 * Family
 *
 * @param {Array} tokens
 * @param {EntitySystem} entitySystem
 * @return {Family}
 * @api public
 */
Family = function (tokens, entitySystem) {

  var family = new EventEmitter(),
      entities = [];

  /**
   * .hasEntity
   *
   * @param {Entity} entity
   * @return {Boolean}
   *
   * @api public
   */
  family.hasEntity = function (entity) {
    return (entities.indexOf(entity) !== -1);
  };

  /**
   * .forEach
   *
   * @param {Function} fn, called with entity,
   * @return {Boolean}
   *
   * @api public
   */
  family.forEach = function (fn) {
    entities.forEach(fn);
  };

  function addEntity (entity) {
    entity.on('componentremoved', checkAndRemoveEntity);
    entity.on('destroy', removeEntity);
    entities.push(entity);
    family.emit('added', entity);
  };

  function removeEntity (entity) {
    entity.removeListener('componentremoved', checkAndRemoveEntity);
    entity.removeListener('destroy', removeEntity);
    entities.splice(entities.indexOf(entity), 1);
    family.emit('removed', entity);
  };

  function checkAndAddEntity (entity) {
    if (checkEntity(entity)) {
      unwatchEntity(entity);
      addEntity(entity);
    };
  };

  function checkAndRemoveEntity (entity) {
    if (!checkEntity(entity)) {
      removeEntity(entity);
      watchEntity(entity);
    };
  };

  /**
   * .checkEntity
   *
   * @param {Entity} entity
   * @return {Boolean}
   *
   * @api private
   */
  function checkEntity (entity) {
    var i;
    for (i = 0; i < tokens.length; i += 1) {
      if (!entity.hasComponent(tokens[i])) {
        return false;
      };
    };
    return true;
  };

  function initCheckAndAddEntity (entity) {
    if (checkEntity(entity)) {
      addEntity(entity);
    } else {
      watchEntity(entity);
    };
  };

  function watchEntity (entity) {
    entity.on('componentadded', checkAndAddEntity);
  };

  function unwatchEntity (entity) {
    entity.removeListener('componentadded', checkAndAddEntity);
  };

  entitySystem.forEach(initCheckAndAddEntity);

  entitySystem.on('added', initCheckAndAddEntity);

  return family;
};

FamilyProvider = function () {
  return Family;
};

/**
 * Module Exports
 */
exports = module.exports = FamilyProvider;