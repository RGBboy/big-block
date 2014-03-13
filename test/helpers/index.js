'use strict';
/*!
 * Mocks
 */

/**
 * Module Dependencies
 */

var Entity = require('./entity-mock'),
    EntitySystem = require('./entity-system-mock'),
    Component = require('./component-mock'),
    ComponentSystem = require('./component-system-mock'),
    Mocks = {
      Entity: Entity,
      EntitySystem: EntitySystem,
      Component: Component,
      ComponentSystem: ComponentSystem
    };

/**
 * Module Exports
 */

exports = module.exports = Mocks;