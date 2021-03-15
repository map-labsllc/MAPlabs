import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { signUpUser } from '../../store/user/actions'
import FormCard from '../layout/FormCard'
import { isLoggedIn } from '../../store/user/reducer'

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      verify_password: '',
      passwordClasses: 'form-control',
      passwordIsValid: true,
      errorMessage: ''
    }
  }

  userSignup = e => {
    e.preventDefault()
    const {
      fname, lname, email, password, verify_password
    } = this.state

    if (!password || password !== verify_password || !verify_password) {
      this.setState({
        passwordClasses: `${this.state.passwordClasses} is-invalid`,
        passwordIsValid: false
      })

      this.setState({ errorMessage: 'Passwords don\'t match' })
    } else {
      this.setState({
        passwordIsValid: true,
        passwordClasses: 'form-control',
      })

      const newUser = {
        fname, lname, email, password
      }
      this.props.signUpUser(newUser)
    }
  }

  clearError = () => {
    this.setState({ errorMessage: '' })
  }

  render() {
    const { errorMessage } = this.state
    const { userLoggedIn } = this.props

    return (
      userLoggedIn ? <Redirect to="/modules/list"/> :
        <FormCard title="Sign up for an account">
          <div>
            <form onSubmit={ this.userSignup }>
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="fname">First Name</label>
                    <input
                      name="fname"
                      className="form-control"
                      placeholder='Jane'
                      autoCapitalize="true"
                      onChange={(e) => this.setState({ fname: e.target.value.trim() })}
                      value={ this.state.fname }
                      required
                    />
                  </div>
                </div>
                <div className="col-md-3"></div>
              </div>

              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input
                      className="form-control"
                      placeholder='Doe'
                      autoCapitalize="true"
                      onChange={(e) => this.setState({ lname: e.target.value.trim() })}
                      value={ this.state.lname }
                      required
                    />
                  </div>
                </div>
                <div className="col-md-3"></div>
              </div>
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      name="email"
                      className="form-control"
                      type="email"
                      placeholder="example@email.com"
                      autoCapitalize="none"
                      autoCorrect="false"
                      onChange={(e) => this.setState({ email: e.target.value.trim() })}
                      value={ this.state.email}
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
                    <label htmlFor="password">Password</label>
                    <input
                      name="password"
                      className={this.state.passwordClasses}
                      type= 'password'
                      placeholder='password'
                      autoCorrect="false"
                      autoCapitalize="none"
                      onChange={(e) => { this.clearError(); this.setState({ password: e.target.value.trim() }) }}
                      value={ this.props.password }
                      pattern="(?=^.{10,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                      title="Ten or more characters with a combo of uppercase, lowercase and numbers or special characters"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-3"></div>
              </div>
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="verify_password">Verify Password</label>
                    <input
                      name="verify_password"
                      className={this.state.passwordClasses}
                      type= 'password'
                      placeholder='verify password'
                      autoCorrect="false"
                      autoCapitalize="none"
                      onChange={(e) => { this.clearError(); this.setState({ verify_password: e.target.value.trim() }) }}
                      value={ this.props.verify_password }
                      min-length="8"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-3"></div>
              </div>
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  { this.props.error || errorMessage ?
                    <div className="alert alert-danger">
                      { this.props.error }
                      { errorMessage }
                    </div> : null
                  }
                </div>
                <div className="col-md-3"></div>
              </div>
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-3">
                  <button type="submit" className="btn btn-info btn-fill">Sign Up</button>
                </div>
                <div className="col-md-3">
                Already have an account? <Link to="/login">Login</Link>
                </div>
                <div className="col-md-3"></div>
              </div>
            </form>
          </div>
        </FormCard>
    )
  }
}

function mapStateToProps(state) {
  const { userRD } = state

  return {
    fname: userRD.user.fname,
    lname: userRD.user.lname,
    email: userRD.user.email,
    password: userRD.user.password,
    error: userRD.errorMessage,
    userLoggedIn: isLoggedIn(state.userRD),
  }
}

export default connect(mapStateToProps, {
  signUpUser
})(SignUp)
