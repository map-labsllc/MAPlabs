import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Module1 from './Components/Modules/Module1'
import Module2 from './Components/Modules/Module2'
import Module3 from './Components/Modules/Module3'
import SplashPage from './Components/SplashPage'
import StartPage from './Components/StartPage'
import Login from './Components/login'
import SignUp from './Components/SignUp'
// import ModulesPage from './Components/modulesPage'

export default class RouterComponent extends React.Component {
  render() {
      return (
        <Switch>
          <Route exact path='/' component={ SplashPage }/>
          <Route exact path='/startpage' component={ StartPage }/>
          <Route exact path ='/login' component = { Login }/>
          <Route exact path ='/modules/1' component = { Module1 }/>
          <Route exact path ='/modules/2' component = { Module2 }/>
          <Route exact path ='/modules/3' component = { Module3 }/>
          <Route exact path ='/signup' component = { SignUp }/>
        </Switch>
      )
    }
  }
