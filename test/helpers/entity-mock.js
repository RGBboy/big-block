/*!
 * Entity Mock
 */

/**
 * Module Dependencies
 */

var EntityMock;

/**
 * EntityMock
 *
 * @param {Object} sandbox, Sinon Sandbox
 * @return {EntityMock}
 * @api public
 */
EntityMock = function (sandbox) {
  var entity = sandbox.stub();
  entity.addComponent = sandbox.stub();
  entity.getComponent = sandbox.stub();
  entity.removeComponent = sandbox.stub();
  entity.destroy = sandbox.stub();
  return entity;
};

/**
 * Module Exports
 */

exports = module.exports = EntityMock