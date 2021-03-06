/* eslint-disable import/no-cycle */
import React from 'react'
import BracketCT from '../Exercises/Bracket/BracketCT'
import NarrativeCT from '../Exercises/Narrative/NarrativeCT'
import QuestionsCT from '../Framework/QuestionsCT'
import ShortAnswersCT from '../Exercises/ShortAnswers/ShortAnswersCT'
import TransitionsCT from '../Exercises/Transitions/TransitionsCT'

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

// -------------------------
// Module 3: 1A

const shortAnswers_310 = [
  <ShortAnswersCT question = { { code: 311, text: 'Financial/Material' } } />,
  <ShortAnswersCT question = { { code: 312, text: 'Vocation/Career/Life Work' } } />,
  <ShortAnswersCT question = { { code: 313, text: 'Social/Community' } } />,
  <ShortAnswersCT question = { { code: 314, text: 'Family' } } />,
  <ShortAnswersCT question = { { code: 315, text: 'Mental/Educational' } } />,
  <ShortAnswersCT question = { { code: 316, text: 'Spiritual/Emotional/Creative' } } />,
  <ShortAnswersCT question = { { code: 317, text: 'Physical/Health/Recreational' } } />,
  <ShortAnswersCT question = { { code: 318, text: 'Other' } } />,
]

const exercise_310 = (
  <QuestionsCT
    questionType = {QUESTION_TYPE_SHORT_ANSWERS}
    description = {QUES_310_DESC}
    subComponents = {shortAnswers_310}
  />)

// -------------------------
// Module 3: 3A

const brackets_320 = [
  <BracketCT promptQuestionCodes = { [311] } question = { { code: 321, text: 'Financial/Material' } } />,
  <BracketCT promptQuestionCodes = { [312] } question = { { code: 322, text: 'Vocation/Career/Life Work' } } />,
  <BracketCT promptQuestionCodes = { [313] } question = { { code: 323, text: 'Social/Community' } } />,
  <BracketCT promptQuestionCodes = { [314] } question = { { code: 324, text: 'Family' } } />,
  <BracketCT promptQuestionCodes = { [315] } question = { { code: 325, text: 'Mental/Educational' } } />,
  <BracketCT promptQuestionCodes = { [316] } question = { { code: 326, text: 'Spiritual/Emotional/Creative' } } />,
  <BracketCT promptQuestionCodes = { [317] } question = { { code: 327, text: 'Physical/Health/Recreational' } } />,
  <BracketCT promptQuestionCodes = { [318] } question = { { code: 328, text: 'Other' } } />,
]

const exercise_320 = (
  <QuestionsCT
    questionType = {QUESTION_TYPE_BRACKET}
    description = {QUES_320_DESC}
    subComponents = {brackets_320}
  />)

// -------------------------
// Module 3: 4A

const promptCodes_330 = brackets_320.reduce((acc, bracketCT) => [...acc, bracketCT.props.question.code], [])

const bracket_330 = <BracketCT promptQuestionCodes = {promptCodes_330} question = { { code: 330, text: 'Make tradeoffs between each category.' } } />

const exercise_330 = (
  <QuestionsCT
    questionType = {QUESTION_TYPE_BRACKET}
    description = {QUES_330_DESC}
    subComponents = {[bracket_330]}
  />)

// -------------------------
// Module 3: 4B
const exercise_340 = (
  <NarrativeCT
    question = { { code: 340, text: 'Synthesize into a Desires Statement.' } }
    promptQuestionCode = { 320 } // should the prompt be all of the winners from 320 or just 330?
    description = { QUES_340_DESC }
    instructions = "Write a short statement that brings together your most important desires and captures the essence of what the past few exercises have revealed to you, using the phrases themselves. "
  />)

// -------------------------
// Module 3: 5A
const shortAnswers_350 = [
  <ShortAnswersCT question = { { code: 351, text: 'List any important themes that you noticed across all of your categories and in your ultimate choices about which of your desires are most important.' } } />,
  <ShortAnswersCT question = { { code: 352, text: 'Which desires provide you with the greatest sense of meaning and “intrinsic” motivation in your life?' } } />,
  <ShortAnswersCT question = { { code: 353, text: 'Name some things beyond yourself that you could serve if you lived more authentically  from your deepest and truest desires.' } } />,
  <ShortAnswersCT question = { { code: 354, text: 'List the areas of personal growth that will enable your life to be more expressive of your desires.' } } />,
  <ShortAnswersCT question = { { code: 355, text: 'List which relationships that you either currently have or need to develop in the future (to any influence, such as people, groups, etc.) are most important to helping you fulfill your most authentic desires.' } } />,
  <ShortAnswersCT question = { { code: 356, text: 'List any areas of engagement or mastery (either in your life’s work or avocationally) that could express or fulfill your deepest desires.' } } />,
]

const exercise_350 = (
  <QuestionsCT
    questionType = {QUESTION_TYPE_SHORT_ANSWERS}
    description = { QUES_350_DESC }
    subComponents = {shortAnswers_350}
  />)

// -------------------------
// Module 3: 5B
const transitions_360 = [
  <TransitionsCT question = { { code: 361, text: 'Motivations' } } />,
  <TransitionsCT question = { { code: 362, text: 'Desires' } } />,
  <TransitionsCT question = { { code: 363, text: 'Commitments' } } />,
]

const exercise_360 = (
  <QuestionsCT
    questionType = {QUESTION_TYPE_TRANSITIONS}
    description = { QUES_360_DESC }
    subComponents = {transitions_360}
  />)

// interim refactor, needs to be in a DB
const MODULE3_SECTIONS =
[
  {
    id: 310,
    module_id: 3,
    title: 'Deep Desires',
    exercise: exercise_310,
    section_ids: [311, 312, 313, 314, 315, 316, 317, 318],
    reference_sections: []
  },
  {
    id: 320,
    module_id: 3,
    title: 'Make Tradeoffs Within Each Category',
    exercise: exercise_320,
    section_ids: [321, 322, 323, 324, 325, 326, 327, 328],
    reference_sections: []
  },
  {
    id: 330,
    module_id: 3,
    title: 'Make Tradeoffs Between Each Category',
    exercise: exercise_330,
    reference_sections: []
  },
  {
    id: 340,
    module_id: 3,
    title: 'Synthesize Into a Desires Statement',
    exercise: exercise_340,
    reference_sections: [320, 330]
  },
  {
    id: 350,
    module_id: 3,
    title: 'Reflect on Your Stated Desires',
    exercise: exercise_350,
    section_ids: [351, 352, 353, 354, 355, 356],
    reference_sections: [320, 330, 340]
  },
  {
    id: 360,
    module_id: 3,
    title: 'Breaking and Building',
    exercise: exercise_360,
    section_ids: [361, 362, 363],
    reference_sections: [320, 330, 340],
    feedbackUrl: 'https://forms.gle/5xnVC9Kygrr9tSCHA',
  },
]

export default MODULE3_SECTIONS;
