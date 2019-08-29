import moment from 'moment';

import { SYSTEM } from '../constants';
import { log } from 'util';
var TODAY = moment();
var YESTERDAY = TODAY.clone().subtract(1, 'days').startOf('day');
/**
 * {
 * type:'system'
 * text:'date'
 * }
 */
export var timeformatter = function timeformatter(timestamp) {
    return moment(timestamp).format('hh:mm');
};

export var timeLabel = function timeLabel() {
    var messageList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var newArr = [];

    if (messageList.length === 0) {
        return newArr;
    };

    var firstMessage = messageList[0];


    newArr.push(_systemObj(getTimestamp(firstMessage.state.timestamp)));
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

        var showText = getTimestamp(timestamp);

        newArr.push(_systemObj(showText));
        newArr.push(element);
    }

    return newArr;
};

export var getLastMessageIndex = function getLastMessageIndex(messageList) {
    if (messageList.length === 0) return -1;

    var messageLength = messageList.length - 1;
    var index = messageList[messageLength].state.index;

    return index;
};

var _systemObj = function _systemObj(text) {
    return {
        type: SYSTEM,
        text: text
    };
};

export var getTimestamp = function getTimestamp(timestamp) {
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
    return moment(new Date(date));
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
    var diff = moment(futureDate).diff(prevDate, 'd');
    return diff > 0;
};