import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { loginUser } from '../../store/user/actions'
import FormCard from '../layout/FormCard'
import { isLoggedIn } from '../../store/user/reducer'

const Login = ({ isLoggedIn, errorMessage, loginUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    loginUser({ email, password })
  }

  return (
    isLoggedIn ? <Redirect to="/modules/list"/> :
      <FormCard title="Login">
        <div>
          <form onSubmit={onSubmit}>
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
                    onChange={ (e) => setEmail(e.target.value.trim()) }
                    value={ email}
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
                    className="form-control"
                    type= 'password'
                    placeholder='password'
                    autoCorrect="false"
                    autoCapitalize="none"
                    onChange={ (e) => setPassword(e.target.value.trim())}
                    value={ password }
                    required
                  />
                </div>
              </div>
              <div className="col-md-3"></div>
            </div>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                { errorMessage &&
                <div className="alert alert-danger">
                  { errorMessage }
                </div>
                }
              </div>
              <div className="col-md-3"></div>
            </div>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-3">
                <button type="submit" className="btn btn-info btn-fill" >Login</button>
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { userRD } = state
  const { errorMessage, loading } = userRD
  return {
    errorMessage,
    loading,
    isLoggedIn: isLoggedIn(state.userRD),
  }
}

export default connect(mapStateToProps, {
  loginUser
})(Login)
