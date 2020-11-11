import React from 'react'

import ModuleLayout from './ModuleLayout'
import QuestionsCT from '../Framework/QuestionsCT'
import TransitionsCT from '../Exercises/Transitions/TransitionsCT'
import NarrativeCT from '../Exercises/Narrative/NarrativeCT'
import ShortAnswersCT from '../Exercises/ShortAnswers/ShortAnswersCT'
import BracketCT from '../Exercises/Bracket/BracketCT'

import {
  QUESTION_TYPE_SHORT_ANSWERS,
  QUESTION_TYPE_TRANSITIONS,
  QUESTION_TYPE_BRACKET,
 } from '../../store/answers/constants'

import {
  QUES_310_DESC,
  QUES_320_DESC,
  QUES_330_DESC,
  QUES_340_DESC,
  QUES_350_DESC,
  QUES_360_DESC,
} from './Module3Text'
import { MODULES } from './ModuleData'

import {
} from 'react-bootstrap'

/* **************************************************
   Module 3 layout
***************************************************** */
export default class Module3 extends React.Component {

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
    <BracketCT promptQuestionCodes = { [ 311 ] }  question = { { code: 321, text: "Financial/Material" } } />,
    <BracketCT promptQuestionCodes = { [ 312 ] }  question = { { code: 322, text: "Vocation/Career/Life Work" } } />,
    <BracketCT promptQuestionCodes = { [ 313 ] }  question = { { code: 323, text: "Social/Community" } } />,
    <BracketCT promptQuestionCodes = { [ 314 ] }  question = { { code: 324, text: "Family" } } />,
    <BracketCT promptQuestionCodes = { [ 315 ] }  question = { { code: 325, text: "Mental/Educational" } } />,
    <BracketCT promptQuestionCodes = { [ 316 ] }  question = { { code: 326, text: "Spiritual/Emotional/Creative" } } />,
    <BracketCT promptQuestionCodes = { [ 317 ] }  question = { { code: 327, text: "Physical/Health/Recreational" } } />,
    <BracketCT promptQuestionCodes = { [ 318 ] }  question = { { code: 328, text: "Other" } } />,
  ]
  exercise_320 = (
    <QuestionsCT
      questionType = {QUESTION_TYPE_BRACKET}
      description = {QUES_320_DESC}
      subComponents = {this.brackets_320}
    /> )


  // -------------------------
  // Module 3: 4A

  promptCodes_330 = this.brackets_320.reduce( ( acc, bracketCT ) => {
    return [ ...acc, bracketCT.props.question.code ]
  }, [ ] )

  bracket_330 = <BracketCT promptQuestionCodes = {this.promptCodes_330}  question = { { code: 330, text: "Make tradeoffs between each category." } } />

  exercise_330 = (
    <QuestionsCT
      questionType = {QUESTION_TYPE_BRACKET}
      description = {QUES_330_DESC}
      subComponents = {[this.bracket_330]}
  /> )


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

  _module = MODULES.filter(m => m.id === 3)[0]

  // interim refactor, needs to be in a DB
  sections =
  [
    {
      id: 310,
      module_id: 3,
      title: "Deep Desires",
      exercise: this.exercise_310,
      section_ids: [311,312,313,314,315,316,317,318]
    },
    {
      id: 320,
      module_id: 3,
      title: "Make Tradeoffs Within Each Category",
      exercise: this.exercise_320,
      section_ids: [321,322,323,324,325,326,327,328]
    },
    {
      id: 330,
      module_id: 3,
      title: "Make Tradeoffs Between Each Category",
      exercise: this.exercise_330
    },
    {
      id: 340,
      module_id: 3,
      title: "Synthesize Into a Desires Statement",
      exercise: this.exercise_340
    },
    {
      id: 350,
      module_id: 3,
      title: "Reflect on Your Stated Desires",
      exercise: this.exercise_350,
      section_ids: [351,352,353,354,355,356]
    },
    {
      id: 360,
      module_id: 3,
      title: "Breaking and Building",
      exercise: this.exercise_360,
      section_ids: [361,362,363]
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
