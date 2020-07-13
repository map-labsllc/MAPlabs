import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ModuleList from "./Components/Modules/ModuleList"
import ModuleRouter from "./Components/Modules/ModuleRouter"
import SplashPage from './Components/Startup/SplashPage'
import HomePage from './Components/Startup/HomePage'
import InfoPage from './Components/Startup/InfoPage'
import Login from './Components/User/Login'
import Logout from './Components/User/Logout'
import SignUp from './Components/User/SignUp'
import Dashboard from './Components/Framework/Dashboard'

export default class RouterComponent extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/splash' component={SplashPage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/infopage' component={InfoPage} />
        <Route path='/modules/list' component={ModuleList} />
        <Route path='/modules/:moduleId/section/:sectionId' component={ModuleRouter} />
        <Route path='/modules/:moduleId' component={ModuleRouter} />
        <Route path='/' component={HomePage} />
      </Switch>
    )
  }
}

