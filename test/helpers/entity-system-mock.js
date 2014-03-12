/*!
 * Entity System Mock
 */

/**
 * Module Dependencies
 */

var EntitySystemMock;

/**
 * EntitySystemMock
 *
 * @param: {Object} sandbox, Sinon Sandbox
 * @return {EntityMock}
 * @api public
 */

EntitySystemMock = function (sandbox) {
  var entitySystem = sandbox.stub();
  entitySystem.register = sandbox.stub();
  entitySystem.create = sandbox.stub();
  return entitySystem;
};

exports = module.exports = EntitySystemMock;