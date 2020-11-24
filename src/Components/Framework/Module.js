import React from 'react'
import { Redirect } from 'react-router-dom'

/* **************************************************
   Module

   Shows a module, spinner, or redirects to "/" if not logged in

   props:
     isLoggedIn -- boolean if a user is logged in
     isLoading -- boolean if still loading user data
     moduleNum -- integer, the module number
     moduleTitle -- title of the Module
     moduleDescription -- could be many lines, if we need paragraphs then will need to set innerHTML
     children -- the Section components to display
***************************************************** */
export default class Module extends React.Component {
  render() {
    // if not logged in, redirect to root
    const { isLoggedIn } = this.props
    if (!isLoggedIn) {
      return (
        <Redirect to="/"/>
      )
    }

    // if still loading, show spinner
    const { isLoading } = this.props
    if (isLoading) {
      return (
        <div>Loading...</div>
      )
    }

    // good to go! layout the module
    const { moduleNum, moduleTitle, children } = this.props
    return (
      <div className="reading-wrapper">
        <h1>Module {moduleNum}</h1>
        <h2>{moduleTitle}</h2>
        {children}
      </div>
    )
  }
}
