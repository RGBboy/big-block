/*!
 * Mocks
 */

/**
 * Module Dependencies
 */

var Entity = require('./entity-mock'),
    Component = require('./component-mock');

/**
 * Module Exports
 *
 * @param: {Object} sandbox, Sinon Sandbox
 */

exports = module.exports = {
  Entity: Entity,
  Component: Component
};