import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import SplashPage from './Components/SplashPage'
import Login from './Components/login'
import NavBar from './Components/NavBar'
import SignUp from './Components/SignUp'
export default class RouterComponent extends React.Component {
  render() {


      return (
        <div>
          <Router >
            <NavBar/>
          </Router>
          <Router>
            <Switch>
              <Route exact path={['/', '/splash']} component={SplashPage} initial />
              <Route exact path ='/login' component = { Login }/>
              <Route exact path ='/signup' component = { SignUp }/>
              <Route exact path ='/modulespage' component = { SignUp }/>
            </Switch>
          </Router>
        </div>
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
