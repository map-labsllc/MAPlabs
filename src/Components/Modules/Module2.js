import React from 'react'
import InfluencesCT from '../Exercises/Influences/InfluencesCT'
import InfluencesTop5CT from '../Exercises/InfluencesTop5/InfluencesTop5CT'
import MadLibsCT from '../Exercises/MadLibs/MadLibsCT'
import QuestionsCT from '../Framework/QuestionsCT'
import ShortAnswersCT from '../Exercises/ShortAnswers/ShortAnswersCT'
import TransitionsCT from '../Exercises/Transitions/TransitionsCT'

import {
  QUESTION_TYPE_INFLUENCES,
  QUESTION_TYPE_SHORT_ANSWERS,
  QUESTION_TYPE_TRANSITIONS,
} from '../../store/answers/constants'

import {
  IMPACT_SUPPORTIVE,
  IMPACT_INHIBITING,
} from '../../constants'

import {
  QUES_210_DESC,
  QUES_220_DESC,
  QUES_230_DESC,
  QUES_240_DESC,
  QUES_250_DESC,
  QUES_260_DESC,
  QUES_270_DESC
} from './Module2Text'

/* **************************************************
   Module 2 layout
***************************************************** */

// -------------------------
// Influences
// Module 2: 1A-B

const exercise_210 = (
  <InfluencesCT
    question = { { code: 210, text: '' } }
    description = { QUES_210_DESC }
    instructions = "Choose influences in your life, thier relationship to you, their beliefs / values, and if they were supportive or inhibiting."
  />)

// -------------------------
// Top5 Supportive
// Module 2: 2B for supportive influences
const exercise_220 = (
  <InfluencesTop5CT
    question = { { code: 220, text: 'Choose your most important supportive contextual influences' } }
    promptQuestionCode = { 210 }
    impactFilter = { IMPACT_SUPPORTIVE }
    description = { QUES_220_DESC }
    instructions = "Choose your top 5 supportive influences"
  />)

// -------------------------
// Top 5 Inhibiting
// Module 2: 2B for inhibiting influences
const exercise_230 = (
  <InfluencesTop5CT
    question = { { code: 230, text: 'Choose your most important inhibiting contextual influences' } }
    promptQuestionCode = { 210 }
    impactFilter = { IMPACT_INHIBITING }
    description = { QUES_230_DESC }
    instructions = "Choose your top 5 inhibiting influences"
  />
)

// -------------------------
// Madlibs: Supportive
// Module 2: 3A for supportive
const exercise_240 = (
  <MadLibsCT
    question = { { code: 240, text: 'Relating Your Values and Beliefs to Those of Your Supportive Influences' } }
    promptQuestionCode = { 210 }
    impactFilter = { IMPACT_SUPPORTIVE }
    description = { QUES_240_DESC }
    instructions = { QUES_240_DESC }
  />)

// -------------------------
// Madlibs: Inhibiting
// Module 2: 3A for inhibiting
const exercise_250 = (
  <MadLibsCT
    question = { { code: 250, text: 'Relating Your Values and Beliefs to Those of Your Inhibiting Influences' } }
    promptQuestionCode = { 210 }
    impactFilter = { IMPACT_INHIBITING }
    description = { QUES_250_DESC }
    instructions = { QUES_250_DESC }
  />)

// -------------------------
// Module 2: 4A
const shortAnswers_260 = [
  <ShortAnswersCT question={ { code: 261, text: 'As you compare the two statements, list the most important overarching themes that impact how meaningful and purposeful your life is.' } } />,
  <ShortAnswersCT question={ { code: 262, text: 'Which core values and beliefs are most meaningful to you?' } } />,
  <ShortAnswersCT question={ { code: 263, text: 'What things beyond yourself could be served if you more intentionally lived by your core values and beliefs?' } } />,
  <ShortAnswersCT question={ { code: 264, text: 'What areas of personal growth are needed to fill your life with more of your core values and beliefs?' } } />,
  <ShortAnswersCT question={ { code: 265, text: 'Which relationships that you either currently have or need to develop in the future (to any people, groups, practices, experiences, etc.) are most needed to support your core values and beliefs?' } } />,
  <ShortAnswersCT question={ { code: 266, text: 'What areas of engagement could your core values and beliefs lead you to master (either in your life’s work or avocationally) in order to create a more meaningful and purposeful life?' } } />,
]

const exercise_260 = (
  <QuestionsCT
    questionType = {QUESTION_TYPE_SHORT_ANSWERS}
    subComponents = {shortAnswers_260}
    description = { QUES_260_DESC }
  />)

// -------------------------
// Module 2: 4B
const transitions_270 = [
  <TransitionsCT question = { { code: 271, text: 'Values and Beliefs' } } />,
  <TransitionsCT question = { { code: 272, text: 'Primary Influences' } } />,
  <TransitionsCT question = { { code: 273, text: 'Relationships' } } />,
  <TransitionsCT question = { { code: 274, text: 'Commitments' } } />,
]

const exercise_270 = (
  <QuestionsCT
    questionType = {QUESTION_TYPE_TRANSITIONS}
    subComponents = {transitions_270}
    description = { QUES_270_DESC }
  />)

// interim refactor, needs to be in a DB
export const MODULE2_SECTIONS =
[
  {
    id: 210,
    module_id: 2,
    title: 'Contextual Influences',
    exercise: exercise_210
  },
  {
    id: 220,
    module_id: 2,
    title: 'Top 5 Supportive Influences',
    exercise: exercise_220,
    section_ids: [210] // hack so completion looks at parent
  },
  {
    id: 230,
    module_id: 2,
    title: 'Top 5 Inhibiting Influences',
    exercise: exercise_230,
    section_ids: [210]
  },
  {
    id: 240,
    title: 'Synthesize Your Values and Beliefs Into a Supportive Self-Acceptance Statement',
    exercise: exercise_240,
  },
  {
    id: 250,
    title: 'Synthesize Your Values and Beliefs Into a Self-Inhibiting Statement',
    exercise: exercise_250,
  },
  {
    id: 260,
    title: "Compare Your 'Supportive Self-Acceptance' Statement to Your 'Self-Inhibiting' Statement",
    exercise: exercise_260,
    section_ids: [261, 262, 263, 264, 265, 266]
  },
  {
    id: 270,
    title: 'Breaking and Building',
    exercise: exercise_270,
    section_ids: [271, 272, 273, 274]
  },
]
