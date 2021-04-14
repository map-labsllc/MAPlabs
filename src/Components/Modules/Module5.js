import React from 'react'
import Mappers from '../Exercises/Mappers/Mappers'
import ModuleConclusion from './ModuleConclusion'
import NarrativeCT from '../Exercises/Narrative/NarrativeCT'
import QuestionsCT from '../Framework/QuestionsCT'
import ReflectionsTop5CT from '../Exercises/ReflectionsTop5/ReflectionsTop5CT'
import ShortAnswersCT from '../Exercises/ShortAnswers/ShortAnswersCT'
import StrengthsTop5CT from '../Exercises/StrengthsTop5/StrengthsTop5CT'
import Summary from '../Framework/Summary'
import Top5ListCT from '../Exercises/Top5List/Top5ListCT'
import TransitionsTop from '../Exercises/TransitionsTop/TransitionsTop'

import { EFFECT_EMBODIMENT, EFFECT_IMPEDIMENT } from '../../constants'
import {
  QUESTION_TYPE_TOP_BEYOND_SELF,
  QUESTION_TYPE_TOP_MEANING,
  QUESTION_TYPE_TOP_THEMES,
  QUESTION_TYPE_TOP_PERSONAL_GROWTH,
  QUESTION_TYPE_TOP_RELATIONSHIPS,
  QUESTION_TYPE_TOP_ENGAGEMENT_MASTERY,
  QUESTION_TYPE_SHORT_ANSWERS,
  QUESTION_TYPE_TOP_TRANSITIONS
} from '../../store/answers/constants'

import {
  QUES_510_DESC,
  QUES_511_DESC,
  QUES_512_DESC,
  QUES_520_DESC,
  QUES_521_DESC,
  QUES_522_DESC,
  QUES_523_DESC,
  QUES_524_DESC,
  QUES_531_DESC,
  QUES_530_DESC,
  QUES_540_DESC,
  QUES_550_DESC,
  QUES_551_DESC,
  QUES_552_DESC,
  QUES_560_DESC,
  QUES_565_DESC,
  QUES_570_DESC,
  QUES_580_DESC,
  QUES_590_DESC
} from './Module5Text'

// Module 5.1.A
export const EXERCISE_510 = (
  <NarrativeCT
    summaryTitle = 'Current Situation Statement'
    question = { { code: 510, text: 'Review and revise your Current Situation statement' } }
    promptQuestionCode = { 120 }
    copyPrompt = { true }
    description = { QUES_510_DESC }
    instructions = 'Review and revise your Current Situation Statement.'
  />)

// Module 5.1.B
export const EXERCISE_511 = (
  <Top5ListCT
    summaryTitle = 'Key themes on self-knowledge'
    question = { { code: 511, text: 'Add to your Dashboard your key themes' } }
    promptQuestionCodes = { [151, 261, 351, 451] }
    description = { QUES_511_DESC }
    headings = { ['Theme'] }
    question_type={QUESTION_TYPE_TOP_THEMES}
    instructions = 'Select up to 5 themes that are most important to you.'
  />)

// Module 5.1.C
export const EXERCISE_512 = (
  <NarrativeCT
    summaryTitle = 'Summarizing thoughts or directives'
    question = { { code: 512, text: 'Summarize the context of your purpose-seeking life' } }
    promptQuestionCode = { 511 }
    copyPrompt = { false }
    description = { QUES_512_DESC }
    instructions = 'Write your summarizing thoughts or directives below.'
  />)

// Module 5.2.A
export const EXERCISE_520 = (
  <Top5ListCT
    summaryTitle = 'Key themes on meaning'
    question = { { code: 520, text: 'Add to your Dashboard your key insights about meaning.' } }
    promptQuestionCodes = { [152, 262, 352, 452] }
    description = { QUES_520_DESC }
    headings = { ['Meaning'] }
    question_type={QUESTION_TYPE_TOP_MEANING}
    instructions = 'Select up to 5 insights that are most useful to you.'
  />)

// Module 5.2.B
export const EXERCISE_521 = (
  <NarrativeCT
    summaryTitle = 'Desires Statement'
    question = { { code: 521, text: 'Add to your Dashboard your key insights about your desires.' } }
    promptQuestionCode = { 340 }
    copyPrompt = { true }
    description = { QUES_521_DESC }
    instructions = 'Review and revise your Desires Statement.'
  />)

// Strengths
// Module 5.2.C
export const EXERCISE_522 = (
  <StrengthsTop5CT
    summaryTitle = 'Key strengths'
    question = { { code: 522, text: 'Review your top 5 strengths' } }
    promptQuestionCodes = { [410] }
    description = { QUES_522_DESC }
    instructions = 'Select the strengths that are most important to you.'
  />)

// Module 5.2.C
export const EXERCISE_523 = (
  <ReflectionsTop5CT
    summaryTitle = 'Embodiment themes'
    question = { { code: 523, text: 'Select the embodiments that are most important to you.' } }
    promptQuestionCode = { 420 }
    description = { QUES_523_DESC }
    filter = { EFFECT_EMBODIMENT }
    instructions = 'Select the top 5 that are most useful to you.'
  />)

