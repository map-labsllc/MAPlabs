import React from 'react'
import { connect } from 'react-redux'

import Module from '../Framework/Module'
import SectionCT from '../Framework/SectionCT'
import QuestionsCT from '../Framework/QuestionsCT'

import QuestionsList from '../Exercises/questionsList'
import TransitionsCT from '../Exercises/TransitionsCT'
import NarrativeCT from '../Exercises/NarrativeCT'
import ShortAnswersCT from '../Exercises/ShortAnswersCT'
import BracketCT from '../Exercises/BracketCT'

import { loadAllAnswersAC } from '../../store/answers/actions'
import { loadAllTransitionsAC } from '../../store/transitions/actions'
import { loadAllStaticdataAC } from '../../store/staticdata/actions'
import { getUser } from '../../store/user/reducer'
import {
  QUESTION_TYPE_SHORT_ANSWERS,
  QUESTION_TYPE_TRANSITIONS,
  QUESTION_TYPE_BRACKET,
} from '../../constants.js'

import {
  MOD_3_DESC,
  QUES_310_DESC,
  QUES_320_DESC,
  QUES_330_DESC,
  QUES_340_DESC,
  QUES_350_DESC,
  QUES_360_DESC,
} from './Module3Text'

import {
  Button,
  Form,
} from 'react-bootstrap'

/* **************************************************
   Used to test components during development
***************************************************** */
class Module3 extends React.Component {

  // Define questions and excercises for Module 3
  // ---------------------------------------------------------------------


  // -------------------------
  // Module 3: 1A

  shortAnswers_310 = [
    <ShortAnswersCT question = { { code: 311, text: "Financial/Material" } } />,
    <ShortAnswersCT question = { { code: 312, text: "Vocation/Career/Life Work" } } />,
    <ShortAnswersCT question = { { code: 313, text: "Social/Community" } } />,
    <ShortAnswersCT question = { { code: 314, text: "Family" } } />,
    <ShortAnswersCT question = { { code: 315, text: "Mental/Educational" } } />,
    <ShortAnswersCT question = { { code: 316, text: "Spiritual/Emotional/Creative" } } />,
    <ShortAnswersCT question = { { code: 317, text: "Physical/Health/Recreational" } } />,
    <ShortAnswersCT question = { { code: 318, text: "Other" } } />,
  ]
  exercise_310 = (
    <QuestionsCT
      questionType = {QUESTION_TYPE_SHORT_ANSWERS}
      description = {QUES_310_DESC}
      subComponents = {this.shortAnswers_310}
    /> )

  // -------------------------
  // Module 3: 3A

  brackets_320 = [
    <BracketCT promptQuestionCode = { 311 }  question = { { promptCode: 311, code: 321, text: "Financial/Material" } } />,
    <BracketCT promptQuestionCode = { 312 }  question = { { promptCode: 312, code: 322, text: "Vocation/Career/Life Work" } } />,
    <BracketCT promptQuestionCode = { 313 }  question = { { promptCode: 313, code: 323, text: "Social/Community" } } />,
    <BracketCT promptQuestionCode = { 314 }  question = { { promptCode: 314, code: 324, text: "Family" } } />,
    <BracketCT promptQuestionCode = { 315 }  question = { { promptCode: 315, code: 325, text: "Mental/Educational" } } />,
    <BracketCT promptQuestionCode = { 316 }  question = { { promptCode: 316, code: 326, text: "Spiritual/Emotional/Creative" } } />,
    <BracketCT promptQuestionCode = { 317 }  question = { { promptCode: 317, code: 327, text: "Physical/Health/Recreational" } } />,
    <BracketCT promptQuestionCode = { 318 }  question = { { promptCode: 318, code: 328, text: "Other" } } />,
  ]
  exercise_320 = (
    <QuestionsCT
      questionType = {QUESTION_TYPE_BRACKET}
      description = {QUES_320_DESC}
      subComponents = {this.brackets_320}
    /> )

  // -------------------------
  // Replaced with enhanced Bracketing component that takes an array of promptCodes
  // Module 3: 4A
  // promptCodes_330 = [321, 322, 323, 324, 325, 326, 327, 328]
  // exercise_330 = (
  //   <QuestionsCT
  //   questionType = {QUESTION_TYPE_BRACKET}
  //   description = {QUES_330_DESC}
  //   questions = {[{ promptCode: 330,
  //     code: 330,
  //     promptCodes: this.questions_320.reduce( ( acc, question ) => ( [...acc, {code: question.promptCode, text: question.text}] ), [] ),
  //     text: "Make tradeoffs between each category." }]}
  // /> )

