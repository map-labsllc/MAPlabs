import React from 'react'
import { Redirect } from 'react-router-dom'
import ShowMoreLess from '../Utils/ShowMoreLess'
import {
} from 'react-bootstrap'

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
    // console.log("Module::render()")

    // if not logged in, redirect to root
    const { isLoggedIn } = this.props
    if (!isLoggedIn) {
      return (
        <Redirect to="/"/>
      )
    }

    // if still loading, show spinner
    const { isLoading } = this.props
    if ( isLoading ) {
      return (
        <>
          <p>.</p>
          <p>.</p>
          <p>Imagine if I were a spinner, how professional would that be????</p>
        </>
      )
    }

    // good to go! layout the module
    let { moduleNum, moduleTitle, moduleDescription, children } = this.props
    return (
      <div style={style.background}>
        <div style={style.marginz}>
          <h2 className="text-center">Module {moduleNum}</h2>
          <h2 className="text-center">{moduleTitle}</h2>
          <ShowMoreLess
            lines={5}
          >
            <span dangerouslySetInnerHTML={{ __html: moduleDescription }} />
          </ShowMoreLess>

          { /* render the sections, add the number of the section in the module */ }
          <div style={style.spacing}>
            {React.Children.map(children, (child, index) => {
              const numberedChild = React.cloneElement(child, {
                number: index + 1, // numbering is 1-based
              })
              return numberedChild
            })}
          </div>
        </div>
      </div>
    )
  }
}
const style = {
  background: {
    backgroundColor: "white",
    paddingRight: "6%",
    paddingLeft: "6%",
    paddingTop: "2%",
    paddingBottom: "2%",
    marginTop: "8%",
    marginRight: "10%",
    marginLeft: "10%",
    marginBottom: "4%",
    borderRadius: "15px",
    boxShadow: "5px 5px 50px 10px grey",
  },
  spacing: {
    marginTop: "5%",
  }
}


////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
