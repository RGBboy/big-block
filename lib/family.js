'use strict';
/*!
 * Family
 */

/**
 * Module Dependencies
 */

var Family,
    FamilyProvider;

/**
 * Family
 *
 * @return {Family}
 * @api public
 */
Family = function () {

  var family = {};

  /**
   * .hasEntity
   *
   * @param {Entity} entity
   * @return {Boolean}
   *
   * @api public
   */
  family.hasEntity = function (entity) {
    return false;
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

  };

  return family;
};

FamilyProvider = function () {
  return Family;
};

/**
 * Module Exports
 */
exports = module.exports = FamilyProvider;