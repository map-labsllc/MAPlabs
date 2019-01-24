import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import SplashPage from './Components/SplashPage'
import Login from './Components/login'
import SignUp from './Components/SignUp'
export default class RouterComponent extends React.Component {
  render() {
      return (
        <Router style={{ paddingTop: 10 }}>
          <Switch>
            <Route exact path={['/', '/splash']} component={SplashPage} initial />
            <Route exact path ='/login' component = { Login }/>
            <Route exact path ='/signup' component = { SignUp }/>
          </Switch>
        </Router>
      )
    }
  }