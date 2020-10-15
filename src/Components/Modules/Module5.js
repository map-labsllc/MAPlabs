import React from 'react'

import QuestionsCT from '../Framework/QuestionsCT'

import BracketCT from '../Exercises/Bracket/BracketCT'
import ThemesTop5CT from '../Exercises/ThemesTop5/ThemesTop5CT'

import TransitionsCT from '../Exercises/Transitions/TransitionsCT'
import NarrativeCT from '../Exercises/Narrative/NarrativeCT'
import ShortAnswersCT from '../Exercises/ShortAnswers/ShortAnswersCT'

import ModuleLayout from './ModuleLayout'

import {
  QUESTION_TYPE_SHORT_ANSWERS,
  QUESTION_TYPE_TRANSITIONS,
 } from '../../store/answers/constants'

import {
  QUES_510_DESC,
  QUES_520_DESC,
  QUES_530_DESC,
  QUES_540_DESC,
  QUES_550_DESC,
  QUES_560_DESC,
  QUES_570_DESC,
 } from './Module5Text'

import { MODULES } from './ModuleData'

/* **************************************************
   Used to test components during development
***************************************************** */
export default class Module5 extends React.Component {


  // Define questions and excercises for Module 1
  // ---------------------------------------------------------------------


  // -------------------------
  // Module 5.1.A

  exercise_510 = (
    <NarrativeCT
      question = { { code: 510, text: "Review and revise your Current Situation statement" } }
      promptQuestionCode = { 120 }
      description = { QUES_510_DESC }
      instructions = "Review your responses about what you found most meaningful."
    /> )


  // -------------------------
  // Module 5.1.B
  exercise_520 = (
    <ThemesTop5CT 
      question = { { code: 520, text: "Add to your Dashboard your key insights about meaning." } }
      promptQuestionCodes = { [151, 261, 351, 451] }
      description = { QUES_520_DESC }
      instructions = "Select the top 5 themes that are most important to you."
    /> )

  // -------------------------
  // Module 1: 3E
  exercise_540 = (
    <NarrativeCT
      question = { { code: 540, text: "Describe your future situation" } }
      promptQuestionCode = { 130 }
      description = { QUES_540_DESC }
      instructions = "Using the phrases you chose, as well as the descriptions you created next to each one of them, write a full description of your future desired state of being as you begin MAPmaker. Create this description in your own image capturing how you want to feel, what you will think of your future situation, what will be good and bad, and how you would describe your future self to your current self. "
    /> )


  // -------------------------
  // Module 1: 4A
  shortAnswers_550 = [
    <ShortAnswersCT question = { { code: 551, text: "List the most important overarching themes that impact how meaningful and purposeful your life is." } } />,
    <ShortAnswersCT question = { { code: 552, text: "Which core feelings and experiences are most important to providing you with personal senses of the meaning in your life?" } } />,
    <ShortAnswersCT question = { { code: 553, text: "Name some things beyond yourself that you could serve if you lived with more of your core feelings and experiences." } } />,
    <ShortAnswersCT question = { { code: 554, text: "List the areas of personal growth that will enable your life to be more filled with the core feelings and experiences you desire." } } />,
    <ShortAnswersCT question = { { code: 555, text: "List which relationships that you either currently have or need to develop in the future (to any influence, such as people, groups, practices, experiences, etc.) are most important to supporting your life being lived with more of your core feelings and experiences." } } />,
    <ShortAnswersCT question = { { code: 556, text: "List any areas of engagement or mastery (either in your life’s work or avocationally) that would provide you with more of your core feelings and experiences." } } />,
  ]
  exercise_550 = (
    <QuestionsCT
      questionType = {QUESTION_TYPE_SHORT_ANSWERS}
      description = { QUES_550_DESC }
      subComponents = {this.shortAnswers_550}
    /> )


  // -------------------------
  // Module 1: 4B

  transitions_560 = [
    <TransitionsCT question = { { code: 561, text: "Thoughts/Attitudes" } } />,
    <TransitionsCT question = { { code: 562, text: "Behaviors/Actions" } } />,
    <TransitionsCT question = { { code: 563, text: "Goals" } } />,
    <TransitionsCT question = { { code: 564, text: "Commitments" } } />,
  ]
  exercise_560 = (
    <QuestionsCT
      questionType = {QUESTION_TYPE_TRANSITIONS}
      description = { QUES_560_DESC }
      subComponents = {this.transitions_560}
    /> )


  // -------------------------
  // Module 1: 5A

  // shortAnswers_570 = [
  //   <ShortAnswersCT question={ { code: 171, text: "What changes would you like to see in your everyday life?" } } />,
  //   <ShortAnswersCT question={ { code: 172, text: "What changes would you like to see in your personal growth?" } } />,
  //   <ShortAnswersCT question={ { code: 173, text: "What changes would you like to see in your relationships?" } } />,
  //   <ShortAnswersCT question={ { code: 174, text: "What changes would you like to see in your life’s work (your vocation)?" } } />,
  //   <ShortAnswersCT question={ { code: 175, text: "What changes would you like to see in your avocational pursuits?" } } />,
  // ]
  // exercise_570 = (
  //   <QuestionsCT
  //     questionType = {QUESTION_TYPE_SHORT_ANSWERS}
  //     description = { QUES_570_DESC }
  //     subComponents = { this.shortAnswers_570 }
  //   /> )

  _module = MODULES.filter(m => m.id === 5)[0]

  // interim refactor, needs to be in a DB
  sections =
  [
    {
      id: 510,
      module_id: 5,
      title: "Review and revise your Current Situation statement",
      exercise: this.exercise_510,
    },
    { 
      id: 520,
      module_id: 5,
      title: "Determine your key themes",
      exercise: this.exercise_520,
    },
    {
      id: 530,
      module_id: 5,
      title: "Imagine your future desired situation",
      exercise: this.exercise_530,
    },
    {
      id: 540,
      module_id: 5,
      title: "Describe your future situation",
      exercise: this.exercise_540
    },
    {
      id: 550,
      module_id: 5,
      title: "Compare your 'current situation' statement to your 'future desired situation' statement",
      exercise: this.exercise_550,
      section_ids: [151,152,153,154,155,156]
    },
    {
      id: 560,
      module_id: 5,
      title: "Breaking and building",
      exercise: this.exercise_560,
      section_ids: [161,162,163,164]
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
