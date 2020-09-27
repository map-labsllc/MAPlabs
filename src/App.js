import React, { Component } from 'react'
import firebase from 'firebase'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import ScrollToTop from './Components/layout/ScrollToTop'
import NavBar from './Components/layout/NavBar'
import Footer from './Components/layout/Footer'
import SideBar from './Components/layout/SideBar'
import LoadUser from './Components/User/LoadUser'
import { FIREBASE_CONFIG } from './config/FirebaseConfig.js'

import './CSS/light-bootstrap-dashboard.css'
import './CSS/custom.css'

// const history = createBrowserHistory()
class App extends Component {
  componentWillMount() {
    console.log(FIREBASE_CONFIG)
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG)
    }
  }

  render() {

    return (
      <BrowserRouter>
        <div>
          {/* <ScriptTag src="./assets/js/jquery.3.2.1.min.js" type="text/javascript"></ScriptTag>
	        <ScriptTag src="./assets/js/bootstrap.min.js" type="text/javascript"></ScriptTag>
          <ScriptTag src="./assets/js/bootstrap-notify.js"></ScriptTag>
	        <ScriptTag src="./assets/js/light-bootstrap-dashboard.js?v=1.4.0"></ScriptTag>
          <ScriptTag src="assets/js/demo.js"></ScriptTag> */}
          <LoadUser />
          <ScrollToTop />
          <div className="wrapper">
            <SideBar />
            <div className="main-panel">
              <NavBar />
              <div className="content">
                <div className="container-fluid">
                  <Router />
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
