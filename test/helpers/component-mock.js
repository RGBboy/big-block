/*!
 * Component Mock
 */

/**
 * Module Dependencies
 */

var ComponentMock;

/**
 * ComponentMock
 *
 * @param {Object} sandbox, Sinon Sandbox
 * @return {ComponentMock}
 */

ComponentMock = function (sandbox) {
  var component = sandbox.stub();
  component.getComponent = sandbox.stub();
  component.destroy = sandbox.stub();
  return component;
};

exports = module.exports = ComponentMock;