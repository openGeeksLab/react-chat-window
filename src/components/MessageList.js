import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Message from './Messages'
import InfiniteScroll from 'react-infinite-scroller';

class MessageList extends Component {
  state = {
    onlyOnce: false
  }

  componentDidMount = () => {
    this.messagesEnd.scrollIntoView()
  }

  componentDidUpdate(prevProps, prevState) {
    const { isOpen } = this.props;
    const { onlyOnce } = this.state
    if ((prevProps.isOpen !== isOpen && isOpen) || !onlyOnce) {
      console.log('asdasdasdsadasd')
      this.messagesEnd.scrollIntoView()
      this.setState({ onlyOnce: true })
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
          loadMore={() => {
            console.log('more');
          }}
          isReverse={true}
          initialLoad={false}
          threshold={60}
          hasMore={true}
          useWindow={false}
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