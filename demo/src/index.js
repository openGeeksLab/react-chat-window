import React, { Component } from 'react'
import { render } from 'react-dom'
import { Launcher, ChatWindow } from '../../src'
import messageHistory from './messageHistory';
import TestArea from './TestArea';
import Header from './Header';
import Footer from './Footer';
import monsterImgUrl from "./../assets/monster.png";
import './../assets/styles'



class Demo extends Component {

  constructor() {
    super();
    this.state = {
      messageList: messageHistory,
      newMessagesCount: 0,
      isOpen: false
    };
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
  }

  _onFilesSelected(fileList) {
    const objectURL = window.URL.createObjectURL(fileList[0]);
    this.setState({
      messageList: [...this.state.messageList, {
        type: 'file', author: "me",
        data: {
          url: objectURL,
          fileName: fileList[0].name
        }
      }]
    })
  }

  _sendMessage(text, author) {
    if (text.length > 0) {
      const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1
      this.setState({
        newMessagesCount: newMessagesCount,
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text },
          state: { timestamp: new Date(), author }
        }]
      })
    }
  }

  _handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0
    })
  }

  render() {
    return <div>
      <Header />
      <TestArea
        onMessage={this._sendMessage.bind(this)}
      />
      {/*<ChatWindow*/}
        {/*onUserInputSubmit={this._onMessageWasSent.bind(this)}*/}
        {/*messageList={this.state.messageList}*/}
        {/*isOpen={true}*/}
        {/*displayHeader={false}*/}
        {/*avatars={{*/}
          {/*1: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',*/}
          {/*2: '/chat-icon.e0d2b748.svg',*/}
        {/*}}*/}
        {/*agentProfile={{*/}
          {/*teamName: 'react-chat-window',*/}
          {/*imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'*/}
        {/*}}*/}
        {/*hasMore={false}*/}
        {/*initialLoad={false}*/}
        {/*isReverse={true}*/}
        {/*useWindow={false}*/}
        {/*loadMore={() => {}}*/}
      {/*/>*/}
      <Launcher
        agentProfile={{
          teamName: 'react-chat-window',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        avatars={{
          1: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
          2: '/chat-icon.e0d2b748.svg',
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        onFilesSelected={this._onFilesSelected.bind(this)}
        messageList={this.state.messageList}
        newMessagesCount={this.state.newMessagesCount}
        handleClick={this._handleClick.bind(this)}
        isOpen={this.state.isOpen}
        showEmoji
        hasMore={false}
        initialLoad={false}
        isReverse={true}
        useWindow={false}
        loadMore={() => {}}
      />
      <img className="demo-monster-img" src={monsterImgUrl} />
      <Footer />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'));
