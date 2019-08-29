'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLinkify = require('react-linkify');

var _reactLinkify2 = _interopRequireDefault(_reactLinkify);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextMessage = function TextMessage(_ref) {
  var data = _ref.data,
      state = _ref.state;

  return _react2.default.createElement(
    'div',
    { className: 'sc-message--text' },
    _react2.default.createElement(
      _reactLinkify2.default,
      { properties: { target: '_blank' } },
      data.text
    ),
    _react2.default.createElement(
      'div',
      { className: 'sc-message-time' },
      (0, _utils.getTimestamp)(state.timestamp) + ' ' + (0, _utils.timeformatter)(state.timestamp)
    )
  );
};

exports.default = TextMessage;
module.exports = exports['default'];