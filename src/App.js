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
import SideBar from './Components/layout/SideBar'

import './CSS/light-bootstrap-dashboard.css'
import './CSS/custom.css'

// const history = createBrowserHistory()
class App extends Component {
  componentWillMount = () => {
    console.log(FIREBASE_CONFIG)
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG)
    }
  }

  componentDidMount = () => {
    ReactGA.pageview(window.location.pathname)
  }

  render = () => (
    <BrowserRouter>
      <div>
        <LoadUser />
        <ScrollToTop />
        <div className="wrapper">
          <SideBar />
          <div className="main-panel">
            <NavBar />
            <div className="content">
              <div className="container-fluid">
                <ErrorBoundary>
                  <Router history={history}/>
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
