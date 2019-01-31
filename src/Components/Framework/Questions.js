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
import BracketContainer from '../BracketContainer'

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
     questions -- [ { code: 50, text: "question 50" }, { ... }
     RD -- reducer to be passed back up in onPersistQuestionCB()
     isDynamic -- undefined or true
                  rendering static version in Popup or dynamic verison in Modal
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
    const { userId, questionType, questions, RD, onPersistQuestionCB } = this.props
    const { currIdx } = this.state

    onPersistQuestionCB( userId, questionType, questions[currIdx], RD )
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
    const { questions } = this.props

    if ( currIdx === ( questions.length - 1 ) ) return

    this.persistCurrent()
    this.setState( { currIdx: currIdx + 1 } )
  }



  // ******************************************
  render() {
    console.log( "ShortAnswers::render()" )

    const { questionType, questions, isDynamic } = this.props
    const { currIdx } = this.state

    console.log( '**********************************' )
    console.log( 'questionType: ', questionType )



    // ******************************************
    // render static version in <Popup>
    if ( !isDynamic ) {
      return (
        <>
          {questions.map( ( question, idx ) => (
            <div key={idx}>
              <p><b>{question.text}</b></p>

              {( questionType === QUESTION_TYPE_SHORT_ANSWERS ) && (
                <ShortAnswersCT
                  key={idx}
                  question={question}
                  isDynamic={isDynamic}
                  doesHandlePersistence={{ value: false }}
                />
              )}

              {( questionType === QUESTION_TYPE_TRANSITIONS ) && (
                <TransitionsCT
                  key={idx}
                  question={question}
                  isDynamic={isDynamic}
                />
              )}

              {/* Change to BracketCT */}
              {( questionType === QUESTION_TYPE_BRACKET ) && (
                /* NOTE: promptQuestionCode was added to a normal question obj when
                           setting up data in Module#.js.  Need to extract it here. */
                <BracketContainer
                  key={idx}
                  question={question}
                  isDynamic={isDynamic}
                />
              )}


            </div>



          ) )}
        </>
      )
    }



    // ******************************************
    // render dynamic verison in <ModalX>
    // NOTE: The <div key = {idx}> tag is used to suppress React warning about
    //       elements needing a unique key.
    return (
      <>

        {questions.map( ( question, idx ) => (

          <div key={idx}>

            {( idx === currIdx ) && ( questionType === QUESTION_TYPE_SHORT_ANSWERS ) && (
              <ShortAnswersCT
                key={idx}
                question={question}
                isDynamic={isDynamic}
                doesHandlePersistence={{ value: false }}
              />
            )}

            {( idx === currIdx ) && ( questionType === QUESTION_TYPE_TRANSITIONS ) && (
              <TransitionsCT
                key={idx}
                question={question}
                isDynamic={isDynamic}
              />
            )}

            {/* Change to BracketCT */}
            {( idx === currIdx ) && ( questionType === QUESTION_TYPE_BRACKET ) && (
              /* NOTE: promptQuestionCode was added to a normal question obj when
                         setting up data in Module#.js.  Need to extract it here. */
              <BracketContainer
                key={idx}
                question={question}
                isDynamic={isDynamic}
              />

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
}
