import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/auth';
import {Link} from 'react-router';

class LoginForm extends React.Component{
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(e) {
    e.preventDefault();
    this.props.authenticate(
      this.refs.username.value,
      this.refs.password.value
    );
  }
  render() {
    return (
      <div>
        <form>
          <h3> Log in: </h3>
          <ul>
            <span>Username </span>
            <input type="text"
                   ref="username" />
          </ul>
          <ul>
            <span>Password </span>
            <input type="text"
                   ref="password" />
          </ul>
          <button type="submit"
                  onClick={this.handleLogin}>Log in</button>
          <Link to={'/register'}>or register as a client here</Link>
        </form>
        <p>{this.props.message}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.auth.getIn(['session', 'message']),
    isChecking: state.auth.getIn(['session', 'isChecking']),
    token: state.auth.getIn(['session', 'token'])
  };
}

export const LoginContainer = connect(
  mapStateToProps,
  actionCreators
)(LoginForm);
