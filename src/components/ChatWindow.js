import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MessageList from './MessageList'
import UserInput from './UserInput'
import Header from './Header'
import InfiniteScroll from 'react-infinite-scroller';

class ChatWindow extends Component {
  constructor(props) {
    super(props);
  }

  onUserInputSubmit(message) {
    this.props.onUserInputSubmit(message);
  }

  onFilesSelected(filesList) {
    this.props.onFilesSelected(filesList);
  }

  render() {
    const { displayHeader = true, recipientAvatar } = this.props;

    let messageList = this.props.messageList || [];
    let classList = [
      "sc-chat-window",
      (this.props.isOpen ? "opened" : "closed")
    ];

    return (
      <div className={classList.join(' ')}>
        {displayHeader && < Header
          teamName={this.props.agentProfile.teamName}
          imageUrl={this.props.agentProfile.imageUrl}
          onClose={this.props.onClose}
        />}

        <MessageList
          {...this.props}
          recipientAvatar={recipientAvatar}
          messages={messageList}
          isOpen={this.props.isOpen}
          imageUrl={this.props.agentProfile.imageUrl}
        />
        <UserInput
          onSubmit={this.onUserInputSubmit.bind(this)}
          onFilesSelected={this.onFilesSelected.bind(this)}
          showEmoji={this.props.showEmoji}
        />
      </div>
    );
  }
}

ChatWindow.propTypes = {
  avatars: PropTypes.object,
  agentProfile: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func,
  onUserInputSubmit: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool,
};

export default ChatWindow;
