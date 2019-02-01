import React from 'react'

import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap'
import ShortAnswersCT from '../Exercises/ShortAnswersCT'
import TransitionsCT from '../Exercises/TransitionsCT'
import {
  QUESTION_TYPE_SHORT_ANSWERS,
  QUESTION_TYPE_TRANSITIONS,
  QUESTION_TYPE_BRACKET,
} from '../../constants.js'
import '../../CSS/ModalNavButtons.css'
import BracketCT from '../Exercises/BracketCT'

/* **************************************************
   Questions component

   Manages array of questions displaying one at a time.
     -- Left/Right buttons to move to prev/next question
     -- Close button to initiate close of parent modal
     -- Left/Close/Right buttons perist the current question

   state:
     currIdx -- current position in array of questions

   props:
     userId -- integer
     questionType -- enum from constants.js
     subComponents -- array of React components to work with a single question
     RD -- reducer to be passed back up in onPersistQuestionCB()
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
    const { userId, questionType, subComponents, RD, onPersistQuestionCB } = this.props
    const { currIdx } = this.state

    onPersistQuestionCB( userId, questionType, subComponents[currIdx].props.question, RD )
  }

  // ******************************************
  // called when close button is clicked
  onclickClose = () => {
    console.log( "Questions::onclickClose()" )

    const { onCloseModalCB } = this.props

    this.persistCurrent()
    onCloseModalCB()
  }

  // ******************************************
  // called when left button clicked
  onclickLeft = () => {
    console.log( "Questions::onclicLeft()" )

    const { currIdx } = this.state

    if ( currIdx === 0 ) return

    this.persistCurrent()
    this.setState( { currIdx: currIdx - 1 } )
  }

  // ******************************************
  // called when right button clicked
  onclickRight = () => {
    console.log( "Questions::onclickRight()" )

    const { currIdx } = this.state
    const { subComponents } = this.props

    if ( currIdx === ( subComponents.length - 1 ) ) return

    this.persistCurrent()
    this.setState( { currIdx: currIdx + 1 } )
  }



  // ******************************************
  render() {
    console.log( "ShortAnswers::render()" )

    const { subComponents, questionType, isDynamic } = this.props
    const { currIdx } = this.state

    console.log( '**********************************' )
    console.log( 'questionType: ', questionType )




    // ******************************************
    // render static version in <Popup>
    if ( !isDynamic && subComponents ) {
      return (
        <>
          {subComponents.map( ( subComponent, idx ) => (
            <div key={idx}>
              <p><b>{subComponent.props.question.text}</b></p>
              {subComponent}
            </div>

          ) )}
        </>
      )
    }

    // ******************************************
    // render dynamic verison in <ModalX>
    // NOTE: The <div key = {idx}> tag is used to suppress React warning about
    //       elements needing a unique key.
    if ( isDynamic && subComponents ) {
      const subComponentsWithIsDynamic = subComponents.map( ( subComponent ) => {
        return React.cloneElement(
          subComponent,
          {
            isDynamic: "true"
          }
        )
      } )
// {subComponent}
// <p>filler</p>
// subComponentsWithIsDynamic
//
// {subComponents.map( ( subComponent, idx ) => (
//   <div key={idx}>
//     {(idx === currIdx) && (
//       {subComponent}
//     )}
//   </div>
// ) )}

// WORKS
// {subComponentsWithIsDynamic.map( ( subComponent, idx ) => (
//   <div key={idx}>
//     {subComponent}
//   </div>
// ) )}

      // const testDirect = (
      //   <ShortAnswersCT
      //     key={101}
      //     question={{code: 101, text: "directly created"}}
      //     isDynamic={isDynamic}
      //   />
      // )
      // {testDirect}

      return (
        <>
          {subComponentsWithIsDynamic.map( ( subComponent, idx ) => (
            <div key={idx}>
              {( idx === currIdx ) && (
                <div>
                  {subComponent}
                </div>
              )}
            </div>
          ) )}

          <br />

          <div className="bgButton text-center">
            <Button className="previousButton" onClick={this.onclickLeft}>Previous</Button>{' '}
            <Button className="closeButton" type="button" onClick={this.onclickClose}>Close</Button>
            <Button className="nextButton" onClick={this.onclickRight}>Next</Button>
          </div>
        </>
      )
    }

    return (
      <p>short circuit</p>
    )



    // ******************************************
    // render static version in <Popup>
    // if ( !isDynamic ) {
    //   return (
    //     <>
    //       {questions.map( ( question, idx ) => (
    //         <div key={idx}>
    //           <p><b>{question.text}</b></p>
    //
    //           {( questionType === QUESTION_TYPE_SHORT_ANSWERS ) && (
    //             <ShortAnswersCT
    //               key={idx}
    //               question={question}
    //               isDynamic={isDynamic}
    //             />
    //           )}
    //
    //           {( questionType === QUESTION_TYPE_TRANSITIONS ) && (
    //             <TransitionsCT
    //               key={idx}
    //               question={question}
    //               isDynamic={isDynamic}
    //             />
    //           )}
    //
    //           {/* Change to BracketCT */}
    //           {( questionType === QUESTION_TYPE_BRACKET ) && (
    //             /* NOTE: promptQuestionCode was added to a normal question obj when
    //                        setting up data in Module#.js.  Need to extract it here. */
    //             <BracketCT
    //               key={idx}
    //               question={question}
    //               isDynamic={isDynamic}
    //             />
    //           )}
    //
    //
    //         </div>
    //
    //
    //
    //       ) )}
    //     </>
    //   )
    // }



    // // ******************************************
    // // render dynamic verison in <ModalX>
    // // NOTE: The <div key = {idx}> tag is used to suppress React warning about
    // //       elements needing a unique key.
    // return (
    //   <>
    //
    //     {questions.map( ( question, idx ) => (
    //
    //       <div key={idx}>
    //
    //         {( idx === currIdx ) && ( questionType === QUESTION_TYPE_SHORT_ANSWERS ) && (
    //           <ShortAnswersCT
    //             key={idx}
    //             question={question}
    //             isDynamic={isDynamic}
    //           />
    //         )}
    //
    //         {( idx === currIdx ) && ( questionType === QUESTION_TYPE_TRANSITIONS ) && (
    //           <TransitionsCT
    //             key={idx}
    //             question={question}
    //             isDynamic={isDynamic}
    //           />
    //         )}
    //
    //         {/* Change to BracketCT */}
    //         {( idx === currIdx ) && ( questionType === QUESTION_TYPE_BRACKET ) && (
    //           /* NOTE: promptQuestionCode was added to a normal question obj when
    //                      setting up data in Module#.js.  Need to extract it here. */
    //           <BracketCT
    //             key={idx}
    //             question={question}
    //             isDynamic={isDynamic}
    //           />
    //
    //         )}
    //
    //       </div>
    //     ) )}
    //     <br />
    //     <div className="bgButton text-center">
    //       <Button className="previousButton" onClick={this.onclickLeft}>Previous</Button>{' '}
    //
    //       <Button className="closeButton" type="button" onClick={this.onclickClose}>Close</Button>
    //
    //       <Button className="nextButton" onClick={this.onclickRight}>Next</Button>
    //     </div>
    //   </>
    // )
  }
}
