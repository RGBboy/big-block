/*!
 * Mocks
 */

/**
 * Module Dependencies
 */

var Entity = require('./entity-mock'),
    Component = require('./component-mock'),
    ComponentSystem = require('./component-system-mock'),
    Mocks = {
      Entity: Entity,
      Component: Component,
      ComponentSystem: ComponentSystem
    };

/**
 * Module Exports
 */

exports = module.exports = Mocks;