// Module 5.2.C
export const EXERCISE_524 = (
  <ReflectionsTop5CT
    summaryTitle = 'Impediment themes'
    question = { { code: 524, text: 'Select the impediments that are most important to you.' } }
    promptQuestionCode = { 420 }
    description = { QUES_524_DESC }
    filter = { EFFECT_IMPEDIMENT }
    instructions = 'Select the top 5 that are most useful to you.'
  />)

// Module 5.3.A
export const EXERCISE_530 = (
  <Top5ListCT
    summaryTitle = 'Key themes on beyond-the-self service'
    question = { { code: 530, text: 'Add to your Dashboard your key insights about beyond-the-self service.' } }
    promptQuestionCodes = { [153, 263, 353, 453] }
    description = { QUES_530_DESC }
    headings = { ['Beyond-Self-Service']}
    question_type = {QUESTION_TYPE_TOP_BEYOND_SELF}
    instructions = 'Select up to 5 insights that are most important to you. '
  />)

// Module 5.3.B
export const EXERCISE_531 = (
  <NarrativeCT
    summaryTitle = 'Summarizing thoughts or directives'
    question = { { code: 531, text: 'Summarize the "what" of your purpose.' } }
    promptQuestionCode = { 530 }
    copyPrompt = { false }
    description = { QUES_531_DESC }
    instructions = 'Write your summarizing thoughts or directives below.'
  />)

// Module 5.4.A
const shortAnswers_540 = [
  <ShortAnswersCT question = { {
    code: 541,
    text: 'My life is most meaningful when I experience or embrace',
    placeholder: 'source of meaning'
  }} />,
  <ShortAnswersCT question = { {
    code: 542,
    text: 'That is why my greatest desire is to',
    placeholder: 'desire'
  } } />,
  <ShortAnswersCT question = { {
    code: 543,
    text: 'by using my',
    placeholder: 'strength'
  }} />,
  <ShortAnswersCT question = { {
    code: 544,
    text: 'in service of',
    placeholder: 'something or someone beyond the self'
  }} />,
]

export const EXERCISE_540 = (
  <QuestionsCT
    summaryTitle = 'Purpose Statement'
    questionType = {QUESTION_TYPE_SHORT_ANSWERS}
    description = { QUES_540_DESC }
    subComponents = {shortAnswers_540}
    showNumbers = { false }
  />)

// Module 5.5.A
export const EXERCISE_550 = (
  <Top5ListCT
    summaryTitle = 'Key commitments about personal growth'
    question = { { code: 550, text: 'Add to your Dashboard your key commitments about personal growth.' } }
    promptQuestionCodes = { [154, 264, 354, 452] }
    description = { QUES_550_DESC }
    headings = { ['Personal Growth']}
    question_type = {QUESTION_TYPE_TOP_PERSONAL_GROWTH}
    instructions = ''
  />)

// Module 5.5.B
export const EXERCISE_551 = (
  <Top5ListCT
    summaryTitle = 'Key relationships'
    question = { { code: 551, text: 'Add to your Dashboard your key relationships.' } }
    promptQuestionCodes = { [155, 265, 355, 454] }
    description = { QUES_551_DESC }
    headings = { ['Relationship']}
    question_type = {QUESTION_TYPE_TOP_RELATIONSHIPS}
    instructions = ''
  />)

// Module 5.5.C
export const EXERCISE_552 = (
  <Top5ListCT
    summaryTitle = 'Key themes on engagement mastery'
    question = { { code: 552, text: 'Add to your Dashboard your key engagement mastery.' } }
    promptQuestionCodes = { [156, 266, 356, 455, 456] }
    description = { QUES_552_DESC }
    headings = { ['Engagement Mastery']}
    question_type = {QUESTION_TYPE_TOP_ENGAGEMENT_MASTERY}
    instructions = ''
  />)

// Module 5.6.A
const transitions_560 = [
  <TransitionsTop
    question = { { code: 561, text: 'Meaning and Motivations' } }
    promptQuestionCodes = { [161, 162, 163, 164] }
    showSave = {false}
  />,
  <TransitionsTop
    question = { { code: 562, text: 'Social Context' } }
    promptQuestionCodes = { [271, 272, 273, 274] }
    showSave = {false}
  />,
  <TransitionsTop
    question = { { code: 563, text: 'Personal Desires' } }
    promptQuestionCodes = { [361, 362, 363] }
    showSave = {false}
  />,
  <TransitionsTop
    question = { { code: 564, text: 'Personal Strengths' } }
    promptQuestionCodes = { [461, 462, 463, 464] }
    showSave = {false}
  />
]

export const EXERCISE_560 = (
  <QuestionsCT
    summaryTitle = 'Key commitments (breaking and building)'
    showNumbers = { false }
    questionType = {QUESTION_TYPE_TOP_TRANSITIONS}
    description = { QUES_560_DESC }
    subComponents = {transitions_560}
  />)

