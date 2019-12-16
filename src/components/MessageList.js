import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Message from './Messages'
import InfiniteScroll from 'react-infinite-scroller';

import { getLastMessageIndex } from '../utils'

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


    const index = getLastMessageIndex(messages);

    if (index && index > lastConsumedMessage) {
      newState.lastConsumedMessage = index;
    }

    this.setState({ ...newState }, () => {
      if (newState.lastConsumedMessage) {
        const objDiv = document.getElementsByClassName('sc-message-list')[0];
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    });
  };

  renderSpinner = () => (
    <div className="spinner" key={0}>
      <div className="rect1"/>
      <div className="rect2"/>
      <div className="rect3"/>
      <div className="rect4"/>
    </div>
  );

  getAvatar = (messageData) => {
    const { state } = messageData;
    const {
      recipientAvatar,
      avatars,
    } = this.props;

    if (state && state.author && avatars && avatars[state.author]) {
      return avatars[state.author];
    }

    return recipientAvatar;
  };

  render() {
    const {
      pageStart,
      loadMore,
      isReverse,
      initialLoad,
      threshold,
      hasMore,
      useWindow,
      messageList,
    } = this.props;

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
          loader={this.renderSpinner()}
        >
          {messageList.map((message, i) => (
            <Message
              recipientAvatar={this.getAvatar(message)}
              message={message}
              key={i}
            />
          ))}
          <div style={{ float: "left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }} />
        </InfiniteScroll>
      </div>
    );
  }
}

MessageList.propTypes = {
  avatars: PropTypes.object,
  pageStart: PropTypes.number,
  loadMore: PropTypes.func.isRequired,
  isReverse: PropTypes.bool.isRequired,
  initialLoad: PropTypes.bool.isRequired,
  threshold: PropTypes.number,
  hasMore: PropTypes.bool.isRequired,
  useWindow: PropTypes.bool.isRequired,
}

export default MessageList
