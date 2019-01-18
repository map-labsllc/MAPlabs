import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import firebase from 'firebase'
import ReduxThunk from 'redux-thunk'
import Router from './router'
import reducers from './reducers'
import createBrowserHistory from "history/createBrowserHistory";

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
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
  }
  }

  render() {

    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
      <Provider store={ store }>
          <Router />
      </Provider>
    )
  }
}

export default App;
