import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const PrivateRoute = ({ component, isAuthenticated, authCheckPending, ...rest }) => {
  let ComponentToRender = component;

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated || authCheckPending
          ? ( <ComponentToRender {...props} /> )
          : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
      }
    />
  );
};

const mapStateToProps = (state, ownProps) => ({ 
  isAuthenticated: state.userRD.user.login_token,
  // authCheckPending: state.auth.authCheckPending
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));