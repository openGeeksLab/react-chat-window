import React, { Component } from 'react';
import Linkify from 'react-linkify';
import {timeformatter} from '../../utils';

const TextMessage = ({data,state}) => {
  return <div className="sc-message--text">
    <Linkify properties={{ target: '_blank' }}>{data.text}</Linkify>
    <div className='sc-message-time'>
      {timeformatter(state.timestamp)}
    </div>
  </div>
}

export default TextMessage
