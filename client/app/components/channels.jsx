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
    this.props.chooseChannel(this.props.channel);
  }
  render() {
    var name = this.props.channel.stocked ?
      this.props.channel :
      <span style={{color: 'red'}}>
        {this.props.channel}
      </span>;
    return (
      <tr>
        <td onClick={this.handleClick}>{name}</td>
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
                            chooseChannel={this.props.chooseChannel} />);
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
        />
      </div>
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
    this.clickPublicChannels = this.clickPublicChannels.bind(this);
    this.clickOwnChannels = this.clickOwnChannels.bind(this);
    this.props.fetchChannels();
  }
  clickPublicChannels(newChannel) {
    this.props.joinUserToChannel(newChannel, this.props.username);
  }
  clickOwnChannels(newChannel) {
    console.log("Channel " + newChannel + " clicked!");
  }
  render() {
    const allChannels = this.props.channels;
    const usersOwnChannels = ["Oma kannu", "private message"]
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
                                  tableName={ownChannels}/>
        </div>
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
