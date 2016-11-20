import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/auth';

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
      selectedChannel: null
    };
    this.changeChannel = this.changeChannel.bind(this);
  }
  changeChannel(newChannel) {
    this.setState({
      selectedChannel: newChannel
    });
  }
  render() {
    const channelList = ["uno", "dos", "tres"];
    return (
      <div>
        <h2>Channels</h2>
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
    joku: state
  };
}

export const Channels = connect(
  mapStateToProps,
  actionCreators
)(ChannelForm);
