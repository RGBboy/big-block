'use strict';
/*!
 * Big Block
 */

/**
 * Module Dependencies
 */

var BigBlock,
    di = require('di'),
    EntitySystem = require('./lib/entity-system'),
    Entity = require('./lib/entity'),
    ComponentSystem = require('./lib/component-system'),
    Component = require('./lib/component');

/**
 * BigBlock
 *
 * @param {Array} systems
 * @return {Game}
 * @api public
 */
BigBlock = function (systems) {

  var self = {},
      coreSystems = [EntitySystem, ComponentSystem, Component, Entity],
      injector;

  if (systems) {
    coreSystems = coreSystems.concat(systems);
  };

  injector = new di.Injector(coreSystems);

  self.get = function (token) {
    return injector.get(token);
  };

  return self;

};

BigBlock.EntitySystem = EntitySystem;

/**
 * Module Exports
 */
exports = module.exports = BigBlock;