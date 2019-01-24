import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import SplashPage from './Components/SplashPage'
import Login from './Components/login'
import NavBar from './Components/NavBar'
import SignUp from './Components/SignUp'
import ModulesPage from './Components/modulesPage'
export default class RouterComponent extends React.Component {
  render() {
      return (
        <div>
          <Router>
            <NavBar/>
          </Router>
          <Router>
            <Switch>
              <Route exact path={['/', '/splash']} component={SplashPage} initial />
              <Route exact path ='/login' component = { Login }/>
              <Route exact path ='/signup' component = { SignUp }/>
              <Route exact path ='/modulespage' component = { ModulesPage }/>

            </Switch>
          </Router>
        </div>
      )
    }
  }