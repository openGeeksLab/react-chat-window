import React, { Component } from 'react';
import Message from './Messages'

class MessageList extends Component {

  componentDidUpdate(prevProps, prevState) {
    this.scrollList.scrollTop = this.scrollList.scrollHeight;
  }

  render() {
    const { recipientAvatar } = this.props;
    return (
      <div className="sc-message-list" ref={el => this.scrollList = el}>
        {this.props.messages.map((message, i) => {
          return <Message
            recipientAvatar={recipientAvatar}
            message={message}
            key={i} />
        })}
      </div>)
  }
}

export default MessageList