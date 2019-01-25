import React from 'react'
import { Route, Switch } from 'react-router-dom'

import SplashPage from './Components/SplashPage'
import Login from './Components/login'
import SignUp from './Components/SignUp'
import ModulesPage from './Components/modulesPage'

import TestModule from './Components/TestModule'


export default class RouterComponent extends React.Component {
  render() {
      return (
        <Switch>
          <Route exact path={['/', '/splash']} component={SplashPage} initial />
          <Route exact path ='/login' component = { Login }/>
          <Route exact path ='/ed' component = { TestModule }/>
          <Route exact path ='/signup' component = { SignUp }/>
          <Route exact path ='/modules/1' component = { ModulesPage }/>
        </Switch>
      )
    }
  }

  // <TestTransitions />

  // <TestModule />

  // <Switch>
  //   <Route exact path={['/', '/splash']} component={SplashPage} initial />
  //   <Route exact path ='/login' component = { Login }/>
  //   <Route exact path ='/signup' component = { SignUp }/>
  //   <Route exact path ='/modules/1' component = { ModulesPage }/>
  //
  // </Switch>
