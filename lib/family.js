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
   * @param {Function} callback, called with entity, index, family
   * @param {Object} thisArg, context to call callback with, optional
   * @return {undefined}
   *
   * @api public
   */
  family.forEach = function (callback, thisArg) {

    var T, k;

    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    };

    if (thisArg) {
      T = thisArg;
    };

    for (k = 0; k < entities.length; k += 1) {
      callback.call(T, entities[k], k, family);
    };

  };

  /**
   * .compareTo
   *
   * @param {Family} compareTo, family to compare each entity to
   * @param {Callback} callback, called with entityA, entityB
   * @param {Object} thisArg, context to call callback with, optional
   * @return {undefined}
   *
   * @api public
   */
  family.compareTo = function (compareTo, callback, thisArg) {
    var T;

    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    };

    if (thisArg) {
      T = thisArg;
    };

    function compareTo1 (entity, index, aFamily) {
      family.forEach(compareTo2, entity);
    };
    function compareTo2 (entity, index, aFamily) {
      callback.call(thisArg, entity, this);
    };
    compareTo.forEach(compareTo1);
  };

  /**
   * .compare
   *
   * @param {Callback} callback, called with entityA, entityB
   * @param {Object} thisArg, context to call callback with, optional
   * @return {undefined}
   *
   * @api public
   */
  family.compare = function (callback, thisArg) {
    family.compareTo(family, callback, thisArg);
  };

  /**
   * .compareUnique
   *
   * calls back with a unique combination of two entities.
   *
   * @param {Callback} callback, called with entityA, entityB
   * @param {Object} thisArg, context to call callback with, optional
   * @return {undefined}
   *
   * @api public
   */
  family.compareUnique = function (callback, thisArg) {
    var T,
        i,
        j;

    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    };

    if (thisArg) {
      T = thisArg;
    };

    for (i = 0; i < entities.length - 1; i += 1) {
      for (j = i + 1; j < entities.length; j += 1) {
        callback.call(T, entities[i], entities[j]);
      };
    };
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