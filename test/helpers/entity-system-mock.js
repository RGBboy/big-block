'use strict';
/*!
 * Entity System Mock
 */

/**
 * Module Dependencies
 */

var EntitySystemMock,
    EventEmitter = require('events').EventEmitter;

/**
 * EntitySystemMock
 *
 * @param: {Object} sandbox, Sinon Sandbox
 * @return {EntityMock}
 * @api public
 */

EntitySystemMock = function (sandbox) {
  var entitySystem = new EventEmitter();
  entitySystem.create = sandbox.stub();
  entitySystem.forEach = sandbox.stub();
  entitySystem.getFamily = sandbox.stub();
  return entitySystem;
};

exports = module.exports = EntitySystemMock;