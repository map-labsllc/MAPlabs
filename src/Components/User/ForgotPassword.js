import React, { useState} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { forgotPassword } from '../../store/user/actions'
import FormCard from '../layout/FormCard'

const ForgotPassword = ({ errorMessage, message, forgotPassword }) => {
  const [email, setEmail] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    console.log("send email clicked",forgotPassword)
    forgotPassword( { email } )
  }

  return (
    <FormCard title="Forgot Password">
      { message ?
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="alert alert-info">
            { message }
            </div>
            <Link to="/login">Login</Link>
          </div>
          <div className="col-md-3"></div>
        </div>
      :
      <div>
        <p>Tell us the email you signed up with and you will be sent instructions on how to reset your password.</p>
        <div>
          <form onSubmit={onSubmit}>
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
                <button type="submit" className="btn btn-info btn-fill" >Send Reset Email</button>
              </div>
              <div className="col-md-3">
                <Link to="/login">Login</Link>
              </div>
              <div className="col-md-3"></div>
            </div>
          </form>
        </div>
      </div>  
    }
    </FormCard>
  )
}

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    errorMessage: state.userRD.errorMessage,
    message: state.userRD.message,   
  }
}

function mapDispatchToProps(dispatch) {
  return {
    forgotPassword: bindActionCreators(forgotPassword, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)