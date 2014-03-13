'use strict';
/*!
 * Entity Mock
 */

/**
 * Module Dependencies
 */

var EntityMock,
    EventEmitter = require('events').EventEmitter;

/**
 * EntityMock
 *
 * @param {Object} sandbox, Sinon Sandbox
 * @return {EntityMock}
 * @api public
 */
EntityMock = function (sandbox) {
  var entity = new EventEmitter();
  entity.addComponent = sandbox.stub();
  entity.hasComponent = sandbox.stub();
  entity.getComponent = sandbox.stub();
  entity.removeComponent = sandbox.stub();
  entity.destroy = sandbox.stub();
  return entity;
};

/**
 * Module Exports
 */

exports = module.exports = EntityMock