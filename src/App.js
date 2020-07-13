import React, { Component } from 'react'
import firebase from 'firebase'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './router'
import ScrollToTop from './Components/layout/ScrollToTop'
import NavBar from './Components/layout/NavBar'
import Footer from './Components/layout/Footer'
import SideBar from './Components/layout/SideBar'
import './CSS/light-bootstrap-dashboard.css'
import './CSS/custom.css'
import { FIREBASE_CONFIG } from './config/FirebaseConfig.js'

// const history = createBrowserHistory()
class App extends Component {
  componentWillMount() {

    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG)
    }
  }

  render() {

    return (
      <Router>
        <div>
          <ScrollToTop />
          <div class="wrapper">
            <SideBar />
            <div class="main-panel">
              <NavBar />
              <div class="content">
                <div class="container-fluid">
                  <Routes />
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
