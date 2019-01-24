import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import SplashPage from './Components/SplashPage'
import Login from './Components/login'
import
export default class RouterComponent extends React.Component {
  render() {


      return (
        <Router style={{ paddingTop: 10 }}>
          <Switch>
            <Route path={['/', '/#splash']} component={SplashPage} initial />
            <Route path = { 'login' } component = { Login }/>
          </Switch>
        </Router>
      )
    }
  }

      // <John />
      // <TestNarratives />
//
//       <TestShortAnswers />
//     )
//
//
//
//   }
// }
// <Router style={{ paddingTop: 10 }}>
//
//   <Switch>
//     <Route path='/' component={SplashPage} initial />
//     <Route path='/login' component={Login} title='please login' />
//     <Route path='/signUp' component={SignUp} title='please signUp' />
//
//   </Switch>
//
// </Router >
// <TestPopup />
// <TestQuestions />
// <TestShortAnswers />
// <John />
// <TestNarratives />

//
// class RouterComponent extends React.Component {
//   render() {
//     return(
//       <Router style={{paddingTop: 10}}>
//         <Switch>
//           <Route path='/' component={NavBar} />
//           <Route path='/LDs' component={lifeDescriptorQuestion} />
//           <Route path='/login' component={Login} title='please login' initial/>
//           <Route path='/signUp' component={SignUp} title='please signUp'/>
//         </Switch>
//       </Router>
      // <Route path='/' compocnent={Narrative} question="What about..?" answer="What abt what?" />
//     )
//   }
// }
//
