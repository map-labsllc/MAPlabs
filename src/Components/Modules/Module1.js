/* eslint-disable import/no-cycle */
import React from 'react';
import LifeDescriptorsCT from '../Exercises/LifeDescriptors/LifeDescriptorsCT';
import NarrativeCT from '../Exercises/Narrative/NarrativeCT';
import QuestionsCT from '../Framework/QuestionsCT';
import ShortAnswersCT from '../Exercises/ShortAnswers/ShortAnswersCT';
import TransitionsCT from '../Exercises/Transitions/TransitionsCT';

import {
  QUESTION_TYPE_SHORT_ANSWERS,
  QUESTION_TYPE_TRANSITIONS,
} from '../../store/answers/constants';

import {
  QUES_110_DESC,
  QUES_120_DESC,
  QUES_130_DESC,
  QUES_140_DESC,
  QUES_150_DESC,
  QUES_160_DESC,
} from './Module1Text';

// -------------------------
// Module 1: 2C-F
const exercise_110 = (
  <LifeDescriptorsCT
    question={{ code: 110, text: 'Reflect on your current situation' }}
    description={QUES_110_DESC}
    instructions="Complete sentences that are important to you."
  />
);

// -------------------------
// Module 1: 2F
const exercise_120 = (
  <NarrativeCT
    question={{ code: 120, text: 'Describe your current situation' }}
    promptQuestionCode={110}
    description={QUES_120_DESC}
    instructions="Using the phrases you chose, write a full description of your current state of mind, state of being, and general assessment of your current condition today as you begin MAPmaker."
  />
);

// -------------------------
// Module 1: 3B-D
const exercise_130 = (
  <LifeDescriptorsCT
    question={{ code: 130, text: 'Imagine your future desired situation' }}
    description={QUES_130_DESC}
    instructions="Complete sentences that are important to you."
  />
);

// -------------------------
// Module 1: 3E
const exercise_140 = (
  <NarrativeCT
    question={{ code: 140, text: 'Describe your future situation' }}
    promptQuestionCode={130}
    description={QUES_140_DESC}
    instructions="Using the phrases you chose, write a full description of your future desired state of being."
  />
);

// -------------------------
// Module 1: 4A
const shortAnswers_150 = [
  <ShortAnswersCT
    question={{
      code: 151,
      text:
        'As you compare the two statements, list the most important overarching themes that impact how meaningful and purposeful your life is.',
    }}
  />,
  <ShortAnswersCT
    question={{
      code: 152,
      text:
        'Which core feelings and experiences provide you with the greatest sense of meaning in your life?',
    }}
  />,
  <ShortAnswersCT
    question={{
      code: 153,
      text:
        'Name some things beyond yourself that you could serve if you lived with more of your core feelings and experiences.',
    }}
  />,
  <ShortAnswersCT
    question={{
      code: 154,
      text:
        'List the areas of personal growth that will enable your life to be more filled with the core feelings and experiences you desire.',
    }}
  />,
  <ShortAnswersCT
    question={{
      code: 155,
      text:
        'List which relationships that you either currently have or need to develop in the future (to any influence, such as people, groups, etc.) are most important to supporting your life being lived with more of your core feelings and experiences.',
    }}
  />,
  <ShortAnswersCT
    question={{
      code: 156,
      text:
        'List any areas of engagement or mastery (either in your life’s work or avocationally) that would provide you with more of your core feelings and experiences.',
    }}
  />,
];

const exercise_150 = (
  <QuestionsCT
    questionType={QUESTION_TYPE_SHORT_ANSWERS}
    description={QUES_150_DESC}
    subComponents={shortAnswers_150}
  />
);

// -------------------------
// Module 1: 4B

const transitions_160 = [
  <TransitionsCT question={{ code: 161, text: 'Thoughts/Attitudes' }} />,
  <TransitionsCT question={{ code: 162, text: 'Behaviors/Actions' }} />,
  <TransitionsCT question={{ code: 163, text: 'Goals' }} />,
  <TransitionsCT question={{ code: 164, text: 'Commitments' }} />,
];

const exercise_160 = (
  <QuestionsCT
    questionType={QUESTION_TYPE_TRANSITIONS}
    description={QUES_160_DESC}
    subComponents={transitions_160}
  />
);

// interim refactor, needs to be in a DB
const MODULE1_SECTIONS = [
  {
    id: 110,
    module_id: 1,
    title: 'Reflect on Your Current Situation',
    exercise: exercise_110,
    reference_sections: []
  },
  {
    id: 120,
    module_id: 1,
    title: 'Describe Your Current Situation',
    exercise: exercise_120,
    reference_sections: []
  },
  {
    id: 130,
    module_id: 1,
    title: 'Imagine Your Future Desired Situation',
    exercise: exercise_130,
    reference_sections: []
  },
  {
    id: 140,
    module_id: 1,
    title: 'Describe Your Future Situation',
    exercise: exercise_140,
    reference_sections: []
  },
  {
    id: 150,
    module_id: 1,
    title:
      'Reflect on Your "Current Situation" Statement and Your "Future Desired Situation" Statement',
    exercise: exercise_150,
    section_ids: [151, 152, 153, 154, 155, 156],
    reference_sections: [120, 140]
  },
  {
    id: 160,
    module_id: 1,
    title: 'Breaking and Building',
    exercise: exercise_160,
    section_ids: [161, 162, 163, 164],
    reference_sections: [120, 140],
    feedbackUrl: 'https://forms.gle/HLd8FDqCm8Wr4Z7C8',
  },
];

export default MODULE1_SECTIONS;
