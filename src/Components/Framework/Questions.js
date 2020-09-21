import React from 'react'

import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap'

// import '../../CSS/ModalNavButtons.css'

import SectionCompleteButton from './SectionCompleteButton'


/* **************************************************
   Questions component

   Manages array of questions displaying one at a time.
     -- Left/Right buttons to move to prev/next question
     -- Close button to initiate close of parent modal
     -- Left/Close/Right buttons perist the current question

   state:
     currIdx -- current position in array of questions

   props:
     subComponents -- array of React components to work with a single question
     isDynamic -- undefined or true
                  undefined: render static version in Popup
                  true: render dynamic/interactive verison in Modal
     onPersistQuestionCB -- call to have parent CT persist a question from Store
     onCloseModalCB -- call to close the modal this control resides in

***************************************************** */
export default class Questions extends React.Component {

  state = {
    currIdx: 0,
  }

  // ******************************************
  // persist the current question before moving off of it
  persistCurrent = () => {
    const { subComponents, onPersistQuestionCB } = this.props
    const { currIdx } = this.state

    onPersistQuestionCB( subComponents[currIdx].props.question )
  }

  // ******************************************
  // called when close button is clicked
  onclickClose = () => {
    // console.log( "Questions::onclickClose()" )

    const { onCloseModalCB } = this.props

    this.persistCurrent()
    onCloseModalCB()
  }

  // ******************************************
  // called when left button clicked
  onclickLeft = () => {
    // console.log( "Questions::onclicLeft()" )

    const { currIdx } = this.state

    // already at the start, do nothing
    if ( currIdx === 0 ) return

    this.persistCurrent()
    this.setState( { currIdx: currIdx - 1 } )
  }

  // ******************************************
  // called when right button clicked
  onclickRight = () => {
    // console.log( "Questions::onclickRight()" )

    const { currIdx } = this.state
    const { subComponents } = this.props

    // aready at the end, do nothing
    if ( currIdx === ( subComponents.length - 1 ) ) return

    this.persistCurrent()
    this.setState( { currIdx: currIdx + 1 } )
  }



  // ******************************************
  render() {
    // console.log( "ShortAnswers::render()" )

    const { subComponents, isDynamic } = this.props
    const { currIdx } = this.state


    // ******************************************
    // render static version in <Popup>
    if ( !isDynamic && subComponents ) {
      return (
        <>
          {subComponents.map( ( subComponent, idx ) => (
            <div className="text-left" key={idx}>
              <h4>{idx + 1}. {subComponent.props.question.text}</h4>
              {subComponent}
            </div>

          ) )}
        </>
      )
    }

    // ******************************************
    // render dynamic verison in <ModalX>

    // inject isDynamic into props so the subCompoent will render its dynamic version
    const subComponentsWithIsDynamic = subComponents.map( ( subComponent, idx ) => {
      return React.cloneElement(
        subComponent,
        {
          isDynamic: true,
          number: idx + 1,
        }
      )
    } )

    return (
      <>
        {subComponentsWithIsDynamic.map( ( subComponent, idx ) => (
          <div key={idx}>
            {( idx === currIdx ) && ( 
              <>
                {subComponent}
              </>
            )}
          </div>
        ) )}

        <br />

        <div className="bgButton text-center">
          {currIdx > 0 && 
            <Button className="previousButton" onClick={this.onclickLeft}>Previous</Button>
          }

          <Button className="closeButton" type="button" onClick={this.onclickClose}>Save</Button>

          { console.log(currIdx, subComponentsWithIsDynamic.length - 1)}
          {currIdx === (subComponentsWithIsDynamic.length - 1) && 
            <SectionCompleteButton onClick={this.onclickClose} />
          }

          {currIdx < subComponentsWithIsDynamic.length - 1 && 
            <Button className="nextButton" onClick={this.onclickRight}>Next</Button>
          }
        </div>
      </>
    )
  }
}
