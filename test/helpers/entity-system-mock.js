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
  entitySystem.create = sandbox.stub();
  entitySystem.forEach = sandbox.stub();
  entitySystem.getFamily = sandbox.stub();
  return entitySystem;
};

exports = module.exports = EntitySystemMock;