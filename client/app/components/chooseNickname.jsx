import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/register';
import {Link} from 'react-router';

class ChooseNicknameForm extends React.Component{
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      message: ''
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    if(this.refs.password.value !== this.refs.passwordAgain.value) {
      this.setState({
        message: "Passwords are not same!"
      });
    } else {
      this.props.register(this.refs.username.value, this.refs.password.value);
    }
  }
  render() {
    return (
      <div>
        <form>
          <h3> Choose nickname: </h3>
          <ul>
            <span>Nickname </span>
            <input type="text"
                   ref="username" />
          </ul>
          <ul>
            <span>Password </span>
            <input type="text"
                   ref="password" />
          </ul>
          <ul>
            <span>Password again</span>
            <input type="text"
                   ref="passwordAgain" />
          </ul>
          <button type="submit"
                  onClick={this.handleSubmit}>Create</button>
        </form>
        <p>{this.props.message}</p>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.register.getIn(['message'])
  };
}

export const NicknameContainer = connect(
  mapStateToProps,
  actionCreators
)(ChooseNicknameForm);
