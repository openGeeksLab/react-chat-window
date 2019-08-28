'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var System = function System(props) {
    console.log('props', props);
    return _react2.default.createElement(
        'div',
        { className: 'date-label' },
        _react2.default.createElement(
            'div',
            { className: 'label-style' },
            props.text
        )
    );
};

exports.default = System;
module.exports = exports['default'];