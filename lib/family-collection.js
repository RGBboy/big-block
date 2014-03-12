'use strict';
/*!
 * Family Collection
 */

/**
 * Module Dependencies
 */

var FamilyCollection;

// Node.js has to be run with --harmony_collections to support ES6 Map.
// If not defined, include a polyfill.
if (typeof Map === 'undefined') {
  require('es6-shim');
};

/**
 * Family
 *
 * @return {Family}
 * @api public
 */
FamilyCollection = function () {

  var self = {},
      valueKey = {},
      families = new Map();

  /**
   * .permutate
   *
   * Find all permutations of an array of values and callback with each
   *
   * @param {Array} array
   * @param {Number} index
   * @param {Function} callback
   * @return {Number} count
   *
   * @api private
   */
  function permutate(array, index, callback) {
    if (index == array.length - 1) {
      callback(array);
      return 1;
    } else {
      var count = permutate(array, index + 1, callback);
      for (var i = index + 1; i < array.length; i++) {
        swap(array, i, index);
        count += permutate(array, index + 1, callback);
        swap(array, i, index);
      };
      return count;
    };
  };


  /**
   * .swap
   *
   * Swap elements a[i1] and a[i2]
   *
   * @param {Array} a
   * @param {Number} i1, index
   * @param {Number} i2, index
   * @return {undefined}
   *
   * @api private
   */
  function swap(a, i1, i2) {
    var t = a[i1];
    a[i1] = a[i2];
    a[i2] = t;
  };

  /**
   * .get
   *
   * @param {Array} tokens
   * @return {Family}
   *
   * @api public
   */
  self.get = function (tokens) {
    var i,
        node = families;
    for (i = 0; i < tokens.length; i += 1) {
      node = node.get(tokens[i]);
      if (!node) {
        return;
      };
    };
    return node.get(valueKey);
  };

  /**
   * .set
   *
   * @param {Array} tokens
   * @param {Family} value
   * @return {undefined}
   *
   * @api public
   */
  self.set = function (tokens, value) {
    var i,
        node;

    if (!tokens || tokens.length == 0) {
      throw new Error('Family Collection .store expects an array.');
    };

    permutate(tokens, 0, function (set) {
      node = families;
      for (i = 0; i < set.length; i += 1) {
        if (!node.has(set[i])) {
          node.set(set[i], new Map())
        };
          node = node.get(set[i]);
      };
      node.set(valueKey, value);
    });
  };

  return self;
};

/**
 * Module Exports
 */
exports = module.exports = FamilyCollection;