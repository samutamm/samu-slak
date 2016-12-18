import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/messages';

class MessageRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const message = this.props.message;
    var middleChar = (message.sender !== '') ? ":" : "";
    return (
      <tr>
        <td><span>{message.sender} {middleChar} {message.text}</span></td>
      </tr>
    );
  }
}

class MessageTable extends React.Component{
  render() {
    var rows = [];
    this.props.messages.forEach((message,i) => {
      rows.unshift(<MessageRow message={message}
                            key={i} />);
    });
    return (
      <div id="messagesDiv">
        <table id="messagesTable" >
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

class NewMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const message = this.state.value;
    this.props.newMessage(message, this.props.channel);
    this.state.value = "";
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Message:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Send" />
      </form>
    );
  }
}

class MessagesForm extends React.Component{
  constructor(props) {
    super(props);
    this.newMessage = this.newMessage.bind(this);
  }

  newMessage(message, channel) {
    this.props.sendMessageToChannel(message, channel, this.props.username);
  }

  render() {
    var channel = this.props.channel;
    if (channel == null) {
      return (
        <div>
          <p>Please choose channel</p>
        </div>
      );
    }
    this.props.connectUserToChannel(channel, this.props.username);
    var messages = this.props.messages;
    return (
      <div id="messageWrap">
        <p id="channelName">{channel}</p>
        <MessageTable messages={messages} />
        <NewMessageForm id="messageForm" newMessage={this.newMessage} channel={channel}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.auth.getIn(["session","username"]),
    messages: state.messages.getIn(['messages'])
  };
}

export const Messages = connect(
  mapStateToProps,
  actionCreators
)(MessagesForm);
