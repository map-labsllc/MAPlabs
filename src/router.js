import React from 'react'
import { Route,BrowserRouter as Router, Switch } from 'react-router-dom'
import Login from './Components/login'
import SignUp from './Components/SignUp'
import NavBar from './Components/NavBar'
import Action from './store/actions'
import lifeDescriptorQuestion from './Components/lifeDescriptor'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import TestNarratives from './Components/TestNarratives'
import TestShortAnswers from './Components/TestShortAnswers'
class RouterComponent extends React.Component {
  render() {
    return(
      <TestNarratives />
    )
    // <TestShortAnswers />
  }
}

// class RouterComponent extends React.Component {
//   render() {
//     return(
//       <Router style={{paddingTop: 10}}>
//         <Switch>
//           <Route path='/' component={Narrative} question="What about..?" answer="What abt what?" />
//           <Route path='/LDs' component={lifeDescriptorQuestion} />
//           <Route path='/login' component={Login} title='please login' initial/>
//           <Route path='/signUp' component={SignUp} title='please signUp'/>
//         </Switch>
//       </Router>
//     )
//   }
// }

const mapDispatchToProps = dispatch => bindActionCreators({
  // header

}, dispatch)

export default connect(null, mapDispatchToProps)(RouterComponent)
