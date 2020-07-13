import React, { Component } from 'react'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser } from '../../store/user/actions'
import { Redirect, Link } from 'react-router-dom'
import FormCard from '../layout/FormCard'

class Login extends Component {
  constructor( props ) {
    super( props )
  }

  onEmailChange =( event ) => {
    this.props.emailChanged( event.target.value )
  }

  onPasswordChange =( event ) => {
    this.props.passwordChanged( event.target.value )
  }

  onButtonPress=() => {
    const { email, password } = this.props
    this.props.loginUser( { email, password } )
  }

  renderError=()=> {
    if ( this.props.error ) {
      return (
        <div className="info info-warn">
          { this.props.error }
        </div>
      )
    }
  }

  render() {
    return (
      this.props.token ? <Redirect to="/module/list"/> :
      <FormCard title="Login">
        <div>
          <form>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <div className="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    className="form-control"
                    type="email"
                    placeholder="example@email.com"
                    autoCapitalize="none"
                    autoCorrect="false"
                    onChange={ this.onEmailChange }
                    value={ this.props.email}
                    required
                  />
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <div className="form-group">
                      <label>Password</label>
                      <input
                        className="form-control"
                        type= 'password'
                        placeholder='password'
                        autoCorrect="false"
                        autoCapitalize="none"
                        onChange={ this.onPasswordChange}
                        value={ this.props.password }
                        required
                      />
                  </div>
                </div>
                <div className="col-md-3"></div>
            </div>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-3">
                { this.renderError() }
              </div>
              <div className="col-md-3"></div>
            </div>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-3">
                <button type="submit" className="btn btn-info btn-fill" onClick={this.props.onButtonPress}>Login</button>
              </div>
              <div className="col-md-3">
                <Link to="/forgotpassword">Forgot Password?</Link>
              </div>
              <div className="col-md-3"></div>
            </div>
          </form>
        </div>
      </FormCard>
    )
  }
}

const mapStateToProps = ( { userRD } ) => {
  const { email, password, error, loading } = userRD.user
  return { email, password, error, loading, token: userRD.user.login_token  }
}

export default connect( mapStateToProps, {
  emailChanged, passwordChanged, loginUser
} )( Login )
