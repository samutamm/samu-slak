import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/auth';

export function requireAuthentication(Component) {
  const AuthenticatedComponent = React.createClass({
    componentWillMount: function() {
      this.checkAuth();
    },
    componentWillReceiveProps: function(nextProps) {
      this.checkAuth();
    },
    checkAuth: function() {
      if (!this.props.isAuthenticated) {
        this.props.checkToken();
      }
    },
    render: function() {
      return (
        <div>
            {this.props.isAuthenticated === true
                ? <Component {...this.props}/>
                : null
            }
        </div>
      );
    }
  });

  const mapStateToProps = (state) => ({
      token: state.auth.getIn(['session', 'token']),
      isAuthenticated: state.auth.getIn(['session', 'isAuthenticated']),
      username: state.auth.getIn(['session', 'username'])
    });

  return connect(
    mapStateToProps,
    actionCreators
  )(AuthenticatedComponent);
}
