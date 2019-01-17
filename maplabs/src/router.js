
import React from 'react'
import { Route, Router } from 'react-router'
import Login from './Components/login'
import SignUp from './Components/SignUp'
// import Action from './actions'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

class RouterComponent extends React.Component {
  render() {
    return(
      <div>
        <Router style={{paddingTop: 10}}>
          <Route key='root' hideNavBar>
             <Route key='auth'>
             <Route key='login' component={Login} title='please login' initial/>
             <Route key='signUp' component={SignUp} title='please signUp'/>
            </Route>

            <Route key='main'>


            </Route>
          </Route>
        </Router>
      </div>
    )
  }

}
const mapDispatchToProps = dispatch => bindActionCreators({
  // header

}, dispatch)

export default connect(null, mapDispatchToProps)(RouterComponent)
