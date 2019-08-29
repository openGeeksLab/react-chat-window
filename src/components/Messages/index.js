import React, { Component, Fragment } from 'react'
import TextMessage from './TextMessage'
import EmojiMessage from './EmojiMessage'
import FileMessage from './FileMessage'
import SystemMessage from './SystemMessage'
import chatIconUrl from './../../assets/chat-icon.svg'
import { SYSTEM } from '../../constants';

class Message extends Component {
  _renderMessageOfType(type) {
    console.log('type', type)
    console.log('this.props.message', this.props.message)
    switch (type) {
      case 'text':
        return <TextMessage {...this.props.message} />
      case 'emoji':
        return <EmojiMessage {...this.props.message} />
      case 'file':
        return <FileMessage {...this.props.message} />
      case 'system':
        return <SystemMessage {...this.props.message} />
      default:
        console.error(`Attempting to load message with unsupported file type '${type}'`)
    }
  }

  render() {
    const { recipientAvatar, message } = this.props;

    let contentClassList = [
      "sc-message--content",
      (this.props.message.author === "me" ? "sent" : "received")
    ];
    return (
      <div className="sc-message">
        <div className={contentClassList.join(" ")}>
          {message.type !== SYSTEM && <div className="sc-message--avatar" style={{
            backgroundImage: `url(${recipientAvatar || chatIconUrl})`
          }}></div>}
          {this._renderMessageOfType(this.props.message.type)}
        </div>
      </div>)
  }
}

export default Message