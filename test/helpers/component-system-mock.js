/*!
 * Component System Mock
 */

/**
 * Module Dependencies
 */

var ComponentSystemMock;

/**
 * ComponentSystemMock
 *
 * @param: {Object} sandbox, Sinon Sandbox
 * @return {EntityMock}
 * @api public
 */

ComponentSystemMock = function (sandbox) {
  var componentSystem = sandbox.stub();
  componentSystem.create = sandbox.stub();
  return componentSystem;
};

/**
 * Module Exports
 */

exports = module.exports = ComponentSystemMock;