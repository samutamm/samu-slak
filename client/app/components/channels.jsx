import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/channels';

class ChannelRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.quitChannel = this.quitChannel.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.props.chooseChannel(this.props.channel);
  }
  quitChannel(e) {
    e.preventDefault();
    this.props.quitChannel(this.props.channel);
  }
  render() {
    var name = this.props.channel.stocked ?
      this.props.channel :
      <span style={{color: 'red'}}>
        {this.props.channel}
      </span>;
    if (this.props.quitChannel === undefined) {
      return (
        <tr>
          <td><span onClick={this.handleClick}>{name}</span></td>
        </tr>
      );
    }
    return (
      <tr>
        <td><span onClick={this.handleClick}>{name}</span> <button onClick={this.quitChannel}>Quit</button></td>
      </tr>
    );
  }
}

class ChannelTable extends React.Component {
  render() {
    var rows = [];
    this.props.channels.forEach((channel) => {
      if (channel.indexOf(this.props.filterText) === -1) {
        return;
      }
      rows.push(<ChannelRow channel={channel}
                            key={channel}
                            chooseChannel={this.props.chooseChannel}
                            quitChannel={this.props.quitChannel} />);
    });
    const tableName = this.props.tableName;
    return (
      <table>
        <thead>
          <tr>
            <th>{tableName}</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.onUserInput(
      this.filterTextInput.value
    );
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          ref={(input) => this.filterTextInput = input}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

class FilterableChannelTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ''
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput}
        />
      <ChannelTable
          channels={this.props.channels}
          filterText={this.state.filterText}
          chooseChannel={this.props.chooseChannel}
          tableName={this.props.tableName}
          quitChannel={this.props.quitChannel}
        />
      </div>
    );
  }
}

class ChannelForm extends React.Component{
  constructor(props) {
    super(props);
    this.clickPublicChannels = this.clickPublicChannels.bind(this);
    this.clickOwnChannels = this.clickOwnChannels.bind(this);
    this.quitChannel = this.quitChannel.bind(this);
    this.props.fetchChannels();
    this.props.fetchUsersChannels(this.props.username);
  }
  clickPublicChannels(newChannel) {
    this.props.joinUserToChannel(newChannel, this.props.username);
    this.props.chooseChannel(newChannel);
  }
  clickOwnChannels(newChannel) {
    this.props.chooseChannel(newChannel);
  }
  quitChannel(channelName) {
    this.props.quitUserFromChannel(channelName, this.props.username);
  }
  render() {
    const allChannels = this.props.channels;
    const usersOwnChannels = this.props.usersChannels;
    if (allChannels === undefined || allChannels.length === 0) {
      return(
        <div><p>Fetching</p></div>
      );
    }
    const ownChannels = this.props.username + "\'s Channels";
    return (
      <div>
        <div id="allChannelsBox">
          <FilterableChannelTable channels={allChannels}
                                  chooseChannel={this.clickPublicChannels}
                                  tableName="All channels"/>
        </div>
        <div id="ownChannelsBox">
          <FilterableChannelTable channels={usersOwnChannels}
                                  chooseChannel={this.clickOwnChannels}
                                  tableName={ownChannels}
                                  quitChannel={this.quitChannel}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.auth.getIn(["session","username"]),
    channels: state.channels.getIn(['channels']),
    usersChannels: state.channels.getIn(['usersChannels'])
  };
}

export const Channels = connect(
  mapStateToProps,
  actionCreators
)(ChannelForm);
