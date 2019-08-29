import moment from 'moment';

import { SYSTEM } from '../constants'
import { log } from 'util';
const TODAY = moment();
const YESTERDAY = TODAY.clone().subtract(1, 'days').startOf('day');
/**
 * {
 * type:'system'
 * text:'date'
 * }
 */
export const timeformatter = (timestamp) => {
    return moment(timestamp).format('hh:mm')
};

export const timeLabel = (messageList = []) => {
    const newArr = [];

    if (messageList.length === 0) {
        return newArr;
    };

    const { 0: firstMessage } = messageList;

    newArr.push(_systemObj(_getTimestamp(firstMessage.state.timestamp)))
    newArr.push(firstMessage);

    let lastSavedDate = firstMessage.state.timestamp;


    for (let i = 1; i < messageList.length; i++) {
        const element = messageList[i];

        const { state: { timestamp } } = element;

        if (_isDateLarger(lastSavedDate, timestamp)) {
            lastSavedDate = timestamp;
        } else {
            newArr.push(element);
            continue;
        }

        const showText = _getTimestamp(timestamp);


        newArr.push(_systemObj(showText))
        newArr.push(element);

    }

    return newArr;
}

export const getLastMessageIndex = (messageList) => {
    const messageLength = messageList.length - 1;
    const { index } = messageList[messageLength].state;
    return index;
};

const _systemObj = (text) => ({
    type: SYSTEM,
    text
})

const _getTimestamp = (timestamp) => {
    let showText = '';

    if (_isToday(timestamp)) {
        showText = 'Today'
    } else if (_isYesterday(timestamp)) {
        showText = 'Yesterday'
    } else if (!_isThisYear(timestamp)) {
        showText = _getMomentDate(timestamp).format('MMMM Do YYYY')
    } else {
        showText = _getMomentDate(timestamp).format('MMMM Do')
    }

    return showText;
}

const _getMomentDate = (date) => {
    return moment(new Date(date))
}

const _isToday = (date) => {
    return _getMomentDate(date).isSame(TODAY, 'd')
}

const _isYesterday = (date) => {
    return _getMomentDate(date).isSame(YESTERDAY, 'd');
}

const _isThisYear = (date) => {
    return _getMomentDate(date).isSame(TODAY, 'year')
}

const _isDateLarger = (prevDate, futureDate) => {
    const diff = moment(futureDate).diff(prevDate, 'd');
    return diff > 0;
}