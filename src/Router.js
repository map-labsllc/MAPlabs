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
import ForgotPassword from './Components/User/ForgotPassword'
import Dashboard from './Components/Framework/Dashboard'
import PrivateRoute from './Components/User/PrivateRoute'

const Router = () => (
    <Switch>
      <Route exact path='/splash' component={SplashPage} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/logout' component={Logout} />
      <Route exact path='/forgotpassword' component={ForgotPassword} />
      <Route exact path='/infopage' component={InfoPage} />
      
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <PrivateRoute path='/modules/list' component={ModuleList} />
      <PrivateRoute path='/modules/:moduleId/section/:sectionId/subsection/:subSectionId' component={ModuleRouter} />
      <PrivateRoute path='/modules/:moduleId/section/:sectionId' component={ModuleRouter} />
      <PrivateRoute path='/modules/:moduleId' component={ModuleRouter} />
      <Route path='/' component={HomePage} />
    </Switch>
  )

export default Router