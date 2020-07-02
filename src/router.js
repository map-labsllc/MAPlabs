import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ModuleRouter from "./Components/Modules/ModuleRouter"
import SplashPage from './Components/Startup/SplashPage'
import HomePage from './Components/Startup/HomePage'
import InfoPage from './Components/Startup/InfoPage'
import Login from './Components/Startup/login'
import SignUp from './Components/Startup/SignUp'
import Dashboard from './Components/Framework/Dashboard'
// import ModulesPage from './Components/modulesPage'

export default class RouterComponent extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/infopage' component={InfoPage} />
        <Route exact path='/splash' component={SplashPage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route path='/modules/:moduleId/section/:sectionId' component={ModuleRouter} />
        <Route path='/modules/:moduleId' component={ModuleRouter} />
        <Route path='/' component={HomePage} />
      </Switch>
    )
  }
}

