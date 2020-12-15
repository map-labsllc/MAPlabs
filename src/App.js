import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import firebase from 'firebase'
import ReactGA from 'react-ga'
import { FIREBASE_CONFIG } from './config/FirebaseConfig'
import ErrorBoundary from './Components/Utils/ErrorBoundary'
import Footer from './Components/layout/Footer'
import history from './history'
import LoadUser from './Components/User/LoadUser'
import NavBar from './Components/layout/NavBar'
import Router from './Router'
import ScrollToTop from './Components/layout/ScrollToTop'
import SideBarCT from './Components/layout/SideBarCT'

import './CSS/light-bootstrap-dashboard.css'
import './CSS/custom.css'

history.listen(({ action, location }) => {
  console.log(
    `The current URL is ${location.pathname}${location.search}${location.hash}`
  );
  console.log(`The last navigation action was ${action}`);
});

class App extends Component {
  componentWillMount = () => {
    // console.log(FIREBASE_CONFIG)
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG)
    }
  }

  componentDidMount = () => {
    ReactGA.pageview(window.location.pathname)
  }

  render = () => (
    <BrowserRouter history={history}>
      <div>
        <LoadUser />
        <ScrollToTop />
        <div className="wrapper">
          <SideBarCT />
          <div className="main-panel">
            <NavBar />
            <div className="content">
              <div className="container-fluid">
                <ErrorBoundary>
                  <Router/>
                </ErrorBoundary>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
