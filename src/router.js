import React from 'react'
import { Route, Switch } from 'react-router-dom'

import SplashPage from './Components/SplashPage'
import Login from './Components/login'
import SignUp from './Components/SignUp'
import ModulesPage from './Components/modulesPage'

export default class RouterComponent extends React.Component {
  render() {
      return (
        <Switch>
          <Route exact path='/' component={ SplashPage }/>
          <Route exact path ='/login' component = { Login }/>
          <Route exact path ='/signup' component = { SignUp }/>
          <Route exact path ='/modules/1' component = { ModulesPage }/>
        </Switch>
      )
    }
  }