// Module 5.6.B
export const EXERCISE_565 = (
  <NarrativeCT
    summaryTitle = 'Future Desired Situation Statement'
    question = { { code: 565, text: 'Review and revise your Desired Future Situation statement' } }
    promptQuestionCode = { 140 }
    copyPrompt = { true }
    description = { QUES_565_DESC }
    instructions = 'Review and revise your Future Desired Situation Statement.'
  />)

// dashboard
const EXERCISE_570 = (
  <Summary
    description = { QUES_570_DESC }
    isDynamic = { false }
    showEdit = { false }
    subComponents = {[
      EXERCISE_510,
      EXERCISE_511,
      EXERCISE_512,
      EXERCISE_520,
      EXERCISE_521,
      EXERCISE_522,
      EXERCISE_523,
      EXERCISE_524,
      EXERCISE_530,
      EXERCISE_531,
      EXERCISE_540,
      EXERCISE_550,
      EXERCISE_551,
      EXERCISE_552,
      EXERCISE_560,
      EXERCISE_565, // at top  in spreadsheet
    ]}
  />
)

// mappers
const EXERCISE_580 = (
  <Mappers
    description = { QUES_580_DESC }
    isDynamic = { false }
    showEdit = { false }
    sectionId = {580}
  />
)

const EXERCISE_590 = (
  <ModuleConclusion
    description = { QUES_590_DESC }
    moduleId = {5}
    showLink = {false}
    showEdit = { false }
  />
)

export const MODULE5_SECTIONS =
[
  {
    id: 510,
    module_id: 5,
    title: 'Review and Revise Your Current Situation Statement',
    exercise: EXERCISE_510,
    reference_sections: []
  },
  {
    id: 511,
    module_id: 5,
    title: 'Determine Your Key Themes',
    exercise: EXERCISE_511,
    reference_sections: []
  },
  {
    id: 512,
    module_id: 5,
    title: 'Summarize the Themes of Your Life',
    exercise: EXERCISE_512,
    reference_sections: []
  },
  {
    id: 520,
    module_id: 5,
    title: 'Determine Your Key Insights About Meaning',
    exercise: EXERCISE_520,
    reference_sections: []
  },
  {
    id: 521,
    module_id: 5,
    title: 'Desires Statement',
    exercise: EXERCISE_521,
    reference_sections: []
  },
  {
    id: 522,
    module_id: 5,
    title: 'Strengths',
    exercise: EXERCISE_522,
    reference_sections: []
  },
  {
    id: 523,
    module_id: 5,
    title: 'Strength Embodiments',
    exercise: EXERCISE_523,
    reference_sections: []
  },
  {
    id: 524,
    module_id: 5,
    title: 'Strength Impediments',
    exercise: EXERCISE_524,
    reference_sections: []
  },
  {
    id: 530,
    module_id: 5,
    title: 'Determine Your Insights About Beyond-the-Self Service',
    exercise: EXERCISE_530,
    reference_sections: []
  },
  {
    id: 531,
    module_id: 5,
    title: 'Summarize the "What" of Your Life',
    exercise: EXERCISE_531,
    reference_sections: []
  },
  {
    id: 540,
    module_id: 5,
    title: 'Personal Life Purpose Statement',
    exercise: EXERCISE_540,
    section_ids: [541, 542, 543, 544],
    reference_sections: []
  },
  {
    id: 550,
    module_id: 5,
    title: 'Personal Growth',
    exercise: EXERCISE_550,
    reference_sections: []
  },
  {
    id: 551,
    module_id: 5,
    title: 'Relationships',
    exercise: EXERCISE_551,
    reference_sections: []
  },
  {
    id: 552,
    module_id: 5,
    title: 'Engagement Mastery',
    exercise: EXERCISE_552,
    reference_sections: []
  },
  {
    id: 560,
    module_id: 5,
    title: 'Breaking and Building',
    exercise: EXERCISE_560,
    section_ids: [561, 562, 563, 564],
    reference_sections: []
  },
  {
    id: 565,
    module_id: 5,
    title: 'Future Desired Situation Statement',
    exercise: EXERCISE_565,
    reference_sections: []
  },
  {
    id: 570,
    module_id: 5,
    title: 'Dashboard',
    exercise: EXERCISE_570,
    section_ids: [565], // if 565 is done, then this is done
    reference_sections: []
  },
  {
    id: 580,
    module_id: 5,
    title: 'MAPPERS Model',
    exercise: EXERCISE_580,
    section_ids: [565], // if 565 is done, then this is done
    reference_sections: []
  },
  {
    id: 590,
    module_id: 5,
    title: 'Conclusion',
    exercise: EXERCISE_590,
    section_ids: [565], // if 565 is done, then this is done
    theEnd: true,
    reference_sections: [],
    feedbackUrl: 'https://forms.gle/aKTAhNGFY8i7iiGq6',
  }
]
