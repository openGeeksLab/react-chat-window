import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Message from './Messages'
import InfiniteScroll from 'react-infinite-scroller';

class MessageList extends Component {
  state = {
    onlyOnce: false
  }


  componentDidUpdate(prevProps, prevState) {
    const { isOpen } = this.props;

    if (prevProps.isOpen !== isOpen && isOpen) {
      this.messagesEnd.scrollIntoView()
    }
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
          {this.props.messages.map((message, i) => {
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