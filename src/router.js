import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import SplashPage from './Components/SplashPage'

export default class RouterComponent extends React.Component {
  render() {
    console.log( 'hello' )
    return (
      <Router style={{ paddingTop: 10 }}>
        <Switch>
          <Route path='/' component={SplashPage} initial />
        </Switch>
      </Router>
    )
  }
}