function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Message from './Messages';
import InfiniteScroll from 'react-infinite-scroller';

var MessageList = function (_Component) {
  _inherits(MessageList, _Component);

  function MessageList() {
    var _temp, _this, _ret;

    _classCallCheck(this, MessageList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      onlyOnce: false
    }, _this.componentDidMount = function () {
      _this.messagesEnd.scrollIntoView();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  MessageList.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var isOpen = this.props.isOpen;
    var onlyOnce = this.state.onlyOnce;

    if (prevProps.isOpen !== isOpen && isOpen || !onlyOnce) {
      console.log('asdasdasdsadasd');
      this.messagesEnd.scrollIntoView();
      this.setState({ onlyOnce: true });
    }
  };

  MessageList.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        recipientAvatar = _props.recipientAvatar,
        pageStart = _props.pageStart,
        loadMore = _props.loadMore,
        isReverse = _props.isReverse,
        initialLoad = _props.initialLoad,
        threshold = _props.threshold,
        hasMore = _props.hasMore,
        useWindow = _props.useWindow;


    return React.createElement(
      'div',
      { className: 'sc-message-list', ref: function ref(el) {
          _this2.el = el;
        } },
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
        this.props.messages.map(function (message, i) {
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
}(Component);

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