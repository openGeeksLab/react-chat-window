import React, { Component } from 'react';
import Linkify from 'react-linkify';
import { timeformatter } from '../../utils';

var TextMessage = function TextMessage(_ref) {
  var data = _ref.data,
      state = _ref.state;

  return React.createElement(
    'div',
    { className: 'sc-message--text' },
    React.createElement(
      Linkify,
      { properties: { target: '_blank' } },
      data.text
    ),
    React.createElement(
      'div',
      { className: 'sc-message-time' },
      timeformatter(state.timestamp)
    )
  );
};

export default TextMessage;