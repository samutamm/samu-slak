import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/messages';

class MessagesForm extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    var channel = this.props.channel;
    if (channel == null) {
      channel = "Please choose channel"
    }
    return (
      <div>
        <p>{channel}</p>
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
