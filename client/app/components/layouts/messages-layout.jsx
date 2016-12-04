import React from 'react';

import {Channels} from '../channels.jsx';
import {Messages} from '../messages.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: null
    };
    this.chooseChannel = this.chooseChannel.bind(this);
  }

  chooseChannel(newChannel) {
    this.setState({
      channel: newChannel
    });
  }

  render() {
    return (
      <div id="messages">
        <p></p>
        <div id="left">
          <Channels chooseChannel={this.chooseChannel} />
        </div>
        <div id="center">
          <Messages channel={this.state.channel}/>
        </div>
        <div id="right"></div>
      </div>
    );
  }
}

/*

*/
