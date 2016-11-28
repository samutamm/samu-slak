import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/channels';

class ChannelRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    if (this.props.index !== this.props.selected) {
      this.props.changeChannel(this.props.index);
    }
  }
  render() {
    var rowClass = (this.props.index === this.props.selected) ? "selected" : "not-selected";
    return(
      <li className={rowClass} key={this.props.index} onClick={this.handleClick}>
        {this.props.channel}
      </li>
    );
  }
}

class ChannelForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedChannel: null,
      channels: []
    };
    this.changeChannel = this.changeChannel.bind(this);
    this.props.fetchChannels();
  }
  changeChannel(newChannel) {
    this.setState({
      selectedChannel: newChannel
    });
  }
  render() {
    const channelList = this.props.channels;
    if (channelList === undefined || channelList.length === 0) {
      return(
        <div><p>Fetching</p></div>
      );
    }
    return (
      <div>
        <h2>{this.props.username} s Channels</h2>
        <ul>{channelList.map((channel, i) =>
          <ChannelRow key={i}
                      index={i}
                      channel={channel}
                      selected={this.state.selectedChannel}
                      changeChannel={this.changeChannel} />
        )}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.auth.getIn(["session","username"]),
    channels: state.channels.getIn(['channels'])
  };
}

export const Channels = connect(
  mapStateToProps,
  actionCreators
)(ChannelForm);
