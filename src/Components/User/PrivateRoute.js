import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
import { isLoggedIn } from '../../store/user/reducer'

const PrivateRoute = ({ component, isAuthenticated, authCheckPending, ...rest }) => {
  const ComponentToRender = component;

  return (
    <Route
      {...rest}
      render={props =>
        (isAuthenticated || authCheckPending ? 
          ( <ComponentToRender {...props} /> )
          : 
          (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          ))
      }
    />
  );
};

const mapStateToProps = (state, ownProps) => ({ 
  isAuthenticated: isLoggedIn(state.userRD),
  authCheckPending: state.userRD.authCheckPending
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));