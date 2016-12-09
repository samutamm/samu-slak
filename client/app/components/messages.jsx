import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/messages';

class MessageRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const message = this.props.message;
    return (
      <tr>
        <td><span>{message}</span></td>
      </tr>
    );
  }
}

class MessageTable extends React.Component{
  render() {
    var rows = [];
    this.props.messages.forEach((message) => {
      rows.push(<MessageRow message={message}
                            key={message} />);
    });
    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
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
    console.log(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Message:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class MessagesForm extends React.Component{
  constructor(props) {
    super(props);
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
    const messages = ["eka","toka", "golg"];
    return (
      <div>
        <p>{channel}</p>
        <MessageTable messages={messages} />
        <NewMessageForm />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.auth.getIn(["session","username"]),
  };
}

export const Messages = connect(
  mapStateToProps,
  actionCreators
)(MessagesForm);
