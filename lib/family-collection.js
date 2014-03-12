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

  // Do the actual permuation work on array[], starting at index
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

  // Swap elements i1 and i2 in array a[]
  function swap(a, i1, i2) {
    var t = a[i1];
    a[i1] = a[i2];
    a[i2] = t;
  };

  /**
   * .find
   *
   * @param {Array} tokens
   * @return {Family}
   *
   * @api public
   */
  self.find = function (tokens) {
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
   * .store
   *
   * @param {Array} tokens
   * @param {Family} value
   * @return {undefined}
   *
   * @api public
   */
  self.store = function (tokens, value) {
    var i,
        node;

    if (!tokens || tokens.length == 0) {
      throw new Error('Family Collection .store expects an array.');
    };

    // @todo: make sure if tokens is not an array, or an array of no length
    // that it does not overwrite families
    permutate(tokens, 0, function (set) {
      node = families;
      console.log(set);
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