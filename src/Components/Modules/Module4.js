import React from 'react'
import QuestionsCT from '../Framework/QuestionsCT'

import StrengthsCT from '../Exercises/Strengths/StrengthsCT'
import StrengthsEmImWrapperCT from '../Exercises/StrengthsEmIm/StrengthsEmImWrapperCT'
import ReflectionsTop5CT from '../Exercises/ReflectionsTop5/ReflectionsTop5CT'
import TransitionsCT from '../Exercises/Transitions/TransitionsCT'
import ShortAnswersCT from '../Exercises/ShortAnswers/ShortAnswersCT'

// import StrengthsEmImCT from '../Exercises/StrengthsEmIm/StrengthsEmImCT'
import ModuleLayout from './ModuleLayout'
import { MODULES } from './ModuleData'

import {
  QUESTION_TYPE_SHORT_ANSWERS,
  QUESTION_TYPE_TRANSITIONS,
 } from '../../store/answers/constants'


import {
  QUES_410_DESC,
  QUES_420_DESC,
  QUES_430_DESC,
  QUES_440_DESC,
  QUES_450_DESC,
  QUES_460_DESC,
} from './Module4Text'

import {
} from 'react-bootstrap'
import { EFFECT_EMBODIMENT, EFFECT_IMPEDIMENT } from '../../constants'

/* **************************************************
   Used to test components during development
***************************************************** */
export default class Module4 extends React.Component {

  // Define questions and excercises for Module 4
  // --------------------------------------------------------------------

  exercise_410 = (
    <StrengthsCT
      question = { { code: 410, text: "Determine your top strengths" } }
      description = { QUES_410_DESC }
      instructions = "Add 5 strengths and select the values from the drop down in order from the survey."
    /> )

  exercise_420 = (
    <StrengthsEmImWrapperCT
      question = { { code: 420, text: "Embodiments and Impediments" } }
      description = { QUES_420_DESC }
      promptQuestionCode = { 410 }
    /> )

  // -------------------------
  // Top5 Embodiments
  // Module
  exercise_430 = (
    <ReflectionsTop5CT
      question = { { code: 430, text: "Choose your most important embodiments of strength." } }
      promptQuestionCode = { 420 }
      filter = { EFFECT_EMBODIMENT }
      description = { QUES_430_DESC }
      saveToPrompt = { true }
    /> )

  // -------------------------
  // Top 5 Impediments
  // Module
  exercise_440 = (
    <ReflectionsTop5CT
      question = { { code: 440, text: "Choose your most important impediments of strength." } }
      promptQuestionCode = { 420 }
      filter = { EFFECT_IMPEDIMENT }
      description = { QUES_440_DESC }
    /> )

  // -------------------------
  // Module 4 compare
  shortAnswers_450 = [
    <ShortAnswersCT question={ { code: 451, text: "As you compare the two sets of themes, list the most important overarching themes that impact how your life is most well lived from your strengths." } } />,
    <ShortAnswersCT question={ { code: 452, text: "Which embodiments provide you with the most personal senses of the meaning in your life?" } } />,
    <ShortAnswersCT question={ { code: 453, text: "What people or things beyond yourself would you like to serve if you more intentionally lived through your Signature Strengths?" } } />,
    <ShortAnswersCT question={ { code: 454, text: "Which relationships that you either currently have or need to develop in the future (to any people, groups, practices, experiences, etc.) are most needed to support your living from your Signature Strengths?" } } />,
    <ShortAnswersCT question={ { code: 455, text: "What areas of engagement could your Signature Strengths lead you to master (either in your life’s work or avocationally) in order to create a more meaningful and purposeful life?" } } />,
    <ShortAnswersCT question={ { code: 456, text: "What areas of engagement could your core values and beliefs lead you to master (either in your life’s work or avocationally) in order to create a more meaningful and purposeful life?" } } />,
  ]

  exercise_450 = (
    <QuestionsCT
      questionType = {QUESTION_TYPE_SHORT_ANSWERS}
      subComponents = {this.shortAnswers_450}
      description = { QUES_450_DESC }
    /> )

   // -------------------------
  // Module 4: transitions
  transitions_460 = [
    <TransitionsCT question = { { code: 461, text: "Strengths" } } />,
    <TransitionsCT question = { { code: 462, text: "Embodiments" } } />,
    <TransitionsCT question = { { code: 463, text: "Impediments" } } />,
    <TransitionsCT question = { { code: 464, text: "Goals" } } />,
  ]

  exercise_460 = (
    <QuestionsCT
      questionType = {QUESTION_TYPE_TRANSITIONS}
      subComponents = {this.transitions_460}
      description = { QUES_460_DESC }
    /> )  

  _module = MODULES.filter(m => m.id === 4)[0]

  // interim refactor, needs to be in a DB
  sections =
  [
    {
      id: 410,
      module_id: 4,
      title: "Determine Your Top 5 Strengths",
      exercise: this.exercise_410
    },
    {
      id: 420,
      module_id: 4,
      title: "Embodiments and Impediments",
      exercise: this.exercise_420
    },
    {
      id: 430,
      module_id: 4,
      title: "Top 5 Embodiments of Strength",
      exercise: this.exercise_430,
      section_ids: [420]
    },
    {
      id: 440,
      module_id: 4,
      title: "Top 5 Impediments to Strength",
      exercise: this.exercise_440,
      section_ids: [420]
    },
    {
      id: 450,
      module_id: 4,
      title: "Compare Your 'Embodiment' Themes to Your 'Impediment' Themes",
      exercise: this.exercise_450,
      section_ids: [451, 452, 453, 454, 455, 456]
    },
    {
      id: 460,
      module_id: 4,
      title: "Breaking and Building",
      exercise: this.exercise_460,
      section_ids: [461, 462, 463, 464]
    },
  ]

  render() {
    const { moduleId, sectionId } = this.props

    return (
      <ModuleLayout
        title = { this._module.title }
        description= { this._module.description }
        moduleId = { moduleId }
        sections = { this.sections } 
        sectionId = { sectionId }
      >
      </ModuleLayout>
    )
  }
}
