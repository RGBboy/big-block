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
 * @return {Game}
 * @api public
 */
BigBlock = function (modules) {

  var self = {},
      coreModules = [EntitySystem, ComponentSystem, Component, Entity],
      gameModules,
      injector;

  if (modules) {
    coreModules = coreModules.concat(modules);
  };

  injector = new di.Injector(coreModules);

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