import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Module1 from './Components/Modules/Module1'
import Module2 from './Components/Modules/Module2'
import Module3 from './Components/Modules/Module3'
import Module4 from './Components/Modules/Module4'
import SplashPage from './Components/Startup/SplashPage'
import StartPage from './Components/Startup/StartPage'
import Login from './Components/Startup/login'
import SignUp from './Components/Startup/SignUp'
import Dashboard from './Components/Framework/Dashboard'
// import ModulesPage from './Components/modulesPage'

export default class RouterComponent extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={SplashPage} />
        <Route exact path='/infopage' component={StartPage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/modules/1' component={Module1} />
        <Route exact path='/modules/2' component={Module2} />
        <Route exact path='/modules/3' component={Module3} />
        <Route exact path='/modules/4' component={Module4} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/dashboard' component={Dashboard} />
      </Switch>
    )
  }
}
