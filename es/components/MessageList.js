var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Message from './Messages';
import InfiniteScroll from 'react-infinite-scroller';

import { timeLabel, getLastMessageIndex } from '../utils';

var MessageList = (_temp2 = _class = function (_Component) {
  _inherits(MessageList, _Component);

  function MessageList() {
    var _temp, _this, _ret;

    _classCallCheck(this, MessageList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      lastConsumedMessage: null,
      messageList: []
    }, _this.componentDidMount = function () {
      _this.dateDelimether();
    }, _this.dateDelimether = function () {
      var newState = {};

      var _this$props$messages = _this.props.messages,
          messages = _this$props$messages === undefined ? [] : _this$props$messages;
      var lastConsumedMessage = _this.state.lastConsumedMessage;


      var messagesWithLabels = timeLabel(messages);
      newState.messageList = messagesWithLabels;

      var index = getLastMessageIndex(messages);

      console.log('lastConsumedMessage', lastConsumedMessage);
      console.log('index', index);
      if (index && index > lastConsumedMessage) {
        newState.lastConsumedMessage = index;
      }

      _this.setState(_extends({}, newState), function () {
        if (newState.lastConsumedMessage) {
          console.log('newState.lastConsumedMessage', newState.lastConsumedMessage);
          var objDiv = document.getElementsByClassName('sc-message-list')[0];
          objDiv.scrollTop = objDiv.scrollHeight;
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  MessageList.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _props = this.props,
        isOpen = _props.isOpen,
        messages = _props.messages;


    if (prevProps.isOpen !== isOpen && isOpen) {
      this.messagesEnd.scrollIntoView();
    }

    if (prevProps.messages !== messages) {
      this.dateDelimether();
    }
  };

  MessageList.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        recipientAvatar = _props2.recipientAvatar,
        pageStart = _props2.pageStart,
        loadMore = _props2.loadMore,
        isReverse = _props2.isReverse,
        initialLoad = _props2.initialLoad,
        threshold = _props2.threshold,
        hasMore = _props2.hasMore,
        useWindow = _props2.useWindow;
    var messageList = this.state.messageList;


    return React.createElement(
      'div',
      { className: 'sc-message-list' },
      React.createElement(
        InfiniteScroll,
        {
          pageStart: pageStart || 0,
          loadMore: loadMore,
          isReverse: isReverse,
          initialLoad: initialLoad,
          threshold: threshold,
          hasMore: hasMore,
          useWindow: useWindow,
          loader: React.createElement(
            'div',
            { className: 'spinner', key: 0 },
            React.createElement('div', { className: 'rect1' }),
            React.createElement('div', { className: 'rect2' }),
            React.createElement('div', { className: 'rect3' }),
            React.createElement('div', { className: 'rect4' })
          )
        },
        messageList.map(function (message, i) {
          console.log('message', message);
          return React.createElement(Message, {
            recipientAvatar: recipientAvatar,
            message: message,
            key: i });
        }),
        React.createElement('div', { style: { float: "left", clear: "both" },
          ref: function ref(el) {
            _this2.messagesEnd = el;
          } })
      )
    );
  };

  return MessageList;
}(Component), _class.defaultProps = {
  messages: []
}, _temp2);


MessageList.propTypes = process.env.NODE_ENV !== "production" ? {
  pageStart: PropTypes.number,
  loadMore: PropTypes.func.isRequired,
  isReverse: PropTypes.bool.isRequired,
  initialLoad: PropTypes.bool.isRequired,
  threshold: PropTypes.number,
  hasMore: PropTypes.bool.isRequired,
  useWindow: PropTypes.bool.isRequired
} : {};

export default MessageList;