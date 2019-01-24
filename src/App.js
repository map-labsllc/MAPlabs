import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import firebase from 'firebase'
import ReduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import Router from './router'
import reducers from './store/reducers'
import NavBar from './Components/NavBar'

// const history = createBrowserHistory()
class App extends Component {
  componentWillMount() {

    // make new web proj in firebase
    var config = {
      apiKey: "AIzaSyAUOCnEKUCOCZcRgBc1y9sWC-AuHgEa7aw",
      authDomain: "map-labs123.firebaseapp.com",
      databaseURL: "https://map-labs123.firebaseio.com",
      projectId: "map-labs123",
      storageBucket: "",
      messagingSenderId: "666788418297"
    }
    if ( !firebase.apps.length ) {
      firebase.initializeApp( config )
    }
  }

  render() {

    const middleware = [ ReduxThunk ]
    if ( process.env.NODE_ENV === 'development' ) {
      middleware.push( createLogger() ) // log actions and pre and post store state
    }

    const store = createStore(
      reducers,
      {}, // no intiial state
      applyMiddleware( ...middleware )
    )

    return (
      <Provider store={ store }>
          <NavBar />
          <Router />
      </Provider>
    )
  }
}

export default App
