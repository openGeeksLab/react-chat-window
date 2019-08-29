'use strict';

exports.__esModule = true;
exports.getLastMessageIndex = exports.timeLabel = exports.timeformatter = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _constants = require('../constants');

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TODAY = (0, _moment2.default)();
var YESTERDAY = TODAY.clone().subtract(1, 'days').startOf('day');
/**
 * {
 * type:'system'
 * text:'date'
 * }
 */
var timeformatter = exports.timeformatter = function timeformatter(timestamp) {
    return (0, _moment2.default)(timestamp).format('hh:mm');
};

var timeLabel = exports.timeLabel = function timeLabel() {
    var messageList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var newArr = [];

    if (messageList.length === 0) {
        return newArr;
    };

    var firstMessage = messageList[0];


    newArr.push(_systemObj(_getTimestamp(firstMessage.state.timestamp)));
    newArr.push(firstMessage);

    var lastSavedDate = firstMessage.state.timestamp;

    for (var i = 1; i < messageList.length; i++) {
        var element = messageList[i];

        var timestamp = element.state.timestamp;


        if (_isDateLarger(lastSavedDate, timestamp)) {
            lastSavedDate = timestamp;
        } else {
            newArr.push(element);
            continue;
        }

        var showText = _getTimestamp(timestamp);

        newArr.push(_systemObj(showText));
        newArr.push(element);
    }

    return newArr;
};

var getLastMessageIndex = exports.getLastMessageIndex = function getLastMessageIndex(messageList) {
    if (messageList.length === 0) return -1;

    var messageLength = messageList.length - 1;
    var index = messageList[messageLength].state.index;

    return index;
};

var _systemObj = function _systemObj(text) {
    return {
        type: _constants.SYSTEM,
        text: text
    };
};

var _getTimestamp = function _getTimestamp(timestamp) {
    var showText = '';

    if (_isToday(timestamp)) {
        showText = 'Today';
    } else if (_isYesterday(timestamp)) {
        showText = 'Yesterday';
    } else if (!_isThisYear(timestamp)) {
        showText = _getMomentDate(timestamp).format('MMMM Do YYYY');
    } else {
        showText = _getMomentDate(timestamp).format('MMMM Do');
    }

    return showText;
};

var _getMomentDate = function _getMomentDate(date) {
    return (0, _moment2.default)(new Date(date));
};

var _isToday = function _isToday(date) {
    return _getMomentDate(date).isSame(TODAY, 'd');
};

var _isYesterday = function _isYesterday(date) {
    return _getMomentDate(date).isSame(YESTERDAY, 'd');
};

var _isThisYear = function _isThisYear(date) {
    return _getMomentDate(date).isSame(TODAY, 'year');
};

var _isDateLarger = function _isDateLarger(prevDate, futureDate) {
    var diff = (0, _moment2.default)(futureDate).diff(prevDate, 'd');
    return diff > 0;
};