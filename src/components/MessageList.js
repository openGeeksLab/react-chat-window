import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Message from './Messages'
import InfiniteScroll from 'react-infinite-scroller';

import { timeLabel } from '../utils'

class MessageList extends Component {
  state = {
    onlyOnce: false,
    messageList: []
  }

  static defaultProps = {
    messages: []
  }
  componentDidMount = () => {
    //  this.messagesEnd.scrollIntoView();
    this.dateDelimether();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isOpen, messages } = this.props;
    const { onlyOnce } = this.state;
    if ((prevProps.isOpen !== isOpen && isOpen)) {
      this.messagesEnd.scrollIntoView()
    }
    //TODO: work uncorrectly
    // if ((prevProps.messages !== messages && messages > 0) || !onlyOnce) {
    //   this.messagesEnd.scrollIntoView()
    //   this.setState({ onlyOnce: true })
    // }
    if (prevProps.messages !== messages) {
      this.dateDelimether();
    }
  }

  dateDelimether = () => {
    const { messages = [] } = this.props;

    const messagesWithLabels = timeLabel(messages);

    this.setState({ messageList: messagesWithLabels }, () => {
      const objDiv = document.getElementsByClassName('sc-message-list')[0];
      objDiv.scrollTop = objDiv.scrollHeight;
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

    return (
      <div className="sc-message-list" ref={el => { this.el = el; }}>
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