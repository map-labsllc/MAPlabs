import React from 'react'
import { connect } from 'react-redux'

import Module from '../Framework/Module'
import SectionCT from '../Framework/SectionCT'
import QuestionsCT from '../Framework/QuestionsCT'

import LifeDescriptorsCT from '../Exercises/LifeDescriptorsCT'
import TransitionsCT from '../Exercises/TransitionsCT'
import NarrativeCT from '../Exercises/NarrativeCT'
import ShortAnswersCT from '../Exercises/ShortAnswersCT'

import { persistAnswersFromQuestionAC } from '../../store/answers/actions'
import { persistTransitionsFromQuestionAC } from '../../store/transitions/actions'

import { getUser } from '../../store/user/reducer'
import { isLoading } from '../../store/ui/reducer'


import {
  MOD_1_DESC,
  QUES_110_DESC,
  QUES_120_DESC,
  QUES_130_DESC,
  QUES_140_DESC,
  QUES_150_DESC,
  QUES_160_DESC,
  QUES_170_DESC,
 } from './Module1Text'

import {
  Button,
  Form,
} from 'react-bootstrap'

/* **************************************************
   Used to test components during development
***************************************************** */
class Module1 extends React.Component {


  // Define questions and excercises for Module 1
  // ---------------------------------------------------------------------


  // -------------------------
  // Module 1: 2C-F
  exercise_110 = (
    <LifeDescriptorsCT
      question = { { code: 110, text: "Reflect on your current situation" } }
      description = { QUES_110_DESC }
      instructions = "Complete sentences that are important to you."
    /> )


  // -------------------------
  // Module 1: 2F
  exercise_120 = (
    <NarrativeCT
      question = { { code: 120, text: "Describe your current situation" } }
      promptQuestionCode = { 110 }
      description = { QUES_120_DESC }
      instructions = "Using the phrases you chose, as well as the descriptions you created next to each one of them, write a full description of your current state of mind, state of being, and general assessment of your current condition today as you begin MAPmaker."
    /> )


  // -------------------------
  // Module 1: 3B-D
  exercise_130 = (
    <LifeDescriptorsCT
      question = { { code: 130, text: "Imagine your future desired situation" } }
      description = { QUES_130_DESC }
      instructions = "Complete sentences that are important to you."
    /> )


  // -------------------------
  // Module 1: 3E
  exercise_140 = (
    <NarrativeCT
      question = { { code: 140, text: "Describe your future situation" } }
      promptQuestionCode = { 130 }
      description = { QUES_140_DESC }
      instructions = "Using the phrases you chose, as well as the descriptions you created next to each one of them, write a full description of your future desired state of being as you begin MAPmaker. Create this description in your own image capturing how you want to feel, what you will think of your future situation, what will be good and bad, and how you would describe your future self to your current self. "
    /> )


  // -------------------------
  // Module 1: 4A

  shortAnswers_150 = [
    <ShortAnswersCT question = { { code: 151, text: "List the most important overarching themes that impact how meaningful and purposeful your life is." } } />,
    <ShortAnswersCT question = { { code: 152, text: "Which core feelings and experiences are most important to providing you with personal senses of the meaning in your life?" } } />,
    <ShortAnswersCT question = { { code: 153, text: "Name some things beyond yourself that you could serve if you lived with more of your core feelings and experiences." } } />,
    <ShortAnswersCT question = { { code: 154, text: "List the areas of personal growth that will enable your life to be more filled with the core feelings and experiences you desire." } } />,
    <ShortAnswersCT question = { { code: 155, text: "List which relationships that you either currently have or need to develop in the future (to any influence, such as people, groups, practices, experiences, etc.) are most important to supporting your life being lived with more of your core feelings and experiences." } } />,
    <ShortAnswersCT question = { { code: 156, text: "List any areas of engagement or mastery (either in your life’s work or avocationally) that would provide you with more of your core feelings and experiences." } } />,
  ]
  exercise_150 = (
    <QuestionsCT
      persistAC_CB = {persistAnswersFromQuestionAC}
      description = { QUES_150_DESC }
      subComponents = {this.shortAnswers_150}
    /> )


  // -------------------------
  // Module 1: 4B

  transitions_160 = [
    <TransitionsCT question = { { code: 161, text: "Thoughts/Attitudes" } } />,
    <TransitionsCT question = { { code: 162, text: "Behaviors/Actions" } } />,
    <TransitionsCT question = { { code: 163, text: "Goals" } } />,
    <TransitionsCT question = { { code: 164, text: "Commitments" } } />,
  ]
  exercise_160 = (
    <QuestionsCT
      persistAC_CB = {persistTransitionsFromQuestionAC}
      description = { QUES_160_DESC }
      subComponents = {this.transitions_160}
    /> )


  // -------------------------
  // Module 1: 5A

  shortAnswers_170 = [
    <ShortAnswersCT question={ { code: 171, text: "What changes would you like to see in your everyday life?" } } />,
    <ShortAnswersCT question={ { code: 172, text: "What changes would you like to see in your personal growth?" } } />,
    <ShortAnswersCT question={ { code: 173, text: "What changes would you like to see in your relationships?" } } />,
    <ShortAnswersCT question={ { code: 174, text: "What changes would you like to see in your life’s work (your vocation)?" } } />,
    <ShortAnswersCT question={ { code: 175, text: "What changes would you like to see in your avocational pursuits?" } } />,
  ]
  exercise_170 = (
    <QuestionsCT
      persistAC_CB = {persistAnswersFromQuestionAC}
      description = { QUES_170_DESC }
      subComponents = { this.shortAnswers_170 }
    /> )




  /* *********************************************************** */
  // render!
  render() {

    const { isLoading } = this.props
    if (isLoading) {
      return (
        <>
          <p>.</p>
          <p>.</p>
          <p>Imagine a spinner...</p>
        </>
      )
    }

    return (
      <>
        <Module
          moduleNum = { 1 }
          moduleTitle = "Your Meanings and Motivations "
          moduleDescription = { MOD_1_DESC }
        >
          <SectionCT
            moduleNum = { 1 }
            sectionNum = { 110 }
            sectionTitle = "Reflect on your current situation"
            exercise = {this.exercise_110}
          />
          <SectionCT
            moduleNum = { 1 }
            sectionNum = { 120 }
            sectionTitle = "Describe your current situation"
            exercise = {this.exercise_120}
          />
          <SectionCT
            moduleNum = { 1 }
            sectionNum = { 130 }
            sectionTitle = "Imagine your future desired situation"
            exercise = {this.exercise_130}
          />
          <SectionCT
            moduleNum = { 1 }
            sectionNum = { 140 }
            sectionTitle = "Describe your future situation"
            exercise = {this.exercise_140}
          />
          <SectionCT
            moduleNum = { 1 }
            sectionNum = { 150 }
            sectionTitle = "Compare your 'current situation' statement to your 'future desired situation' statement"
            exercise = {this.exercise_150}
          />
          <SectionCT
            moduleNum = { 1 }
            sectionNum = { 160 }
            sectionTitle = "Breaking and building"
            exercise = {this.exercise_160}
          />
          <SectionCT
            moduleNum = { 1 }
            sectionNum = { 170 }
            sectionTitle = "Tie these reflections to the course"
            exercise = {this.exercise_170}
          />
        </Module>
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
    isLoading: isLoading( state ),
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
  )( Module1 )
