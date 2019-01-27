import React from 'react'
import { connect } from 'react-redux'

import Module from '../Components/Module'
import SectionCT from '../Containers/SectionCT'
import QuestionsCT from '../Containers/QuestionsCT'
import QuestionsList from './questionsList'
import NarrativeCT from '../Containers/NarrativeCT'
import { loadAllAnswersAC } from '../store/answers/actions'
import { loadAllTransitionsAC } from '../store/transitions/actions'
import { loadAllStaticdataAC } from '../store/staticdata/actions'
import { getUser } from '../store/user/reducer'
import {
  QUESTION_TYPE_SHORT_ANSWERS,
  QUESTION_TYPE_TRANSITIONS} from '../constants.js'

import {
  Button,
  Form,
} from 'react-bootstrap'

/* **************************************************
   Used to test components during development
***************************************************** */
class Module2 extends React.Component {

  state = {
    ready: false,
  }

  // load user data
  componentDidMount = () => {
    const { dispatch, userId } = this.props
    dispatch( loadAllAnswersAC( userId ) )
    dispatch( loadAllTransitionsAC( userId ) )
    dispatch( loadAllStaticdataAC() )
  }

  // Define questions and excercises for Module 1
  // ---------------------------------------------------------------------


  // -------------------------
  // Replace with new component
  // 1A-B
  exercise_210 = (
    <NarrativeCT
      question = { { code: 210, text: "List all of your contextual influences" } }
      promptQuestionCode = { { questioncode: 0 } }
      instructions = "Choose influences in your life, their beliefs / values, and if they are supporrtive or inhibiting."
    /> )


  // -------------------------
  // May drop this??
  // 2B
  exercise_220 = (
    <NarrativeCT
      question = { { code: 220, text: "Rank your influences" } }
      promptQuestionCode = { { questioncode: 0 } }
      instructions = ""
    /> )


  // -------------------------
  // Replace with new component
  // 3A
  exercise_230 = (
    <NarrativeCT
      question = { { code: 230, text: "Relating Your Values and Beliefs to Those of Your Influences" } }
      promptQuestionCode = { { questioncode: 0 } }
      instructions = "Based on what you have written, fill in the blanks of the statement below for each of your top 5-10 'supportive' and 'inhibiting' influences."
    /> )


  // -------------------------
  // 3B
  exercise_240 = (
    <NarrativeCT
      question = { { code: 240, text: "Synthesize Your Values and Beliefs into a Supportive Self-Acceptance Statement" } }
      promptQuestionCode = { { questionCode: 0 } }
      instructions = ""
    /> )

  // -------------------------
  // 3C
  exercise_250 = (
    <NarrativeCT
      question = { { code: 250, text: "Synthesize Your Values and Beliefs into an Self-Inhibiting Statement" } }
      promptQuestionCode = { { questioncode: 0 } }
      instructions = ""
    /> )


  // -------------------------
  // 4A
  questions_260 = [
    { code: 261, text: "As you compare the two statements, list the most important overarching themes that impact how meaningful and purposeful your life is." },
    { code: 262, text: "Which core values and beliefs are most meaningful to you?" },
    { code: 263, text: "What things beyond yourself could be served if you more intentionally lived by your core values and beliefs?" },
    { code: 264, text: "What areas of personal growth are needed to fill your life with more of your core values and beliefs?" },
    { code: 265, text: "Which relationships that you either currently have or need to develop in the future (to any people, groups, practices, experiences, etc.) are most needed to support your core values and beliefs?" },
    { code: 266, text: "What areas of engagement could your core values and beliefs lead you to master (either in your life’s work or avocationally) in order to create a more meaningful and purposeful life?" },
  ]
  exercise_260 = (
    <QuestionsCT
      questionType = {QUESTION_TYPE_SHORT_ANSWERS}
      questions = {this.questions_260}
    /> )


  // -------------------------
  // 4B
  questions_270 = [
    { code: 271, text: "Values and Beliefs" },
    { code: 272, text: "Primary Influences" },
    { code: 273, text: "Relationships" },
    { code: 274, text: "Commitments" },
  ]
  exercise_270 = (
    <QuestionsCT
      questionType = {QUESTION_TYPE_TRANSITIONS}
      questions = {this.questions_270}
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
              moduleNum = { { value: 2 } }
              moduleTitle = "Module 2"
              moduleDescription = "Social Context"
            >
              <SectionCT
                moduleNum = { { value: 2 } }
                sectionNum = { { value: 210 } }
                sectionTitle = "Contextual Influences I"
                exercise = {this.exercise_210}
              />
              <SectionCT
                moduleNum = { { value: 2 } }
                sectionNum = { { value: 220 } }
                sectionTitle = "Contextual Influences II"
                exercise = {this.exercise_220}
              />
              <SectionCT
                moduleNum = { { value: 2 } }
                sectionNum = { { value: 230 } }
                sectionTitle = "Contextual Influences III"
                exercise = {this.exercise_230}
              />
              <SectionCT
                moduleNum = { { value: 2 } }
                sectionNum = { { value: 240 } }
                sectionTitle = "Synthesize Your Values and Beliefs into a Supportive Self-Acceptance Statement"
                exercise = {this.exercise_240}
              />
              <SectionCT
                moduleNum = { { value: 2 } }
                sectionNum = { { value: 250 } }
                sectionTitle = "Synthesize Your Values and Beliefs into an Self-Inhibiting Statement"
                exercise = {this.exercise_250}
              />
              <SectionCT
                moduleNum = { { value: 2 } }
                sectionNum = { { value: 260 } }
                sectionTitle = "Compare your 'Supportive Self-Acceptance' statement to your 'Self-Inhibiting' statement"
                exercise = {this.exercise_260}
              />
              <SectionCT
                moduleNum = { { value: 2 } }
                sectionNum = { { value: 270 } }
                sectionTitle = "Breaking and building"
                exercise = {this.exercise_270}
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
  )( Module2 )