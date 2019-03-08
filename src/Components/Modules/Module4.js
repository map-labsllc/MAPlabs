import React from 'react'

import ModuleCT from '../Framework/ModuleCT'
import SectionCT from '../Framework/SectionCT'
import QuestionsCT from '../Framework/QuestionsCT'

import LifeXDescriptorsCT from '../Exercises/LifeXDescriptorsCT'
import TransitionsCT from '../Exercises/TransitionsCT'
import NarrativeCT from '../Exercises/NarrativeCT'
import ShortAnswersCT from '../Exercises/ShortAnswersCT'
import BracketCT from '../Exercises/BracketCT'
import StrengthXCT from '../Exercises/StrengthXCT'

// import { persistAnswersFromQuestionAC } from '../../store/answers/actions'
// import { persistTransitionsFromQuestionAC } from '../../store/transitions/actions'
import {
  QUESTION_TYPE_SHORT_ANSWERS,
  QUESTION_TYPE_TRANSITIONS,
  QUESTION_TYPE_BRACKET,
  QUESTION_TYPE_STRENGTH,
 } from '../../store/answers/constants'


import {
  MOD_4_DESC,
  QUES_410_DESC,
  QUES_420_DESC,
  QUES_430_DESC,
  QUES_440_DESC,
  QUES_450_DESC,
  QUES_460_DESC,
} from './Module4Text'

import {
} from 'react-bootstrap'

/* **************************************************
   Used to test components during development
***************************************************** */
export default class Module4 extends React.Component {

  

  // Define questions and excercises for Module 4
  // --------------------------------------------------------------------
/*
  // -------------------------
  // LifeDescriptions

  exercise_410 = (
    <LifeXDescriptorsCT
      question = { { code: 410, text: "Reflect on your current situation" } }
      description = { QUES_410_DESC }
      instructions = "Complete sentences that are important to you:"
    /> )


  // -------------------------
  // Narrative
  exercise_420 = (
    <NarrativeCT
      question = { { code: 420, text: "Describe your current situation" } }
      promptQuestionCode = { 410 }
      description = { QUES_420_DESC }
      instructions = "Using the phrases you chose, write a full description of your current state of mind, state of being, and general assessment of your current condition today as you begin MAPmaker."
    /> )

  // -------------------------
  // Transitions

  transitions_430 = [
    <TransitionsCT question = { { code: 431, text: "Thoughts/Attitudes" } } />,
    <TransitionsCT question = { { code: 432, text: "Behaviors/Actions" } } />,
  ]
  exercise_430 = (
    <QuestionsCT
      persistAC_CB = {persistTransitionsFromQuestionAC}
      description = { QUES_430_DESC }
      subComponents = {this.transitions_430}
    /> )


  // -------------------------
  // ShortAnswers

  shortAnswers_440 = [
    <ShortAnswersCT question = { { code: 441, text: "Which core feelings and experiences are most important to providing you with personal senses of the meaning in your life?" } } />,
    <ShortAnswersCT question = { { code: 442, text: "List the most important overarching themes that impact how meaningful and purposeful your life is." } } />,
  ]
  exercise_440 = (
    <QuestionsCT
      persistAC_CB = {persistAnswersFromQuestionAC}
      description = { QUES_440_DESC }
      subComponents = {this.shortAnswers_440}
    /> )

  // -------------------------
  // Bracket

  brackets_450 = [
    <BracketCT promptQuestionCodes = { [ 441 ] }  question = { { code: 451, text: "Financial/Material" } } />,
    <BracketCT promptQuestionCodes = { [ 442 ] }  question = { { code: 452, text: "Vocation/Career/Life Work" } } />,
  ]
  exercise_450 = (
    <QuestionsCT
      persistAC_CB = {persistAnswersFromQuestionAC}
      description = {QUES_450_DESC}
      subComponents = {this.brackets_450}
    /> )

  // ---------------------------
  // Narrative

  exercise_460 = (
    <NarrativeCT
      question = { { code: 460, text: "Synthesize into a Desires Statement." } }
      promptQuestionCode = { 451 }
      description = { QUES_460_DESC }
      instructions = "Write a short statement that brings together all the desires from each category and captures the essence of what this exercise has revealed to you using the phrases themselves. Note:  If there were desires that reached the final tradeoff round in Exercise 3 that are also really important, feel free to incorporate them as well. "
    /> )
*/
  /* *********************************************************** */

  strengths_410 = [
    <StrengthXCT question = { { code: 411, text: "question 411" } } />,
    <StrengthXCT question = { { code: 412, text: "question 412" } } />,
  ]

  exercise_410 = (
    <QuestionsCT
      questionType = { QUESTION_TYPE_STRENGTH }
      description = { QUES_410_DESC }
      subComponents = {this.strengths_410}
    />)

  render() {
    return (
      <ModuleCT
        moduleNum = { 4 }
        moduleTitle = "Your Meanings and Motivations "
        moduleDescription = { MOD_4_DESC }
      >
      <SectionCT
          moduleNum = { 4 }
          sectionNum = { 410 }
          sectionTitle = "Record your top 5 strengths and reflect on each"
          exercise = {this.exercise_410}
        />
        {/*<SectionCT
          moduleNum = { 4 }
          sectionNum = { 410 }
          sectionTitle = "Reflect on your current situation"
          exercise = {this.exercise_410}
        />
        <SectionCT
          moduleNum = { 4 }
          sectionNum = { 420 }
          sectionTitle = "Describe your current situation"
          exercise = {this.exercise_420}
        />
        <SectionCT
          moduleNum = { 4 }
          sectionNum = { 430 }
          sectionTitle = "Breaking and building"
          exercise = {this.exercise_430}
        />
        <SectionCT
          moduleNum = { 4 }
          sectionNum = { 440 }
          sectionTitle = "Compare your 'current situation' statement to your 'future desired situation' statement"
          exercise = {this.exercise_440}
        />
        <SectionCT
          moduleNum = { 4 }
          sectionNum = { 450 }
          sectionTitle = "Make tradeoffs within each category"
          exercise = {this.exercise_450}
        />
        <SectionCT
          moduleNum = { 4 }
          sectionNum = { 460 }
          sectionTitle = "Synthesize into a Desires Statement"
          exercise = {this.exercise_460}
        />*/}
      </ModuleCT>
    )
  }
}
