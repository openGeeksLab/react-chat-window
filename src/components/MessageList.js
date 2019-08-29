import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Message from './Messages'
import InfiniteScroll from 'react-infinite-scroller';

import { timeLabel, getLastMessageIndex } from '../utils'

class MessageList extends Component {
  state = {
    lastConsumedMessage: null,
    messageList: []
  }

  static defaultProps = {
    messages: []
  }
  componentDidMount = () => {
    this.dateDelimether();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isOpen, messages } = this.props;

    if ((prevProps.isOpen !== isOpen && isOpen)) {
      this.messagesEnd.scrollIntoView();
    }

    if (prevProps.messages !== messages) {
      this.dateDelimether();
    }
  }

  dateDelimether = () => {
    const newState = {};

    const { messages = [] } = this.props;
    const { lastConsumedMessage } = this.state;

    const messagesWithLabels = timeLabel(messages);
    newState.messageList = messagesWithLabels;

    const index = getLastMessageIndex(messages);

    console.log('lastConsumedMessage', lastConsumedMessage)
    console.log('index', index)
    if (index && index > lastConsumedMessage) {
      newState.lastConsumedMessage = index;
    }

    this.setState({ ...newState }, () => {
      if (newState.lastConsumedMessage) {
        console.log('newState.lastConsumedMessage', newState.lastConsumedMessage)
        const objDiv = document.getElementsByClassName('sc-message-list')[0];
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    });
  }

  render() {
    const {
      recipientAvatar,
      pageStart,
      loadMore,
      isReverse,
      initialLoad,
      threshold,
      hasMore,
      useWindow
    } = this.props;

    const { messageList } = this.state;
    console.log('messageList', messageList)

    return (
      <div className="sc-message-list">
        <InfiniteScroll
          pageStart={pageStart || 0}
          loadMore={loadMore}
          isReverse={isReverse}
          initialLoad={initialLoad}
          threshold={threshold}
          hasMore={hasMore}
          useWindow={useWindow}
          loader={<div className="spinner" key={0}>
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
          </div>}
        >
          {messageList.map((message, i) => {
            return <Message
              recipientAvatar={recipientAvatar}
              message={message}
              key={i} />
          })}
          <div style={{ float: "left", clear: "both" }}
            ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </InfiniteScroll>
      </div>)
  }
}

MessageList.propTypes = {
  pageStart: PropTypes.number,
  loadMore: PropTypes.func.isRequired,
  isReverse: PropTypes.bool.isRequired,
  initialLoad: PropTypes.bool.isRequired,
  threshold: PropTypes.number,
  hasMore: PropTypes.bool.isRequired,
  useWindow: PropTypes.bool.isRequired,
}

export default MessageList