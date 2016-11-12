import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'

import { authenticate } from '../actions/auth'

function select(state, ownProps) {
  const isAuthenticated = state.user.name || false
  const redirect = ownProps.location.query.redirect || '/'
  return {
    isAuthenticated,
    redirect
  }
}

class LoginContainer extends Component {

    onClick(e) {
      e.preventDefault()
      this.props.authenticate(
        this.refs.username.value,this.refs.password.value
      )
    };

    render() {
      return (
        <div>
          <h2>Enter your credentials</h2>
          <input placeholder="username" type="text" ref="username" />
          <br/>
          <input placeholder="password" type="text" ref="password" />
          <br/>
          <button onClick={this.onClick.bind(this)}>Login</button>
        </div>
      )
    }

}

export default connect(select, { authenticate, replace: routerActions.replace })(LoginContainer)