  // -------------------------
  // Module 3: 4B
  exercise_340 = (
    <NarrativeCT
      question = { { code: 340, text: "Synthesize into a Desires Statement." } }
      promptQuestionCode = { 320 } // should the prompt be all of the winners from 320 or just 330?
      description = { QUES_340_DESC }
      instructions = "Write a short statement that brings together all the desires from each category and captures the essence of what this exercise has revealed to you using the phrases themselves. Note:  If there were desires that reached the final tradeoff round in Exercise 3 that are also really important, feel free to incorporate them as well. "
    /> )

    // -------------------------
    // Module 3: 5A

    shortAnswers_350 = [
      <ShortAnswersCT question = { { code: 351, text: "List any important themes that you noticed across your 7 categories and in your ultimate choices about which of your desires are most important." } } />,
      <ShortAnswersCT question = { { code: 352, text: "Which desires provide you with the most personal senses of the meaning and “intrinsic” motivation in your life?" } } />,
      <ShortAnswersCT question = { { code: 353, text: "Name some things beyond yourself that you could serve if you lived more authentically  from your deepest and truest desires." } } />,
      <ShortAnswersCT question = { { code: 354, text: "List the areas of personal growth that will enable your life to be more expressive of your desires." } } />,
      <ShortAnswersCT question = { { code: 355, text: "List which relationships that you either currently have or need to develop in the future (to any influence, such as people, groups, practices, experiences, etc.) are most important to supporting your life being lived our of your most authentic desires." } } />,
      <ShortAnswersCT question = { { code: 356, text: "List any areas of engagement or mastery (either in your life’s work or avocationally) that could express or fulfill your deepest desires." } } />,
    ]

    exercise_350 = (
      <QuestionsCT
        questionType = {QUESTION_TYPE_SHORT_ANSWERS}
        description = { QUES_350_DESC }
        subComponents = {this.shortAnswers_350}
      /> )

    // -------------------------
    // Module 3: 5B
    transitions_360 = [
      <TransitionsCT question = { { code: 361, text: "Motivations" } } />,
      <TransitionsCT question = { { code: 362, text: "Desires" } } />,
      <TransitionsCT question = { { code: 363, text: "Commitments" } } />,
    ]
    exercise_360 = (
      <QuestionsCT
        questionType = {QUESTION_TYPE_TRANSITIONS}
        description = { QUES_360_DESC }
        subComponents = {this.transitions_360}
      /> )



  /* *********************************************************** */
  // render!
  render() {
    const isLoading = this.props.isLoading

    return (
      <>
        <p>{( ( isLoading ) ? "loading...." : ""  )}</p>
        {!isLoading && (
          <>
            <Module
              moduleNum = { 3 }
              moduleTitle = "Personal Desires"
              moduleDescription = { MOD_3_DESC }
            >
              <SectionCT
                moduleNum = { 3 }
                sectionNum = { 310 }
                sectionTitle = "Deep Desires"
                exercise = {this.exercise_310}
              />
              <SectionCT
                moduleNum = { 3 }
                sectionNum = { 320 }
                sectionTitle = "Make tradeoffs within each category"
                exercise = {this.exercise_320}
              />
              {/*<SectionCT
                moduleNum = { 3 }
                sectionNum = { 330 }
                sectionTitle = "Make tradeoffs between each category"
                exercise = {this.exercise_330}
              />*/}
              <SectionCT
                moduleNum = { 3 }
                sectionNum = { 340 }
                sectionTitle = "Synthesize into a Desires Statement"
                exercise = {this.exercise_340}
              />
              <SectionCT
                moduleNum = { 3 }
                sectionNum = { 350 }
                sectionTitle = "Reflect of your stated desires"
                exercise = {this.exercise_350}
              />
              <SectionCT
                moduleNum = { 3 }
                sectionNum = { 360 }
                sectionTitle = "Break and building"
                exercise = {this.exercise_360}
              />
            </Module>
          </>
        )}
      </>
    )
  }
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// Wrap in container to get access to store and dispatch
const mapStateToProps = state => {
  return {
    isLoading: state.answersRD.isLoading || state.transitionsRD.isLoading || state.staticdataRD.isLoading,
    userId: getUser( state.userRD ).user_id,
  }
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

const mapDispatchToProps = dispatch => ( {
  dispatch,
} )

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )( Module3 )
