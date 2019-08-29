'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Messages = require('./Messages');

var _Messages2 = _interopRequireDefault(_Messages);

var _reactInfiniteScroller = require('react-infinite-scroller');

var _reactInfiniteScroller2 = _interopRequireDefault(_reactInfiniteScroller);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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


      var messagesWithLabels = (0, _utils.timeLabel)(messages);
      newState.messageList = messagesWithLabels;

      var index = (0, _utils.getLastMessageIndex)(messageList);

      if (index > lastConsumedMessage) {
        newState.lastConsumedMessage = index;
      }

      _this.setState(_extends({}, newState), function () {
        if (newState.lastConsumedMessage) {
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


    return _react2.default.createElement(
      'div',
      { className: 'sc-message-list', ref: function ref(el) {
          _this2.el = el;
        } },
      _react2.default.createElement(
        _reactInfiniteScroller2.default,
        {
          pageStart: pageStart || 0,
          loadMore: loadMore,
          isReverse: isReverse,
          initialLoad: initialLoad,
          threshold: threshold,
          hasMore: hasMore,
          useWindow: useWindow,
          loader: _react2.default.createElement(
            'div',
            { className: 'spinner', key: 0 },
            _react2.default.createElement('div', { className: 'rect1' }),
            _react2.default.createElement('div', { className: 'rect2' }),
            _react2.default.createElement('div', { className: 'rect3' }),
            _react2.default.createElement('div', { className: 'rect4' })
          )
        },
        messageList.map(function (message, i) {
          return _react2.default.createElement(_Messages2.default, {
            recipientAvatar: recipientAvatar,
            message: message,
            key: i });
        }),
        _react2.default.createElement('div', { style: { float: "left", clear: "both" },
          ref: function ref(el) {
            _this2.messagesEnd = el;
          } })
      )
    );
  };

  return MessageList;
}(_react.Component), _class.defaultProps = {
  messages: []
}, _temp2);


MessageList.propTypes = process.env.NODE_ENV !== "production" ? {
  pageStart: _propTypes2.default.number,
  loadMore: _propTypes2.default.func.isRequired,
  isReverse: _propTypes2.default.bool.isRequired,
  initialLoad: _propTypes2.default.bool.isRequired,
  threshold: _propTypes2.default.number,
  hasMore: _propTypes2.default.bool.isRequired,
  useWindow: _propTypes2.default.bool.isRequired
} : {};

exports.default = MessageList;
module.exports = exports['default'];