import React, { Component } from 'react'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser, signUp } from '../../store/user/actions'
import { Redirect }from 'react-router-dom'
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
    console.log( 'this.props.user',this.props.user )
    this.props.loginUser( { email, password } )
  }

  renderError=()=> {
    if ( this.props.error ) {
      return (
        <div>
          <p style={ styles.errorTextStyle }>
            { this.props.error }
          </p>
        </div>
      )
    }
  }

  renderButton=() => {
    return (
      <div style={styles.loginButtonStyle} >
        <button style={styles.loginTextStyles} onClick={ this.onButtonPress} > Login</button>
      </div>
    )
  }


  render() {
    // const { viewStyles, textInputStyles, emailTextStyles, passwordTextStyles, loginTextStyles,
    //         submitTextStyles, loginButtonStyle, submitButtonStyle } = styles
            const account= "Don't have an account?"

    return (
      this.props.token ? <Redirect to="/infopage"/>:
      <div style={styles.divStyles}>
        <div
        style={{height:'100%',width:'100%',justifyContent: 'center',
        alignItems: 'center'}}>

        <div style={styles.emailTextStyles}>Email</div>
        <input
          style={styles.textInputStyles}
          placeholder='example@email.com'
          autoCapitalize="none"
          autoCorrect={ false }
          onChange={ this.onEmailChange }
          value={ this.props.email}/>
        <div style={styles.passwordTextStyles}>Password</div>
        <input style={styles.textInputStyles}
          type= 'password'
          placeholder='password'
          autoCorrect={ false }
          autoCapitalize="none"
          onChange={ this.onPasswordChange}
          value={ this.props.password }
        />
        { this.renderError() }
        { this.renderButton()}
        <p style={styles.text}>{account}</p>
        <p style={styles.text}>Create one for FREE</p>
        <div
          onClick={this.props.signUp}
          underlayColor='#fff'
          href= '/signup'
          >

          <button

            underlayColor='#fff'
            href= '/signup'
            style={{color:'#982D38',fontSize: 30,fontWeight:'700', borderColor:'#982D37' ,borderRadius:2, borderWidth:2, backgroundColor:'white'}}>SIGN UP
          </button>
        </div>
        </div>
      </div>
    )
  }
}

  const styles = {
    viewStyles: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'grey',
    },
    text:{
      fontWeight:'bold',
      color:'black',
      paddingTop:10
    },
    textInputStyles: {
      height: 60,
      alignSelf: 'stretch',
      backgroundColor:'white',
      marginTop: 10,
      marginLeft: 40,
      marginRight: 40,
      paddingLeft: 10,
      borderRadius: 5,
      borderWidth: 1.5,
      borderColor: '#982D37'
    },
    emailTextStyles: {
      alignSelf: 'flex-start',
      marginTop: 50,
      marginLeft: 40,
      color: '#982D37',
      fontSize: 16,
      fontWeight: '600'
    },
    passwordTextStyles: {
      alignSelf: 'flex-start',
      marginTop: 20,
      marginLeft: 40,
      color: '#982D37',
      fontSize: 16,
      fontWeight: '600',
    },
    errorTextStyle: {
      color:'white',
      fontSize:15,
      shadowColor:'red',
      fontWeight: '700',
    },
    loginTextStyles: {
      alignSelf: 'center',
      color: '#982D37',
      fontSize: 16,
      fontWeight: '600',
      paddingTop: 15,
      paddingBottom: 15
    },
    submitTextStyles: {
      alignSelf: 'center',
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
      paddingTop: 15,
      paddingBottom: 15
    },
    loginButtonStyle: {
      alignSelf: 'stretch',
      backgroundColor: '#fff',
      borderRadius: 7,
      borderWidth: 1.5,
      borderColor: '#982D37',
      marginLeft: 40,
      marginRight: 40,
      marginTop: 50
    },
    submitButtonStyle: {
      alignSelf: 'stretch',
      backgroundColor: '#982D37',
      borderRadius: 7,
      borderWidth: 1,
      borderColor: '#982D37',
      marginLeft: 40,
      marginRight: 40,
      marginTop: 10
    }
  }

const mapStateToProps = ( { userRD } ) => {
  const { email, password, error, loading } = userRD.user
  return { email, password, error, loading, token: userRD.user.login_token  }
}

export default connect( mapStateToProps, {
  emailChanged, passwordChanged, loginUser, signUp
} )( Login )
